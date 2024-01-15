import { useSelector } from "react-redux";
import { IUserForm } from "../models/component/userForm.component";

const UserDetailView = () => {
  const userFormState = useSelector(({ userForm }: { userForm: IUserForm }) => {
    return userForm;
  });

  return (
    <>
      <h1>Logged In as: {userFormState.username}</h1>
    </>
  );
};

export default UserDetailView;
