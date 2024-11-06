import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { messaging, vapidKey } from "./firebase";
import { useGetProfileQuery, usePatchProfileMutation } from "../services/profileSlice";
import { useDispatch } from "react-redux";
import { setFcmData } from "../redux/authSlice";
import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import FcmHandler from "./FcmHandler";


const ForegroundFcm = () => {

  const dispatch = useDispatch()
  const [patchProfile, patchProfileRes] = usePatchProfileMutation()
  const profileRes = useGetProfileQuery()
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const [subject, setSubject] = useState(null)
  const [event, setEvent] = useState(null)
  const [subjectId, setSubjectId] = useState(null)
  const [messageId, setMessageId] = useState(null)

  const handleNotification = (payload) => {
    const data = payload?.data
    setTitle(data.title)
    setBody(data.body)
    setSubject(data.subject)
    setEvent(data.event)
    setSubjectId(data.subjectId)
    setMessageId(payload.messageId)
  }

  const onTokenReceived = async (fcmToken) => {
    try {
      if (profileRes.data.fcmToken != fcmToken) await patchProfile({ fcmToken })
      onMessage(messaging, handleNotification)
      dispatch(setFcmData(fcmToken))
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if (profileRes.data)
      getToken(messaging, { vapidKey }).then(onTokenReceived).catch(console.error("error mil gayi"))
  }, [profileRes])

  if (profileRes.isLoading) return <PageLoading />
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />


  if (patchProfileRes.isLoading) return <PageLoading />
  if (patchProfileRes.isError) return <ApiErrorModal res={patchProfileRes} />

  return (
    <FcmHandler title={title} body={body} subject={subject} subjectId={subjectId} event={event} messageId={messageId} />
  )

}

export default ForegroundFcm
