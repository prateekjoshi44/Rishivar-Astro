import { useGetChatsQuery, usePatchChatMutation } from '../services/chatSlice';
import PageLoading from '../components/PageLoading';
import ApiErrorModal from '../components/modal/ApiErrorModal';
import { MdCall, MdCallEnd } from "react-icons/md";
import Button from '../components/form/Button';
import { useNavigate } from 'react-router-dom';

const IncomingChat = () => {
    const navigate = useNavigate();
    const chatsRes = useGetChatsQuery(undefined, { pollingInterval: 3000 });
    const [patchChatStatus, patchChatStatusRes] = usePatchChatMutation();

    // Handle loading and error states
    if (chatsRes.isLoading) return <PageLoading />;
    if (chatsRes.isError) return <ApiErrorModal res={chatsRes} />;

    const chats = chatsRes.data;
    const requestedChat = chats.find(i => i.status === "Requested");

    const handleActiveChat = async () => {
        const res = await patchChatStatus({ id: requestedChat.id, status: "Accepted" });
        if (res.data) {
            // Navigate only after the status update is successful
            navigate(`/Chat/${requestedChat.id}/active`);
        }
    };

    const handleRejectChat = async () => {
        await patchChatStatus({ id: requestedChat.id, status: "AstroRejected" });
        await chatsRes.refetch(); // Refetch chats after rejecting
    };

    if (requestedChat) {
        return (
            <div className='d-flex w-100 bg-white text-dark align-items-center p-3 p-lg-3 border-bottom rounded-bottom-3 shadow-sm'>
                <p className='flex-grow-1'>{requestedChat.user.name} has Requested for a chat</p>
                <div className='d-flex'>
                    <Button
                        res={patchChatStatusRes}
                        className={"rounded-circle btn-lg"}
                        onClick={handleActiveChat}
                        color={"success"}
                    >
                        <MdCall />
                    </Button>
                    <Button
                        res={patchChatStatusRes}
                        className={"ms-2 rounded-circle btn-lg"}
                        onClick={handleRejectChat}
                        color={"danger"}
                    >
                        <MdCallEnd />
                    </Button>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default IncomingChat;
