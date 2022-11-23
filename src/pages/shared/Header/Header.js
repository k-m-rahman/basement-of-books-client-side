import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { Link, NavLink, ScrollRestoration } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { addDarkModeDataToDb } from "../../../utils/fakeDb";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import logo from "../../../assets/books-icon.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSearchBooks = (event) => {
    event.preventDefault();
    const form = event.target;
    const book = form.service.value;
    form.reset();
    navigate(`/searchedBooks/${book}`);
  };

  const themeChanger = () => {
    setDarkMode(!darkMode);
    addDarkModeDataToDb(!darkMode);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.error("Logged Out!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="shadow-md md:pb-5 lg:pb-0 bg-[#ffb662dc] text-center sticky top-0 z-10 dark:bg-slate-800">
      <Navbar className="nav-bg  rounded-none pt-4 pb-6 " fluid={true}>
        <NavLink className="flex " to="/">
          <div className="flex gap-2">
            <span className="bg-gradient-to-r from-pink-500 to-pink-700 p-2 rounded-l-full">
              <img src={logo} className="w-8 lg:w-10 " alt="" />
            </span>
            <span className="self-center whitespace-nowrap text-2xl md:text-3xl font-bold dark:text-white flex items-end">
              <span className="text-3xl md:text-4xl ">B</span>{" "}
              <span>asement of </span>
              <span className="text-3xl md:text-4xl ">&nbsp;B</span>{" "}
              <span>ooks</span>
            </span>
          </div>
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <ScrollRestoration></ScrollRestoration>
          <form
            onSubmit={handleSearchBooks}
            className="relative mb-2 lg:mb-0 md:hidden lg:block"
          >
            <TextInput
              className=" lg:w-[300px] "
              id="book"
              name="book"
              type="text"
              placeholder="Search your desired book"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/3 cursor-pointer"
            >
              <FaSearch></FaSearch>
            </button>
          </form>

          <NavLink
            className={({ isActive }) =>
              !isActive
                ? "bg-cyan-100 p-2 rounded-md  sm:hover:scale-110 mb-1"
                : "bg-cyan-400 font-bold  p-2 rounded-md sm:hover:scale-110 mb-1"
            }
            to="/blogs"
          >
            Blogs
          </NavLink>

          {user ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  !isActive
                    ? "bg-cyan-100 p-2 rounded-md  sm:hover:scale-110 mb-1"
                    : "bg-cyan-400 font-bold  p-2 rounded-md sm:hover:scale-110 mb-1"
                }
                to="/dashboard"
              >
                Dashboard
              </NavLink>

              <span className=" flex justify-center ">
                <Dropdown
                  arrowIcon={false}
                  inline={true}
                  label={
                    <Avatar
                      className="border border-gray-300  rounded-full sm:hover:scale-110"
                      alt="User "
                      img={user?.photoURL}
                      rounded={true}
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {user.displayName ? user?.displayName : ""}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email}
                    </span>
                  </Dropdown.Header>

                  <Dropdown.Item onClick={handleLogout}>
                    <button>Sign out</button>
                  </Dropdown.Item>
                </Dropdown>
              </span>
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                !isActive
                  ? "bg-cyan-100 p-2 rounded-md  sm:hover:scale-110 mb-1"
                  : "bg-cyan-400 font-bold  p-2 rounded-md sm:hover:scale-110 mb-1"
              }
              to="/login"
            >
              Login
            </NavLink>
          )}

          <Button
            className="w-[50px] mx-auto mt-1 md:hidden lg:block"
            onClick={themeChanger}
            color={darkMode ? `dark` : `light`}
          >
            {darkMode ? <FaSun></FaSun> : <FaMoon></FaMoon>}
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <div className="mt-1 w-1/2 mx-auto  hidden md:grid grid-cols-6 gap-2 lg:hidden">
        <form onSubmit={handleSearchBooks} className="relative col-span-5">
          <TextInput
            className=" lg:w-[300px] "
            id="service"
            name="service"
            type="text"
            placeholder="Search your desired service"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/3 cursor-pointer"
          >
            <FaSearch></FaSearch>
          </button>
        </form>
        <Button
          className="w-[50px] mx-auto mt-1 "
          onClick={themeChanger}
          color={darkMode ? `dark` : `light`}
        >
          {darkMode ? <FaSun></FaSun> : <FaMoon></FaMoon>}
        </Button>
      </div>
    </div>
  );
};

export default Header;
