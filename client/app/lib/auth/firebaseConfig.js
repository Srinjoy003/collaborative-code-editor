import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
	apiKey: "AIzaSyCQPr1Coz-qphPUhiSt9M83223C2f32cy0",
	authDomain: "react-firebase-auth-21045.firebaseapp.com",
	projectId: "react-firebase-auth-21045",
	storageBucket: "react-firebase-auth-21045.appspot.com",
	messagingSenderId: "377212134534",
	appId: "1:377212134534:web:0ab510b835bf724ff15d07",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

export default app;
