import { useEffect, useState } from "react";
import { usePatchProfileMutation } from "../services/profileSlice";
import { useDispatch } from "react-redux";
import { setFcmData } from "../redux/authSlice";
import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import FcmHandler from "./FcmHandler";


const ForegroundCordovaFcm = () => {

  const dispatch = useDispatch()
  const [patchProfile, patchProfileRes] = usePatchProfileMutation()
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const [subject, setSubject] = useState(null)
  const [event, setEvent] = useState(null)
  const [subjectId, setSubjectId] = useState(null)
  const [messageId, setMessageId] = useState(null)

  const handleNotification = (data) => {
    setTitle(data.title)
    setBody(data.body)
    setSubject(data.subject)
    setEvent(data.event)
    setSubjectId(data.subjectId)
    setMessageId(data.google.message_id)
  }

  const onTokenReceived = async (fcmToken) => {
    try {
      await patchProfile({ fcmToken })
      window.cordova.plugins.firebase.messaging.onBackgroundMessage(function (payload) {
        console.log("New background FCM message: ", payload);
      });
      window.cordova.plugins.firebase.messaging.onMessage((payload) => {
        console.log("New FCM message: ", payload);
        handleNotification(payload)
      });
      dispatch(setFcmData(fcmToken))
    }
    catch (err) {
      console.log(err)
    }
  }

  const getToken = () => {
    if (window.cordova.plugins.notification) {
      window.cordova.plugins.notification.local.requestPermission(function (granted) {
        if (granted)
          window.cordova.plugins.firebase.messaging.getToken().then(onTokenReceived)
        else {
          console.log("Permission not granted to send notifications");
        }
      });
    } else {
      console.log("Notification plugin is not available");
    }
  }


  useEffect(() => {
    getToken()
  }, [])



  if (patchProfileRes.isLoading) return <PageLoading />
  if (patchProfileRes.isError) return <ApiErrorModal res={patchProfileRes} />

  return (
    <FcmHandler title={title} body={body} subject={subject} subjectId={subjectId} event={event} messageId={messageId} />
  )

}

export default ForegroundCordovaFcm
