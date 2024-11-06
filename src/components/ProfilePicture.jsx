
import Spinner from './Spinner'
import Api from '../constants/Api'

const ProfilePicture = ({ name, picture, size, imgClass }) => {

  const imgClassName = `rounded-circle ${imgClass}`
  let className = "rounded-circle bg-primary d-flex justify-content-center align-items-center text-capitalize "
  if (size === 50) className += "px-4"
  else if (size === 30) className += "px-2"



  if (!name) return <Spinner size={size} color={"primary"} grow />
  if (picture) {
    let src = picture
    if (!src.includes("http")) src = Api.RISHIVAR_BACKEND_URL + src
    return <img src={src} alt="mdo" width={size} height={size} className={imgClassName} />
  }
  else return <div style={{ height: size, width: size, fontSize: size / 2 }} className={className} >
    {name.substring(0, 1)}
  </div>
}

export default ProfilePicture