import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import { menuNegateActive } from "../reducers/menuReducer";

const MenuOverlay = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div
      className="grow bg-gray-950/70"
      onClick={() => dispatch(menuNegateActive())}
    ></div>
  );
};

export default MenuOverlay;
