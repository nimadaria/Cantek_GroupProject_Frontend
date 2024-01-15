import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../config/store";
import { IUserForm } from "../models/component/userForm.component";
import { loginFormNegateActive } from "../reducers/UserFormReducer";
import UserLoginForm from "./UserLoginForm";
import UserDetailView from "./UserDetailView";

const UserMenu = () => {
  const dispatch: AppDispatch = useDispatch();

  const userFormState = useSelector(({ userForm }: { userForm: IUserForm }) => {
    return userForm;
  });

  return (
    userFormState.isActive && (
      <div className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm z-50 flex justify-center items-center">
        <div className="bg-white z-40 rounded-lg p-4 shadow-lg max-w-md w-full mx-4 md:mx-0">
          {userFormState.isLogin ? <UserDetailView /> : <UserLoginForm />}
        </div>
        <div
          className="h-full w-full fixed z-30"
          onClick={() => dispatch(loginFormNegateActive())}
        ></div>
      </div>
    )
  );
};

export default UserMenu;
