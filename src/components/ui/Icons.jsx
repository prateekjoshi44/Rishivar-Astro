import { MdNotificationsActive } from "react-icons/md";
import { RiInstallFill } from "react-icons/ri";

const Icons = {
  notificationAlert: (className, style) => (
    <MdNotificationsActive className={className} style={style} />
  ),
  installAlert: (className, style) => (
    <RiInstallFill className={className} style={style} />
  ),
}

export default Icons