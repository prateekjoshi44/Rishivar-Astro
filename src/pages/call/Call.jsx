import { useEffect, useState } from 'react'
import { useGetCallQuery, usePatchCallMutation } from '../../services/callSlice'
import { useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import PageLoading from '../../components/PageLoading'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import ObjectRenderer from '../../components/ObjectRenderer'

const Call = () => {
  const { id } = useParams()

  const response = useGetCallQuery(id)

  const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation()

  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (status) {
      const body = { id, status }
      patchCallStatus(body)
        .then((res) => {
          if (res.error) {
            console.log("Status Error: ", res.error);
          }
          response.refetch()
        });
    }
  }, [status])

  if (response.isLoading || patchCallStatusRes.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />

  if (patchCallStatusRes.isError) return <ApiErrorModal res={patchCallStatusRes} />





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
          <option value="Completed">End Call</option>
        </select>
      }


    </Page>
  )
}

export default Call