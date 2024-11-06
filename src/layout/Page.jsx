import { Link, useLocation } from "react-router-dom";
// import { sidebarLinks } from "./Sidebar";
import { useEffect, useState } from "react";
import { sidebarLinks } from "./Sidebar";

const Page = ({ children }) => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const revOptions = sidebarLinks.reverse();
  let options = pathname.split("/");
  if (options.length === 2 && options[1] === "") options = [options[0]];
  options = options.map((o) => (o === "" ? "Dashboard" : o));

  useEffect(() => {
    setTitle(
      revOptions.find((o) => pathname.includes(o.to))?.text || "Dashboard"
    );
  }, [pathname]);

  return (
    <div className="p-3 p-lg-5  h-100 overflow-y-auto ">
      <h3>
        <span className="me-3">{revOptions.find((o) => o.text === title)?.icon()}</span>
        {title}</h3>

      <nav aria-label="breadcrumb d-lg-block d-none">
        <ol className="breadcrumb ">
          {options.map((option, index) => {
            if (index === options.length - 1) {
              return (
                <li
                  key={index}
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  {option}
                </li>
              );
            } else {
              return (
                <li key={index} className="breadcrumb-item">
                  <Link to={sidebarLinks.find((o) => o.text === option).to}>
                    {option}
                  </Link>
                </li>
              );
            }
          })}
        </ol>
      </nav>

      {children}
    </div>
  );
};

export default Page;