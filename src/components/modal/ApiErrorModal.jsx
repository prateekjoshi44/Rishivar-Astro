
import ErrorModal from './ErrorModal'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../redux/authSlice'

const ApiErrorModal = ({ res }) => {

  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(setAuthData(null));
  }

  if (!res.error) return <></>

  if (res.error.status === 401) {
    signOut()
    return <></>
  }

  return (
    <ErrorModal message={res?.error?.data?.message} />
  )
}

export default ApiErrorModal