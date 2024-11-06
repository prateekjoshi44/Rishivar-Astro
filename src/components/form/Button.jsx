import { useEffect } from "react";
import "../../assets/css/timerV1.css";

const Button = ({
  res,
  refetch,
  children,
  loadingText,
  color,
  outline,
  className,

  icon,
  ...attributes
}) => {
  const btnClassName = `col btn btn${outline ? "-outline" : ""}-${color || "primary"
    } ${className}`;

  useEffect(() => {
    if (res?.isSuccess && refetch) refetch();
  }, [res]);

  if (res?.isLoading) {
    if (icon) {
      return (
        <button className={btnClassName} type="button" disabled>
          <div className="icon-rotate mr-2">{children}</div>
        </button>
      );
    }
    return (
      <button className={btnClassName} type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          aria-hidden="true"
        ></span>
        <span role="status">{loadingText || "Loading"}...</span>
      </button>
    );
  }

  return (
    <button className={btnClassName} {...attributes}>
      {children}
    </button>
  );
};

export default Button;
