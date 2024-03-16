import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const user = sessionStorage.getItem("user");

  useEffect(() => {
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
          setCurrentUser(data);
        })
        .catch((error) => {
          setCurrentUser(null);
          sessionStorage.removeItem("user");
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
        setAlert,
        alert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
