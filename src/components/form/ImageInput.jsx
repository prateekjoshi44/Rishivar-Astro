//  import  { Children, useEffect, useRef, useState } from "react";

// const ImageInput = ({
//   name,
//   labelName,
//   labelClass,
//   containerClass,
//   defaultValue,
//   children,
//   ...attributes
// }) => {
//   const [file, setFile] = useState(null);
//   const fileInputRef = useRef(null);

//   const containerClassName = " " + (containerClass ? containerClass : "");
//   const labelClassName = "  " + (labelClass ? labelClass : "");

//   const onChange = (e) => setFile(e.target.files[0]);

//   useEffect(() => {
//     const inputElement = fileInputRef.current;
//     const form = inputElement?.form;

//     if (form) {
//       const handleReset = () => setFile(null);
//       form.addEventListener("reset", handleReset);

//       // Cleanup the event listener
//       return () => {
//         form.removeEventListener("reset", handleReset);
//       };
//     }
//   }, []);

//   return (
//     <div className={containerClassName}>
//       {file ? (
//         <label htmlFor={name}>
//           <img
//             src={URL.createObjectURL(file)}
//             className="object-fit-cover rounded-circle mt-4  ms-3 border border-2 border-dark"
//             alt=""
//             style={{ height: 50, width: 50 }}
//           />
//         </label>
//       ) : defaultValue ? (
//         <label htmlFor={name}>
//           <img
//             src={defaultValue}
//             className="object-fit-cover rounded-circle border border-2 border-dark"
//             alt=""
//             style={{ height: 50, width: 50 }}
//           />
//         </label>
//       ) : (
//         <div className="d-flex  t flex-column align-items-center w-100">
//           <span
//             className="  me-2  justify-start"
//             style={{
//               fontSize: "1rem",
//               alignSelf: "flex-start",
//               paddingBottom: 6,
//             }}
//           >
//             {name}
//           </span>
//           <label
//             htmlFor={name}
//             className={labelClassName}
//             style={{
//               fontSize: "1rem",
//               paddingTop: 6,
//               paddingBottom: 6,
//             }}
//           >
//             {labelName ? labelName : "Select Image"}
//           </label>
//         </div>
//       )}

//       <input
//         type={"file"}
//         className={"d-none"}
//         id={name}
//         name={name}
//         ref={fileInputRef}
//         onChange={onChange}
//         {...attributes}
//       />

//       {children ? (
//         children
//       ) : (
//         <>
//           <div className="invalid-feedback">*Select Image</div>
//           {/* <div className="fw-bold mt-2">{name}</div> */}
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageInput;
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ImageInput = ({ name, containerClass, defaultValue, ...attributes }) => {
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
          <img
            src={defaultValue}
            className="object-fit-cover rounded-circle border border-2 border-dark"
            alt=""
            style={{ height: 100, width: 100 }}
          />
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

export default ImageInput;
