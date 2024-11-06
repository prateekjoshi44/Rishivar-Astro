import { useEffect } from "react";
import { useGetChatQuery, usePatchChatMutation } from "../services/chatSlice";
import Button from "../components/form/Button";
import PageLoading from "../components/PageLoading";
import { useNavigate, useParams } from "react-router";
import Timer from "../components/Timer";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import ReactCountdownClock from "react-countdown-clock";
import ViewChat from "./ViewChat";
import "../assets/css/timer.css";

const ActiveChatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const chatRes = useGetChatQuery(id);
  const [patchChatStatus, patchChatStatusRes] = usePatchChatMutation();

  const handleChat = async (status) => {
    const res = await patchChatStatus({ id, status });
    if (res.data) navigate("/");
  };

  const handleTimerComplete = async () => {
    const res = await patchChatStatus({ id, status: "AstroRejected" });
    if (res.data) navigate("/");
  };


  useEffect(() => {
    chatRes.refetch()
  }, [])


  if (chatRes.isLoading) return <PageLoading />;
  if (chatRes.isError) return <ApiErrorModal res={chatRes} />;
  const chat = chatRes.data;

  if (chat.status === "Completed" || chat.status === "UserRejected") {
    navigate("/");
    return <></>;
  }

  return (
    <>
      {patchChatStatusRes.isError && <ApiErrorModal res={patchChatStatusRes} />}

      {/* <div>Active Chat page</div> */}
      {chat.status === "Accepted" && (
        <div className="h-100 d-flex justify-content-center flex-column align-items-center ">
          <h2>Waiting for {chat?.user.name}...</h2>
          <ReactCountdownClock
            seconds={60}
            color="#000"
            alpha={0.9}
            size={300}
            onComplete={handleTimerComplete}
          />
        </div>
      )}

      {chat.status === "Active" && (
        <div className="h-100  overflow-hidden d-flex flex-column ">
          <div className=" border-bottom  d-flex justify-content-between align-items-center px-4 py-2">
            <Timer endTime={chat.timeout} />

            <div className="end-chat">
              <Button
                type="button"
                res={patchChatStatusRes}
                data-bs-dismiss="modal"
                onClick={() => handleChat("Completed")}
                color={"success"}
              >
                End Chat
              </Button>
            </div>
          </div>

          <ViewChat chatRes={chatRes} refetch={chatRes.refetch} />
        </div>
      )}
    </>
  );
};

export default ActiveChatPage;
