import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ProfilePicture from "../ProfilePicture";

const ProfilePictureInput = ({
  name,
  containerClass,
  defaultValue,
  ...attributes
}) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const containerClassName = containerClass ? containerClass : "";

  const onChange = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    const inputElement = fileInputRef.current;
    const form = inputElement?.form;

    if (form) {
      const handleReset = () => setFile(null);
      form.addEventListener("reset", handleReset);

      // Cleanup the event listener
      return () => {
        form.removeEventListener("reset", handleReset);
      };
    }
  }, []);

  return (
    <div className={containerClassName}>
      {file ? (
        <label htmlFor={name}>
          <img
            src={URL.createObjectURL(file)}
            className="object-fit-cover rounded-circle border border-2 border-dark"
            alt=""
            style={{ height: 100, width: 100 }}
          />
        </label>
      ) : defaultValue ? (
        <label htmlFor={name}>
          <ProfilePicture size={100} name={"hello"} picture={defaultValue} />
        </label>
      ) : (
        <label htmlFor={name}>
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ fontSize: "100px", color: "#6c757d" }}
          />
        </label>
      )}

      <input
        type="file"
        className="d-none"
        id={name}
        name={name}
        ref={fileInputRef}
        onChange={onChange}
        {...attributes}
      />
    </div>
  );
};

export default ProfilePictureInput;
