
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../redux/authSlice'
import SuccessModal from './SuccessModal '

const ApiSuccessModal = ({ res, message }) => {
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(setAuthData(null));
  }

  if (res.error?.status === 401) {
    signOut()
    return <></>
  }

  const successMessage = res.success?.data?.message || `${message ? message : 'Operation'} was successful!`

  return (
    <SuccessModal message={successMessage} />
  )
}

export default ApiSuccessModal
