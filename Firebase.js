import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDR34ALXOEOnNqCvtGXsXnBThTZ6V-e-NM",
  authDomain: "plant-identifier-cf27c.firebaseapp.com",
  databaseURL: "https://plant-identifier-cf27c.firebaseio.com",
  projectId: "plant-identifier-cf27c",
  storageBucket: ""
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
