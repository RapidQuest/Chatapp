import React, { useContext, useState, useEffect } from "react";
import { Auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(name, email, password, role) {
    let user = {
      "name": name,
      "email": email,
      "password": password,
      "role": role,
      "chatId":[]
  }
  return fetch('http://localhost:5000/users/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
          'Content-Type': 'application/json'
      },
  })
  .then(res => res.json()) 
  .then(data => console.log(data));
  }

  function login(email, password) {
    return Auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return Auth.signOut();
  }

  function resetPassword(email) {
    return Auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
