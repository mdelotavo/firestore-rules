<!-- # cloud-firestore-security-rules-testing -->

The current security rules in [firestore.rules](firestore.rules) and assertion in [test.js](test/test.js) show how to write unit tests. It asserts that a user should only be able to access a cluster if their `uid` exists in the target cluster's `users` array.

```
npm install
npx firebase --version # at least 6.3.0

npx firebase setup:emulators:firestore
npx firebase emulators:start --only firestore
```

```
> npm test

...

  My app
    √ should only let allowed users access clusters (255ms)

View rule coverage information at http://localhost:8080/emulator/v1/projects/firestore-emulator-example:ruleCoverage.html


  1 passing (5s)

```
