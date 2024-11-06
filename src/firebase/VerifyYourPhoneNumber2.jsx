import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ErrorModal from "../components/modal/ErrorModal";
import { useSignInMutation } from "../services/authSlice";
import { setAuthData } from "../redux/authSlice";
import PhoneInput from "react-phone-input-2";
import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";

export default function VerifyYourPhoneNumber2() {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signIn, signInResponse] = useSignInMutation();

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const formClassName = "d-"

    const btnClassName = "btn btn-primary rounded-3 text-white fw-bold w-100"

    const setIsOtpVerified = () => navigate(`/`)


    const sendOtp = async (event) => {

        try {
            event.preventDefault();
            const form = event.target
            form?.classList.add('was-validated')
            phoneNumberOnChange()
            if (!form.checkValidity()) return
            setIsLoading(true)

            window.recaptchaVerifier = new RecaptchaVerifier(auth,
                "sign-in-button",
                {
                    size: "invisible",
                    callback: () => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        // console.log("callback", response)
                    },
                    "expired-callback": () => {
                        // Response expired. Ask user to solve reCAPTCHA again.
                        // console.log("expired callback", response)
                    },
                },

            );

            const phone = form["phone"].value



            const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)

            window.confirmationResult = result;
            setIsOtpSent(true);
            setIsLoading(false);

        } catch (error) {
            console.error(error);
            setError("Failed to send OTP");
            setIsLoading(false);
        }


    };

    const verifyOtp = async (event) => {

        try {

            event.preventDefault();

            const form = event.target
            form?.classList.add('was-validated')
            if (!form.checkValidity()) return

            setIsLoading(true);

            const result = await window.confirmationResult.confirm(form["otp"].value)
            const user = result.user;

            const signInRes = await signIn({ token: user.accessToken });
            if (signInRes.error) return
            dispatch(setAuthData(signInRes.data.token));
            setIsLoading(false);
            setIsOtpVerified(true);

        } catch (error) {
            console.error(error)
            setIsLoading(false);
            setError("Failed to verify OTP");
        }

    };

    const phoneNumberOnChange = () => {
        const form = document.getElementById("sendOtpForm")
        const phoneNumberFloating = document.getElementById("phoneNumberFloating")
        const phoneNumber = document.getElementById("phoneNumber")

        if (form?.classList.contains('was-validated')) {
            if (phoneNumber.checkValidity()) {
                if (phoneNumberFloating?.classList.contains("is-invalid")) {
                    phoneNumberFloating?.classList.remove("is-invalid")
                }
            }
            else {
                phoneNumberFloating?.classList.add("is-invalid")
            }
        }
    }


    if (signInResponse.isLoading) return <PageLoading />;
    if (signInResponse.isError) return <ApiErrorModal res={signInResponse} />;

    return (
        <div className='container-fluid py-3 px-lg-5 d-flex flex-column align-items-center justify-content-center h-100'>

            {/* <Image src={rishivarIcon} className={"w-100 text-start"} /> */}

            <form id="sendOtpForm" onSubmit={sendOtp} className={formClassName} noValidate>
                {error && <ErrorModal label="Error" message="Invalid Phone Number" />}

                <div className="row mb-3">
                    <div className="col">
                        <h6 className="fw-bold">Enter Your Mobile Number</h6>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">

                        {/* <div className="input-group shadow-sm rounded-3" id="phoneNumberFloating">
                            <span className="input-group-text bg-dark bg-opacity-10 text-muted fw-bold">+91</span>
                            <input
                                id="phoneNumber"
                                className="form-control bg-dark bg-opacity-10 text-muted fw-bold rounded-end-3"
                                placeholder="Phone Number"
                                type="tel"
                                name="phone"
                                minLength={10}
                                maxLength={10}
                                required
                                disabled={isOtpSent}
                                onChange={phoneNumberOnChange}
                            />
                            <div className="invalid-feedback text-center">
                                Please enter a valid 10 digit mobile number
                            </div>
                        </div> */}

                        <PhoneInput
                            country={'in'}
                            // disabled={disabled}
                            inputStyle={{ width: '100%' }}
                            disabled={isOtpSent}

                            inputProps={{
                                id: "phoneNumber",
                                name: "phone",
                                required: true,
                            }}


                            onChange={phoneNumberOnChange}
                        />
                    </div>
                </div>

                {
                    !isOtpSent &&
                    <div>
                        <div className="row">
                            <div className="col">
                                {
                                    isLoading ?
                                        <button className={btnClassName} type="button" disabled >
                                            <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                                            SENDING OTP
                                        </button>
                                        :
                                        <button className={btnClassName} id="sign-in-button" >
                                            SEND OTP
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                }

            </form>

            <form className={(isOtpSent) ? formClassName : "d-none"} onSubmit={verifyOtp} noValidate>
                {error && <ErrorModal label="Error" message="Invalid OTP" />}

                <div className="row mb-3 ">
                    <div className="col w-100">
                        <input
                            className="form-control bg-dark bg-opacity-10 text-muted fw-bold rounded-end-3"
                            type="tel"
                            name="otp"
                            placeholder="Enter OTP"
                            minLength={6}
                            maxLength={6}
                            required
                        />
                        <div className="invalid-feedback text-center">
                            Please enter a valid 6 digit OTP
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        {
                            isLoading ?
                                <button className={btnClassName} type="button" disabled >
                                    <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                                    Verifying OTP
                                </button>
                                :
                                <button className={btnClassName} >
                                    Verify OTP
                                </button>
                        }
                    </div>
                </div>

            </form>

        </div>
    )

}