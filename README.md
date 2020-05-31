<!-- # cloud-firestore-security-rules-testing -->

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
