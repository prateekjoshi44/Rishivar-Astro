import { useEffect, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase"
import { useSignInMutation } from '../services/authSlice';
import GoogleIcon from '../assets/images/google-icon.png'
import { useDispatch } from 'react-redux';
import { setAuthData } from '../redux/authSlice';

const SignInWithGoogle = ({ isDisabled, onDisabledClick }) => {

    const dispatch = useDispatch()
    const provider = new GoogleAuthProvider();
    const [signIn, signInResponse] = useSignInMutation();
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const handleSignIn = async (event) => {

        try {
            event.preventDefault();
            setIsButtonLoading(true);
            const result = await signInWithPopup(auth, provider)
            const token = await result.user.getIdToken()
            const signInRes = await signIn({ token })
            if (signInRes.error) return
            dispatch(setAuthData(signInRes.data.token));

        } catch (error) {
            console.log(error)
            setIsButtonLoading(false);
        }


    }

    useEffect(() => { if (signInResponse.isSuccess) setIsButtonLoading(false) }, [signInResponse.isSuccess])

    return (
        <form onSubmit={handleSignIn} className='d-flex justify-content-center rounded-3  bg-white'>
            <div onClick={onDisabledClick}>
                <button className="btn btn-light border-0 card px-5 py-2  bg-white  w-100" disabled={isDisabled}>
                    {isButtonLoading ?
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div className='d-flex align-items-center'>
                            <img src={GoogleIcon} width={30} alt="Google Icon" className='me-2' />
                            <div>Sign in with Google</div>
                        </div>

                    }
                </button>
            </div>
        </form>
    )
}

export default SignInWithGoogle

