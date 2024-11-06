import { useEffect } from 'react';
import PageLoading from '../../components/PageLoading';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import { useGetChatQuery, usePatchChatMutation } from '../../services/chatSlice';
import Button from '../../components/form/Button';
import { useNavigate } from 'react-router';
import soundFile from '../../assets/audio/sound.wav'

const ChatIncomingModal = ({ id }) => {

  const navigate = useNavigate()

  const name = "ChatIncomingModal";
  const btnId = name + "Button";

  const response = useGetChatQuery(id);
  const [patchChatStatus, patchChatStatusRes] = usePatchChatMutation();


  const handleActiveChat = async () => {
    await patchChatStatus({ id, status: "Accepted" })
    await response.refetch()
    navigate(`/Chat/${id}/active`)
  }

  const playSound = () => {
    try {
      let sound = new Audio(soundFile);
      sound.play();
    }
    catch (error) { console.log(error) }
  }


  useEffect(() => {
    if (response.isSuccess) {
      document.getElementById(btnId).click()
      playSound()
    }
  }, [response.isSuccess])

  if (response.isLoading) return <PageLoading />;
  if (response.isError) return <ApiErrorModal res={response} />;


  const chat = response.data

  return (
    <div>
      <button type="button" className="d-none" id={btnId} data-bs-toggle="modal" data-bs-target={"#" + name}>
        Launch demo modal
      </button>

      <div className="modal fade" id={name} tabIndex="-1" aria-labelledby={name + "Label"} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-danger" id={name + "Label"}>{"Incoming Chat..."}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Incoming chat from {chat.astro.name}</p>
            </div>
            <div className="modal-footer">
              <>
                <Button res={patchChatStatusRes} data-bs-dismiss="modal" onClick={handleActiveChat} color={"success"} >Accept</Button>

                <Button res={patchChatStatusRes} data-bs-dismiss="modal" onClick={() => patchChatStatus({ id, status: "AstroRejected" })} color={"danger"}>Reject</Button>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatIncomingModal;
