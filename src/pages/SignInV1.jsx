
import SignInWithUsernamePassword from "../firebase/SignInWithUsernamePassword";

const SignInV1 = () => {
  return (
    <div className="h-100 position-relative">
      <div
        className="position-absolute h-100 w-100 bg-light"
        style={{ zIndex: -2 }}
      ></div>

      <div className="w-100 h-100">
        <div className="container h-100 d-flex align-items-center">
          <div className="row row-cols-1 row-cols-lg-2 justify-content-around w-100 g-4 m-0">


            <div className="col d-flex flex-column align-items-center">
              <h1 className="mb-3 mb-md-4">Welcome</h1>
              <h5 className="mb-3 mb-md-4">Sign in to your account</h5>

              <div className="mb-3 mb-md-5 w-100">
                <div className="w-100 bg-white shadow rounded-3">
                  {/* {!window.cordova && <SignInWithGoogle />} */}
                  {!window.cordova && <SignInWithUsernamePassword />}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SignInV1;

