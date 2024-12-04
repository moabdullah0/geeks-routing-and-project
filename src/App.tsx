import { Link, NavLink, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <div className="text-red-400">
      Hello
      <Navbar/>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
