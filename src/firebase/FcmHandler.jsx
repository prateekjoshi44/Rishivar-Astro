import { useEffect } from "react";
import { Toast as bootstrapToast } from 'bootstrap'
import ChatIncomingModal from "./fcm/ChatIncomingModal";
import ChatRefetch from "./fcm/ChatRefetch";
import CallIncomingModal from "./fcm/CallIncomingModal";
import CallRefetch from "./fcm/CallRefetch";


const FcmHandler = ({ title, body, subject, event, subjectId, messageId }) => {

  let toastBootstrap

  const handleNotification = () => {
    switch (subject + event) {
      case "ChatItem" + "Created":
      case "Chat" + "Requested":
      case "Call" + "Requested":
      case "Chat" + "Rejected":
      case "Call" + "Rejected":
      case "Chat" + "Active":
      case "Call" + "Active":
      case "Call" + "Completed":
      case "Chat" + "Completed":
        break

      default: toastBootstrap.show()
    }
  }

  useEffect(() => {
    const toastLiveExample = document.getElementById('fcmToast')
    toastBootstrap = bootstrapToast.getOrCreateInstance(toastLiveExample)
    handleNotification()
  }, [])

  useEffect(() => {
    handleNotification()
  }, [title, body, subject, event, subjectId, messageId])


  return (
    <>

      {subject === "Chat" && event === "Requested" && <ChatIncomingModal id={subjectId} />}
      {subject === "Call" && event === "Requested" && <CallIncomingModal id={subjectId} />}

      {subject === "Chat" && event === "Rejected" && <ChatRefetch id={subjectId} />}
      {subject === "Call" && event === "Rejected" && <CallRefetch id={subjectId} />}

      {subject === "Chat" && event === "Active" && <ChatRefetch id={subjectId} />}
      {subject === "Call" && event === "Active" && <CallRefetch id={subjectId} />}

      {subject === "Chat" && event === "Completed" && <ChatRefetch id={subjectId} />}
      {subject === "Call" && event === "Completed" && <CallRefetch id={subjectId} />}

      {subject === "ChatItem" && event === "Created" && <ChatRefetch id={subjectId} messageId={messageId} />}



      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="fcmToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">{title}</strong>
            <small>Just Now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">{body}</div>
        </div>
      </div>
    </>
  )

}

export default FcmHandler