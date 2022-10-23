/**
 * Auth Context
 * file: AuthContext.jsx
 */
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase-config";

const AuthContext = createContext();
function AuthProvider(props) {
  const [adminInfo, setAdminInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const value = { adminInfo, setAdminInfo, loading, setLoading };

  useEffect(() => {
    onAuthStateChanged(auth, (admin) => {
      if (admin) {
        const docRef = query(collection(db, "admin"));
        where("email", "==", admin.email);

        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setAdminInfo({
              ...admin,
              ...doc.data(),
            });
            setLoading(true);
          });
        });
      } else {
        setAdminInfo(null);
      }
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
