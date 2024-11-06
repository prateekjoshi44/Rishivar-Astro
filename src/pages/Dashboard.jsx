import { Link } from "react-router-dom";
import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import Page from "../layout/Page";
import { useGetProfileQuery } from "../services/authSlice";
import { usePatchProfileMutation } from "../services/profileSlice";

const Dashboard = () => {
  const profileRes = useGetProfileQuery();

  const [patchProfile, patchProfileRes] = usePatchProfileMutation();

  const handleChatToggle = async (e) => {
    try {
      const res = await patchProfile({ chatAvailabilityStatus: e.target.checked ? "Online" : "Offline" })
      if (res.error) return
      profileRes.refetch()
    }
    catch (err) {
      console.log(err)
    }

  }
  const handleAudioCallToggle = async (e) => {
    try {
      const res = await patchProfile({ audioCallAvailabilityStatus: e.target.checked ? "Online" : "Offline" })
      if (res.error) return
      profileRes.refetch()
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleVideoCallToggle = async (e) => {
    try {
      const res = await patchProfile({ videoCallAvailabilityStatus: e.target.checked ? "Online" : "Offline" })
      if (res.error) return
      profileRes.refetch()
    }
    catch (err) {
      console.log(err)
    }
  }


  if (profileRes.isLoading) return <PageLoading />;
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />;

  const astro = profileRes.data;
  const { chatAvailabilityStatus, videoCallAvailabilityStatus, audioCallAvailabilityStatus } = astro




  return (
    <Page>
      {patchProfileRes.isError && <ApiErrorModal res={patchProfileRes} />}
      {/* <NotificationPermission /> */}
      {astro.status === "Created" && (
        <Link to={"Profile"} className="btn btn-primary">
          Please complete your profiling
        </Link>
      )}

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChat"
          name="chatAvaibility"
          checked={chatAvailabilityStatus === "Online"}
          onChange={handleChatToggle}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChat">
          Active for Chat
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckAudio" name="audioCallAvaibility"
          checked={audioCallAvailabilityStatus === "Online"}
          onChange={handleAudioCallToggle}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckAudio">
          Active for Audio Call
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckVideo"
          name="videoCallAvaibility"
          checked={videoCallAvailabilityStatus === "Online"}
          onChange={handleVideoCallToggle}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckVideo">
          Active for Video Call
        </label>
      </div>
    </Page>
  );
};

export default Dashboard;
