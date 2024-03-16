import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    console.log("user", user);
    // if (!user) {
    //   setCurrentUser(null);
    //   window.location.href = "/login";
    // }
    // incase user refreshes local session is cleared.
    if (user && !currentUser) {
      fetch(`/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(user).token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setCurrentUser(null);
        });
    }
  }, [user, currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
