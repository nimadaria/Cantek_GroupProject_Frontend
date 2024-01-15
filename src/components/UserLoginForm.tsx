import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import { showResponseMsg } from "../reducers/ResponseMsgReducer";
import { userLogin } from "../reducers/UserFormReducer";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [userCredentialData, setUserCredentialData] = useState({
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleEmailChange = (e: React.FormEvent) => {
    setUserCredentialData({
      ...userCredentialData,
      email: (e.target as HTMLInputElement).value,
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    setUserCredentialData({
      ...userCredentialData,
      password: (e.target as HTMLInputElement).value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (userCredentialData.email && userCredentialData.password) {
        await dispatch(
          userLogin({
            email: userCredentialData.email,
            password: userCredentialData.password,
          })
        );
        dispatch(showResponseMsg({ isSuccess: true }));
      }
    } catch (err) {
      dispatch(showResponseMsg({ isSuccess: false, message: "LOGIN_FAILED" }));
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 w-full mr-2"
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 w-full ml-2"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default UserLoginForm;
