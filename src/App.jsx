import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./assets/scss/bootstrap.scss";
import "./assets/css/responsive.css";
import "./assets/css/global.css";
import "./assets/css/fonts.css";
import "./assets/css/animations.css";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";

import Calls from "./pages/call/Calls";
import Call from "./pages/call/Call";
import Chat from "./pages/chat/Chat";
import Chats from "./pages/chat/Chats";

import Order from "./pages/order/Order";
import Orders from "./pages/order/Orders";
import { useSelector } from "react-redux";
import Posts from "./pages/post/Posts";
import Profile from "./pages/profile/Profile";
import RedirectToRoot from "./pages/RedirectToRoot";
import ActiveChatPage from "./pages/ActiveChatPage";
import AstroPayments from "./pages/astroPayment/AstroPayments";
import AstroPayment from "./pages/astroPayment/AstroPayment";
import SignInV1 from "./pages/SignInV1";
import VerifyYourPhoneNumber2 from "./firebase/VerifyYourPhoneNumber2";
import ActiveAudioCallPage from "./pages/call/ActiveAudioCallPage";
import ActiveVideoCallPage from "./pages/call/ActiveVideoCallPage";
import BackgroundFcm from "./firebase/BackgroundFcm";
import FrontPage from "./pages/FrontPage";
import SplashScreen from "./pages/SplashScreen";


function App() {
  const isSignedIn = useSelector((state) => state.auth.authToken);

  const [isStarting, setIsStarting] = useState(true);
  const [isSplashed, setIsSplashed] = useState(true);

  const startWithPermission = () => {
    const permissions = window.cordova.plugins.permissions;
    console.log(permissions)
    permissions.requestPermissions([permissions.CAMERA, permissions.RECORD_AUDIO], success, error);

    function success(status) {
      if (!status.hasPermission) {
        error(status);
      }
      else setIsStarting(false)
    }

    function error(err) {
      console.log("error", err)
      console.warn('Camera or Microphone permission is not turned on');
    }
  }

  useEffect(() => {
    if (window.cordova) document.addEventListener("deviceready", startWithPermission, false);
    else setIsStarting(false);
  }, []);

  useEffect(() => {
    import("bootstrap");
  }, []);

  useEffect(() => {
    if (!isStarting && !isSplashed && window.cordova) window.StatusBar.backgroundColorByHexString('#fe6a0e')
  }, [isStarting, isSplashed])

  if (isStarting || isSplashed) {
    return <SplashScreen setIsSplashed={setIsSplashed} />;
  }

  return (
    <Routes>
      {isSignedIn ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path='/backgroundNotification/:subject/:subjectId/:event' element={<BackgroundFcm />} />


          <Route path="Call">
            <Route index element={<Calls />} />
            <Route path=":id">
              <Route index element={<Call />} />
              {/* <Route path="active" element={<ActiveCallPage />} /> */}
              <Route path="active/audio" element={<ActiveAudioCallPage />} />
              <Route path="active/video" element={<ActiveVideoCallPage />} />
            </Route>
          </Route>

          <Route path="Chat">
            <Route index element={<Chats />} />
            <Route path=":id">
              <Route index element={<Chat />} />
              <Route path="active" element={<ActiveChatPage />} />
            </Route>
          </Route>

          <Route path="AstroPayment">
            <Route index element={<AstroPayments />} />
            <Route path=":id" element={<AstroPayment />} />
          </Route>

          <Route path="Order">
            <Route index element={<Orders />} />
            <Route path=":id" element={<Order />} />
          </Route>

          <Route path="Posts" element={<Posts />} />

          <Route path="Profile" element={<Profile />} />

          <Route path="*" element={<RedirectToRoot />} />
        </Route>
      ) : (
        <Route path="/">

          <Route index element={< FrontPage />} />

          <Route path="SignIn" element={<SignInV1 />} />
          <Route path="loginWithPhone" element={<VerifyYourPhoneNumber2 />} />
          <Route path="*" element={<RedirectToRoot />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
