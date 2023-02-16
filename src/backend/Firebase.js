import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

export default class Firebase {
	constructor() {
		this.firebaseConfig = {
			apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
			authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
			projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
			storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.REACT_APP_FIREBASE_APP_ID,
		};
		this.app = initializeApp(this.firebaseConfig);
		this.storage = getStorage(this.app);
		this.db = getDatabase(this.app);
		this.auth = getAuth();
	}

	async createNewUserAuth(email, password, callback) {
		try {
			let res = await createUserWithEmailAndPassword(this.auth, email, password);
			await Promise.resolve(this.sendVerificationEmail());
			callback(res);
		} catch (e) {
			if (e.code === "auth/email-already-in-use") {
				callback({ error: true, payload: "Email already exists" });
				return;
			}
			callback({ error: true });
		}
	}

	async sendVerificationEmail() {
		return new Promise(async (resolve, reject) => {
			try {
				resolve(await sendEmailVerification(this.auth.currentUser));
			} catch (e) {
				reject(e);
			}
		});
	}

	async signInUser(email, password, callback) {
		try {
			let userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
			callback(userCredentials.user.uid);
		} catch (error) {
			if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
				callback({ payload: "Invalid user credentials", error: true });
				return;
			}
			callback({ error: true });
		}
	}

	async signOutUser(callback) {
		try {
			await signOut(this.auth);
			callback(this.auth.currentUser);
		} catch (e) {
			callback({ error: true });
		}
	}
}
