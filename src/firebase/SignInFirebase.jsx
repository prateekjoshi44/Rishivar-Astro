import { GoogleAuthProvider, PhoneAuthProvider } from 'firebase/auth'
import { auth as authUI } from 'firebaseui'
import { useEffect } from 'react'
import { auth } from './firebase'
import 'firebaseui/dist/firebaseui.css'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../redux/authSlice'
import { useSignInMutation } from '../services/authSlice'
import PageLoading from '../components/PageLoading'
import ApiErrorModal from '../components/modal/ApiErrorModal'

const SignInFirebase = () => {

  const dispatch = useDispatch();
  const [signIn, signInResponse] = useSignInMutation();

  useEffect(() => {
    const ui = new authUI.AuthUI(auth)
    ui.start("#SignIn", {
      callbacks: {
        signInSuccessWithAuthResult: async (authResult) => {
          const body = { token: authResult.user.accessToken };
          const res = await signIn(body)
          dispatch(setAuthData(res.data.token));
        }
      },
      signInFlow: "popup",
      // signInSuccessUrl: '/',
      signInOptions: [GoogleAuthProvider.PROVIDER_ID, PhoneAuthProvider.PROVIDER_ID]
    })

  }, [])


  if (signInResponse.isLoading) return <PageLoading />;
  if (signInResponse.isError) return <ApiErrorModal res={signInResponse} />;

  return (
    <div id='SignIn'>

    </div>
  )
}

export default SignInFirebase