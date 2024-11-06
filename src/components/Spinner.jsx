

const Spinner = ({ size, grow, className }) => {
  const width = size || 50
  const height = width
  const type = grow ? "grow" : "border"
  const spinnerClassName = `spinner-${type} ${className ? className : ""}`
  return (
    <div className={spinnerClassName} style={{ width, height }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Spinner