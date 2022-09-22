// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// https://firebase.google.com/docs/web/setup#available-libraries

/* The actual values have been moved to the .env file, which is ignored by .gitignore to keep account-specific
stuff out of github and make the project more generic. Note though that a curious user can discover all of these
values by examining the code of the web app. That's OK. Firebase is built for that. There's a server-side admin
library that takes some extra credentials if you need to use that (it can, like, change other people's user accounts
or write to firestore regardless of rules) */

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// just having this call somewhere in the code turns on analytics:
export const firebaseAnalytics = getAnalytics(firebaseApp);

export const store = getFirestore();
export const auth = getAuth();
export const functions = getFunctions();