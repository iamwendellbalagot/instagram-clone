import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyCgBPvG9vDnBJQ5EfU1wlG5I4kwf-iJ9sM",
        authDomain: "instagram-clone-e70fe.firebaseapp.com",
        databaseURL: "https://instagram-clone-e70fe.firebaseio.com",
        projectId: "instagram-clone-e70fe",
        storageBucket: "instagram-clone-e70fe.appspot.com",
        messagingSenderId: "445897574493",
        appId: "1:445897574493:web:55d116edea052b644fe5b4",
        measurementId: "G-K5F911V129"
    }
)

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };