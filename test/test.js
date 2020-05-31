const firebase = require("@firebase/testing");
const fs = require("fs");

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "firestore-emulator-example";
const firebasePort = require("../firebase.json").emulators.firestore.port;
const port = firebasePort /** Exists? */ ? firebasePort : 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const rules = fs.readFileSync("firestore.rules", "utf8");

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

before(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

describe("My app", () => {
  it("should only let allowed users access clusters", async () => {
    const admin = authedApp({ uid: "admin" });
    const alice = authedApp({ uid: "alice" });
    const profile = admin.collection("clusters").doc("zuLX")

    await firebase.assertSucceeds(
      profile.set({
        clusterId: "zuLX",
        users: [ "alice" ]
      })
    );

    await firebase.assertSucceeds(
      alice.collection("clusters").doc("zuLX").get()
    );
  });
});
