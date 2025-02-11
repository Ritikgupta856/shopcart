import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { CgShoppingCart } from "react-icons/cg";
import Search from "../Search/Search";
import Cart from "../Cart/Cart";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { TbSearch } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserMenu from "../UserMenu/UserMenu";
import { AuthContext } from "../../Context/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Header = () => {
  const [showCart, setshowCart] = useState(false);
  const [showSearch, setshowSearch] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const { cartCount } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`, { replace: true });
  };

  return (
    <header className="sticky z-20 top-0 w-full py-4 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 bg-white border-b border-neutral-500/50 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} width={30} alt="ShopCart Logo" />
          <span className="text-xl font-bold text-primary">ShopCart</span>
        </div>

        <div className="hidden sm:flex">
          <div className="flex gap-10 items-center font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/"
                    >
                      Home
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/about-us"
                    >
                      About Us
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      {["Headphones", "Smart Watches", "Bluetooth Speakers", "Wireless Earbuds", "Home Theatre"].map((item) => (
                        <li key={item} onClick={() => handleCategoryClick(item)} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                          <NavigationMenuLink asChild>
                            <span>{item}</span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <TbSearch size={20} onClick={() => setshowSearch(true)} className="cursor-pointer" />

          <span className="relative flex cursor-pointer" onClick={() => setshowCart(true)}>
            <CgShoppingCart size={20} />
            {!!cartCount && (
              <span className="absolute bg-red-500 -top-3 -right-4 rounded-full flex items-center justify-center w-6 h-6 text-center text-white">
                {cartCount}
              </span>
            )}
          </span>
          <div className="relative">
            {currentUser.user ? (
              <span
                onClick={() => setshowMenu(!showMenu)}
                className="relative text-white bg-black h-8 w-8 rounded-full flex items-center justify-center font-semibold cursor-pointer"
              >
                {currentUser.user.fullname[0]}
              </span>
            ) : (
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => setshowMenu(!showMenu)}>
                <FaRegUser size={20} />
                <MdKeyboardArrowDown />
              </div>
            )}
          </div>
        </div>
      </div>

      {showCart && <Cart setshowCart={setshowCart} />}
      {showSearch && <Search setshowSearch={setshowSearch} />}
      {showMenu && <UserMenu setshowMenu={setshowMenu} />}
    </header>
  );
};

export default Header;