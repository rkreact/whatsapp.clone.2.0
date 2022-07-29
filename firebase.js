import firebase, { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9svf3Wz3tcA4bWp_w0LY0so34VSAiq-s",
    authDomain: "whatsapp-2-150a9.firebaseapp.com",
    projectId: "whatsapp-2-150a9",
    storageBucket: "whatsapp-2-150a9.appspot.com",
    messagingSenderId: "132198202241",
    appId: "1:132198202241:web:2084ca9281893319fd8680",
    measurementId: "G-5CTVWP0LHP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

}
export { db, auth, signInWithGoogle };
// import "firebase/auth";
// import "firebase/storage";
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyA9svf3Wz3tcA4bWp_w0LY0so34VSAiq-s",
//     authDomain: "whatsapp-2-150a9.firebaseapp.com",
//     projectId: "whatsapp-2-150a9",
//     storageBucket: "whatsapp-2-150a9.appspot.com",
//     messagingSenderId: "132198202241",
//     appId: "1:132198202241:web:2084ca9281893319fd8680",
//     measurementId: "G-5CTVWP0LHP"
// };

// const app = !firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app();
// const db = getFirestore(app);
// // const db = firebase.getFirestore();
// const auth = app.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { db, auth, provider };