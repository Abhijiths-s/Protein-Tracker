import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  const user = result.user;
  console.log(user);
  console.log(result);

  
  const token = await user.getIdToken();

  return { user, token };
};

export const loginWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();

    return { user, token };
};

export const signupWithEmail = async (email, password) => {
  const userCredential=await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const token=await user.getIdToken();
  return {user, token};
};