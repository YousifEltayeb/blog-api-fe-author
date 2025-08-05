import { useEffect } from "react";
import { useNavigate } from "react-router";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.localStorage.clear();
    navigate("/");
  });
};

export default Logout;
