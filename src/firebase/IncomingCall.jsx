
import { useGetCallsQuery, usePatchCallMutation } from '../services/callSlice'
import PageLoading from '../components/PageLoading'
import ApiErrorModal from '../components/modal/ApiErrorModal'
import { MdCall } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import Button from '../components/form/Button'
import { useNavigate } from 'react-router-dom';

const IncomingCall = () => {

    const navigate = useNavigate()
    const callsRes = useGetCallsQuery(undefined, { pollingInterval: 3000 })
    const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation();


    const handleActiveCall = async (id) => {
        try {
            await patchCallStatus({ id, status: "Accepted" })
            if (requestedCall.type === "AudioCall") navigate(`/Call/${requestedCall.id}/active/audio`)
            else navigate(`/Call/${requestedCall.id}/active/video`)

        } catch (error) {
            console.log(error)
        }

    }

    const handleRejectCall = async (id) => {
        try {
            patchCallStatus({ id, status: "AstroRejected" })
            await callsRes.refetch()
        } catch (error) {
            console.log(error)
        }

    }

    if (callsRes.isLoading) return <PageLoading />
    if (callsRes.isError) return <ApiErrorModal res={callsRes} />

    const calls = callsRes.data
    const requestedCall = calls.find(i => i.status === "Requested")


    if (requestedCall)
        return (

            <div className='d-flex w-100 bg-white text-dark align-items-center p-3 p-lg-3 border-bottom rounded-bottom-3 shadow-sm'>
                <p className='flex-grow-1'>{requestedCall.user.name} has Requested for a {requestedCall.type}</p>

                <div className='d-flex'>
                    <Button res={patchCallStatusRes} className={"rounded-circle btn-lg"} onClick={() => handleActiveCall(requestedCall.id)} color={"success"} ><MdCall /></Button>
                    <Button res={patchCallStatusRes} className={"ms-2 rounded-circle btn-lg"} onClick={() => handleRejectCall(requestedCall.id)} color={"danger"}><MdCallEnd /></Button>

                </div>
            </div>
        )

    else {
        <></>
    }
}

export default IncomingCall