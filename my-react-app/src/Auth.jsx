import { useState } from "react";
import { signInWithGoogle, logOut, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const Auth = () => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Auth;
