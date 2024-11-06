
import { useSignInMutation } from '../services/authSlice';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../redux/authSlice';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import ApiErrorModal from '../components/modal/ApiErrorModal';

const SignInWithUsernamePassword = () => {

    const dispatch = useDispatch()
    const [signIn, signInResponse] = useSignInMutation();

    const handleSignIn = async (event) => {

        try {
            event.preventDefault();

            const form = event.target
            if (form.checkValidity()) {
                const username = form['username'].value
                const password = form['password'].value

                const res = await signIn({ username, password })
                if (res.data) dispatch(setAuthData(res.data.token));
            }
            else {
                form.classList.add("was-validated");
            }

        } catch (error) {
            console.log(error)
        }


    }


    return (
        <form onSubmit={handleSignIn} className='d-flex flex-column justify-content-center rounded-3  bg-white p-5'>

            {signInResponse.isError && <ApiErrorModal res={signInResponse} />}

            <Input name={"username"} inputClass={"mb-3 rounded-pill p-1 ps-3 shadow-sm mb-3 border-info shadow"} placeholder={"Login with email or Phone"} required />
            <Input name={"password"} type={"password"} inputClass={"mb-3 rounded-pill p-1 ps-3 shadow-sm mb-3 border-info shadow"} required />

            <Button res={signInResponse}>Login</Button>
        </form>
    )
}

export default SignInWithUsernamePassword

