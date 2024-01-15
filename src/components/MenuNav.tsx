import beerCanLogo from "../assets/icon/can-of-beer.svg";

const MenuNav = () => {
  return (
    <div className="fixed w-full h-15 top-0 bg-gray-950">
      <div className="flex items-center justify-center p-3">
        <img src={beerCanLogo} className="h-12 w-12" alt="arrow" />
      </div>
    </div>
  );
};

export default MenuNav;
