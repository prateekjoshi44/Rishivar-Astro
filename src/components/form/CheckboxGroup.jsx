

const CheckboxGroup = ({ name, options, rowClassName, defaultValues, disabled }) => {
  const className = `row ${rowClassName}`


  return (
    <>
      <div className="row mb-2">
        <h6 className='fw-bold text-capitalize'>{name}</h6>
      </div>

      <div className={className}>
        {
          options.map((op, index) =>
            <div key={index} className="form-check col">
              <input className="form-check-input" disabled={disabled} type="checkbox" value="" name={name} id={op} defaultChecked={defaultValues?.includes(op)} />
              <label className="form-check-label" htmlFor={op}> {op} </label>
            </div>
          )
        }
      </div>
    </>
  )
}

export default CheckboxGroup