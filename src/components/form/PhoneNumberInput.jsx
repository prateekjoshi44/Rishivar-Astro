import PhoneInput from "react-phone-input-2";

const PhoneNumberInput = ({ name, defaultValue, disabled }) => {
  return (
    <div className="col">
      <label htmlFor={name} className="form-label text-capitalize">
        {"Phone Number"}
      </label>
      <PhoneInput
        country={"in"}
        disabled={disabled}
        inputStyle={{ width: "100%" }}
        inputProps={{
          name,
          id: name,
          required: true,
        }}
        value={defaultValue || ""}
        onChange={(phone) => {
          console.log(phone);
        }}
      />
    </div>
  );
};

export default PhoneNumberInput;
