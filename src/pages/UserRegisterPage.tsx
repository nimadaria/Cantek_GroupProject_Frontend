import { useDispatch } from "react-redux";
import UserRegisterForm from "../components/UserRegisterForm";
import { useEffect } from "react";
import { AppDispatch } from "../config/store";
import { menuNegateActive } from "../reducers/menuReducer";
import { loginFormNegateActive } from "../reducers/UserFormReducer";
import ResponseResultMessage from "../components/ResponseMessage";
import { Helmet } from "react-helmet";

const UserRegisterPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(menuNegateActive());
    dispatch(loginFormNegateActive());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>LiCAN User Registration</title>
      </Helmet>
      <div className="fixed inset-0 bg-gray-950/50 z-50 flex justify-center items-center">
        <div className="bg-white z-40 rounded-lg p-4 shadow-lg max-w-md w-full mx-4 md:mx-0">
          <ResponseResultMessage />
          <UserRegisterForm />
        </div>
        <div className="h-full w-full fixed z-30"></div>
      </div>
    </>
  );
};

export default UserRegisterPage;
