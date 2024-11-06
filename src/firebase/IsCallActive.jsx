
import { useGetCallsQuery, usePatchCallMutation } from '../services/callSlice'
import PageLoading from '../components/PageLoading'
import ApiErrorModal from '../components/modal/ApiErrorModal'
import Button from '../components/form/Button'
import { useNavigate } from 'react-router-dom';

const IsCallActive = () => {

    const navigate = useNavigate()
    const callsRes = useGetCallsQuery()
    const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation();

    if (callsRes.isLoading) return <PageLoading />
    if (callsRes.isError) return <ApiErrorModal res={callsRes} />

    const calls = callsRes.data
    const activeCall = calls.find(i => i.status === "Active")

    const handleActiveCall = async () => {
        if (activeCall.type === "AudioCall")
            navigate(`/Call/${activeCall.id}/active/audio`)
        else
            navigate(`/Call/${activeCall.id}/active/video`)
    }

    const handleRejectCall = async () => {
        const res = await patchCallStatus({ id: activeCall.id, status: "Completed" })
        if (res.data) callsRes.refetch()
    }

    if (activeCall)
        return (

            <div className='d-flex w-100 bg-white text-dark align-items-center p-3 p-lg-3 border-bottom rounded-bottom-3 shadow-sm'>
                <p className='flex-grow-1'>Your call is active with <b>{activeCall.astro.name}</b> </p>

                <div className='d-flex'>
                    <Button className={"btn-sm me-2"} onClick={handleActiveCall} color={"success"} >Go Back</Button>
                    <Button res={patchCallStatusRes} className={"btn-sm me-2"} onClick={handleRejectCall} color={"danger"}>End Call</Button>

                </div>
            </div>
        )

    else {
        <></>
    }
}

export default IsCallActive