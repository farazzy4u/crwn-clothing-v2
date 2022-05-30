import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,} from 'firebase/auth';
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

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
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
                  createdAt
              });
          } catch(error) {
              console.log('error creating the user', error.message);

          }
      }
      
      return userDocRef;

      // return userDocRef


  };

