import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getcurrentUser } from "./authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getcurrentUser());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
