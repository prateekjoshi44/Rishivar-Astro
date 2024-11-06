

const Input = ({ name, prefix, inputClass, noLabel, ...attributes }) => {

  const inputClassName = `form-control ${inputClass ? inputClass : ""}`

  if (prefix) {
    return (
      <div className="col">
        {noLabel || <label htmlFor={name} className="form-label text-capitalize">{name}</label>}
        <div className="input-group">
          <span className="input-group-text">{prefix}</span>
          <input
            className={inputClassName}
            name={name}
            id={name}
            {...attributes}
          />
        </div>
      </div>

    )
  }
  else if (attributes.type === "textarea") {
    return (
      <div className="col">
        {noLabel || <label htmlFor={name} className="form-label text-capitalize">{name}</label>}
        <textarea
          className={inputClassName}
          name={name}
          id={name}
          {...attributes}
        />
      </div>
    )
  }

  return (
    <div className="col">

      {noLabel || <label htmlFor={name} className="form-label text-capitalize">{name}</label>}
      <input
        className={inputClassName}
        name={name}
        id={name}
        {...attributes}
      />
    </div>
  )
}

export default Input