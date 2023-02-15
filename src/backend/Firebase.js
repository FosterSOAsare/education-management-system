import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

export default class Firebase {
	constructor() {
		this.firebaseConfig = {
			apiKey: process.env.REACT_APP_FIREBASE_KEY,
			authDomain: "education-management-sys-26fae.firebaseapp.com",
			projectId: "education-management-sys-26fae",
			storageBucket: "education-management-sys-26fae.appspot.com",
			messagingSenderId: "786831529626",
			appId: "1:786831529626:web:dc54eb714ed54b2af2f123",
		};
		this.app = initializeApp(this.firebaseConfig);
		this.storage = getStorage(this.app);
		this.db = getDatabase(this.app);
	}
}
