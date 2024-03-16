import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Landing = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Landing Page</h1>
      {currentUser && <h2>Welcome {currentUser.email}</h2>}
    </div>
  );
};

export default Landing;
