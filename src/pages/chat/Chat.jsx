import { useEffect, useState } from 'react'
import { useGetChatQuery, usePatchChatMutation } from '../../services/chatSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import PageLoading from '../../components/PageLoading'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import ObjectRenderer from '../../components/ObjectRenderer'

const Chat = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const response = useGetChatQuery(id)
  const [patchChatStatus, patchChatStatusRes] = usePatchChatMutation()
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (status) {
      const body = { id, status }
      patchChatStatus(body)
        .then((res) => {
          if (res.error) {
            console.log("Status Error: ", res.error);
          }
          response.refetch()
        });
    }
  }, [status])


  useEffect(() => {
    if (response.data?.status === "Active") {
      navigate(`/Chat/${id}/active`)

    }
  }, [response]);

  if (response.isLoading || patchChatStatusRes.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />

  if (patchChatStatusRes.isError) return <ApiErrorModal res={patchChatStatusRes} />





  return (
    <Page>
      <div className='row row-cols-1'>
        <div className='cols'>

          <ObjectRenderer obj={response.data} />

        </div>
      </div>




      {
        response.data.status === "Requested" &&

        <select className="form-select mt-5 shadow" style={{ width: 200 }} onChange={(e) => {
          setStatus(e.target.value)
        }} aria-label="Default select example">
          <option selected disabled>Change Status</option>
          <option value="AstroRejected">AstroRejected</option>
          <option value="Accepted">Accepted</option>
        </select>
      }

      {
        response.data.status === "Active" &&

        <select className="form-select mt-5 shadow" style={{ width: 200 }} onChange={(e) => {
          setStatus(e.target.value)
        }} aria-label="Default select example">
          <option selected disabled>Change Status</option>
          <option value="Completed">End Chat</option>
        </select>
      }


    </Page>
  )
}

export default Chat