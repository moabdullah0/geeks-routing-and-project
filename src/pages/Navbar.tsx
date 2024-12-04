import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row gap-5">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/products"}>Product Page</NavLink>
        <NavLink to={"/users"}>Users</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
