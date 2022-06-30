import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from   'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBBjLVeyXmGnTITceGaCBeGtyzLtvYpe2k",
    authDomain: "crwn-clothing-db-c8bab.firebaseapp.com",
    projectId: "crwn-clothing-db-c8bab",
    storageBucket: "crwn-clothing-db-c8bab.appspot.com",
    messagingSenderId: "598323454399",
    appId: "1:598323454399:web:7f2d73e2df8b51d2ae410a"
  };
 
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt:"select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
      if(!userAuth) return;
      const userDocRef = doc(db, 'users', userAuth.uid);

      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      // if user data exist

      // if user data does not exist
      // create/ set the document with the data from userAuth in my Collection

      if(!userSnapshot.exists()) {
          const { displayName, email} = userAuth;
          const createdAt = new Date();

          try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt,
                  ...additionalInformation
              });
          } catch(error) {
              console.log('error creating the user', error.message);

          }
      }
      
      return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}