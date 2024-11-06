
import { useGetChatsQuery, usePatchChatMutation } from '../services/chatSlice'
import PageLoading from '../components/PageLoading'
import ApiErrorModal from '../components/modal/ApiErrorModal'
import Button from '../components/form/Button'
import { useNavigate } from 'react-router-dom';

const IsChatActive = () => {

    const navigate = useNavigate()
    const chatsRes = useGetChatsQuery()
    const [patchChatStatus, patchChatStatusRes] = usePatchChatMutation();

    if (chatsRes.isLoading) return <PageLoading />
    if (chatsRes.isError) return <ApiErrorModal res={chatsRes} />

    const chats = chatsRes.data
    const activeChat = chats.find(i => i.status === "Active")

    const handleActiveChat = async () => {
        navigate(`/Chat/${activeChat.id}/active`)
    }

    const handleRejectChat = async () => {
        const res = await patchChatStatus({ id: activeChat.id, status: "Completed" })
        if (res.data) chatsRes.refetch()
    }

    if (activeChat)
        return (

            <div className='d-flex w-100 bg-white text-dark align-items-center p-3 p-lg-3 border-bottom rounded-bottom-3 shadow-sm'>
                <p className='flex-grow-1'>Your chat is active with <b>{activeChat.astro.name}</b> </p>

                <div className='d-flex'>
                    <Button className={"btn-sm me-2"} onClick={handleActiveChat} color={"success"} >Go Back</Button>
                    <Button res={patchChatStatusRes} className={"btn-sm me-2"} onClick={handleRejectChat} color={"danger"}>End Chat</Button>
                </div>
            </div>
        )

    else {
        <></>
    }
}

export default IsChatActive