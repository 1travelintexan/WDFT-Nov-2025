import { NavLink } from "react-router-dom";
import logo from "../assets/ironhack-logo.png";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
const Navbar = () => {
  //get the setter and the state from the context
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <nav className={darkTheme ? "nav-dark" : null}>
      <img src={logo} alt="logo" />
      <h3>C.R.U.D.</h3>

      <NavLink to={"/"}>All Recipes</NavLink>

      <NavLink to="add-recipe">Add a Recipe</NavLink>
      <button onClick={() => setDarkTheme(!darkTheme)}>
        {darkTheme ? "Light" : "Dark"} Theme
      </button>
    </nav>
  );
};
export default Navbar;
