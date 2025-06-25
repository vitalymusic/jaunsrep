import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className=" bg-slate-800 p-3">
        <ul className="flex justify-around">
          <li>
            <Link to="/" className="text-white">Home</Link>
          </li>
          <li>
            <Link to="/news" className="text-white">Ziņas</Link>
          </li>
          <li>
            <Link to="/courses" className="text-white">Kursi</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;