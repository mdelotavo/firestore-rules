npm install -g firebase-tools

# windows
choco install openjdk

git clone git@github.com:firebase/quickstart-nodejs.git
cd quickstart-nodejs/firestore-emulator/javascript-quickstart/
npm install
npx firebase --version # at least 6.3.0

npx firebase setup:emulators:firestore
npx firebase emulators:start --only firestore

# run in a new terminal in the same directory
npm test
