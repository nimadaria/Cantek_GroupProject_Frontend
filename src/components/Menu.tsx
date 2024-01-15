import { useSelector } from "react-redux";
import { IMenuComponentState } from "../models/component/menu.component";
import MenuNav from "./MenuNav";
import MenuFooter from "./MenuFooter";
import MenuSectionList from "./MenuSectionList";
import MenuOverlay from "./MenuOverlay";

const Menu = () => {
  const menuActiveState = useSelector(
    ({ menu }: { menu: IMenuComponentState }) => {
      return menu.isActive;
    }
  );

  return (
    <div
      className={`${
        menuActiveState ? "flex" : "hidden"
      } fixed w-full h-full z-50 `}
    >
      <div className="h-full w-72 bg-gray-950/80 backdrop-blur">
        <MenuNav />
        <MenuSectionList />
        <MenuFooter />
      </div>

      <MenuOverlay />
    </div>
  );
};

export default Menu;
