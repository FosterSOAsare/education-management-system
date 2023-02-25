import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updatePassword, onAuthStateChanged, applyActionCode, updateProfile } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
		this.db = getFirestore(this.app);
		this.auth = getAuth();
		this.googleProvider = new GoogleAuthProvider();
	}

	async createNewUserAuth(email, password, callback) {
		try {
			let res = await createUserWithEmailAndPassword(this.auth, email, password);
			try {
				await Promise.resolve(this.sendVerificationEmail());
				callback(res);
			} catch (e) {
				console.log(e);
			}
		} catch (e) {
			if (e.code === "auth/email-already-in-use") {
				callback({ error: true, payload: "Email already exists" });
				return;
			}
			callback({ error: true });
		}
	}
	async useGoogleAuth(callback) {
		try {
			let result = await signInWithPopup(this.auth, this.googleProvider);
			// const credential = GoogleAuthProvider.credentialFromResult(result);
			// const token = credential.accessToken;
			const user = result.user;
			callback(user);
		} catch (error) {
			console.log(error);
		}
	}

	async sendVerificationEmail() {
		return new Promise(async (resolve, reject) => {
			try {
				if (!this.auth.currentUser) {
					reject({ error: true, payload: "auth-error" });
					return;
				}
				resolve(
					await sendEmailVerification(this.auth.currentUser, {
						url: "http://localhost:3000/verifications",
					})
				);
			} catch (e) {
				console.log(e);
				reject(e);
			}
		});
	}
	async checkVerifiedEmail(callback) {
		return this.auth?.currentUser?.emailVerified;
	}

	async verifyEmail(oobCode, callback) {
		try {
			if (this?.auth?.currentUser?.emailVerified) {
				callback(this.auth);
				return;
			}
			applyActionCode(this?.auth, oobCode).then((res) => {
				callback(this?.auth);
			});
		} catch (e) {
			if (e.code === "auth/invalid-action-code") {
				callback({ payload: "Invalid action code", error: true });
				return;
			}
			callback({ error: true });
		}
	}

	async updateUserProfile(fullname, callback) {
		try {
			await updateProfile(this?.auth?.currentUser, {
				displayName: fullname,
			});
			callback("success");
		} catch (e) {
			console.log(e);
			callback({ error: true });
		}
	}

	async signInUser(email, password, callback) {
		try {
			let userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
			if (userCredentials.user.emailVerified === false) {
				this.signOutUser((res) => {
					if (res?.error) {
						callback(res);
					} else {
						callback({ error: true, payload: "unverified" });
					}
				});
				return;
			}
			callback(userCredentials.user);
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

	async changeUserPassword(oldPassword, newPassword, callback) {
		try {
			// Check if the details are correct
			updatePassword(this.auth.currentUser, newPassword)
				.then(() => {
					callback("success");
				})
				.catch((error) => {
					callback({ error: true });
				});
		} catch (e) {
			callback({ error: true });
		}
	}

	async getAuth(callback) {
		onAuthStateChanged(this.auth, (res) => {
			callback(res.auth.currentUser);
		});
	}

	async getUserData(callback) {
		try {
			await this.getAuth((res) => {
				callback(res);
			});
		} catch (error) {
			console.log(error);
			callback({ error: true });
		}
	}
}
