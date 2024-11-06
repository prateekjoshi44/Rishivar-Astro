import { useEffect } from 'react'

const ErrorModal = ({ title, message }) => {
  const id = "ErrorModal"
  const btnId = id + "Button"

  useEffect(() => {
    document.getElementById(btnId).click()
  }, [])

  return (
    <>
      <button type="button" className="d-none" id={btnId} data-bs-toggle="modal" data-bs-target={"#" + id}>
        Launch demo modal
      </button>

      <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id + "Label"} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-danger" id={id + "Label"}>{title || "Error!!!"}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorModal