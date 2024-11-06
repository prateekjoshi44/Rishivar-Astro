import { useEffect, useState } from 'react'
import Icons from '../../components/ui/Icons';
import { getToken } from 'firebase/messaging';
import { useGetProfileQuery, usePatchProfileMutation } from '../../services/profileSlice';
import { messaging, vapidKey } from '../firebase';

const NotificationPermission = ({ children }) => {

  const [patchProfile] = usePatchProfileMutation()
  const profileRes = useGetProfileQuery()
  const [isAllowed, setIsAllowed] = useState(false);

  const onTokenReceived = async (fcmToken) => {
    try {
      if (profileRes.data.fcmToken != fcmToken) await patchProfile({ fcmToken })
      setIsAllowed(true)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (profileRes.data)
      getToken(messaging, { vapidKey }).then(onTokenReceived).catch(console.error)
  }, [profileRes])


  if (!isAllowed) {
    return (
      <div className="d-flex justify-content-between p-3 text-white bg-warning bg-gradient rounded-4 shadow-sm my-2">
        <div>
          <h3>Notifications</h3>
          <p>Kindly Give the Notification Permission before proceeding.</p>
          {/* <button
            className="btn bg-white btn-hover-warning fw-bold shadow-sm"
            type="button"
            onClick={openNotificationSettings}
          >
            Allow Now
          </button> */}
        </div>
        <div className="d-flex align-items-center">
          {Icons.notificationAlert("text-white shadow", {
            width: 100,
            height: 100,
            transform: "rotate(45deg)",
          })}
        </div>
      </div>
    );
  }

  else {
    return (
      <div className='my-3 text-center'>
        {children}
      </div>

    )
  }
}

export default NotificationPermission