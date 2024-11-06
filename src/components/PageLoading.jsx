
import Spinner from './Spinner'

const PageLoading = () => {
  return (
    <div className='d-flex flex-column h-100 justify-content-center align-items-center'>
      <Spinner className={"mb-3"} />
      <div className='fs-5 fw-bold'>Loading.....</div>
    </div>
  )
}

export default PageLoading