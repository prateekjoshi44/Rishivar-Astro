import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import IncomingChat from "../firebase/IncomingChat";
import IncomingCall from "../firebase/IncomingCall";
import IsCallActive from "../firebase/IsCallActive";
import IsChatActive from "../firebase/IsChatActive";

const SidebarRender = () => {
  const location = useLocation();

  // Check if the current route includes '/Chat' and ':id'
  const hideSidebar =
    (location.pathname.includes("/Chat/") &&
      location.pathname.includes("/active")) ||
    (location.pathname.includes("/Call/") &&
      location.pathname.includes("/active"));

  if (hideSidebar) {
    return null; // Do not render the sidebar
  }

  return (
    <>
      <div
        className="d-none d-lg-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
        style={{ width: 280 }}
      >

        <Sidebar />
      </div>

      {/* offcanvas */}
      <div className="d-block d-lg-none">

        <div className="bg-primary p-3 d-flex justify-content-between">
          <h3>
            <Link to={"/"} className="text-white text-decoration-none">
              Astro Rishivar
            </Link>
          </h3>
          <button
            className="btn btn-secondary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <GiHamburgerMenu />
          </button>
        </div>

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-body">
            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            <Sidebar />
          </div>
        </div>
      </div>
      <IncomingChat />
      <IncomingCall />

      <IsChatActive />
      <IsCallActive />
    </>
  );
};

export default SidebarRender;
