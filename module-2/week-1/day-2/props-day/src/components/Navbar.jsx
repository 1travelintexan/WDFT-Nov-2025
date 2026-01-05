import logo from "../assets/ironhack-logo.png";
function Navbar(props) {
  console.log("props in the navbar", props);    
  return (
    <nav>
      <img alt="logo" src={logo} />
      <h1>{props.name}'s Page</h1>
      <button>Logout</button>
    </nav>
  );
}

export default Navbar;
