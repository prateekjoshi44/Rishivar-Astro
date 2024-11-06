
import { useGetOrderQuery } from '../../services/orderSlice'
import { useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import ObjectRenderer from '../../components/ObjectRenderer'

const Order = () => {
  const { id } = useParams()

  const response = useGetOrderQuery(id)

  if (response.isLoading) return "Loading..."
  if (response.isError) return <ApiErrorModal res={response} />



  return (
    <Page>
      <div className='row row-cols-1'>
        <div className='cols'>

          <ObjectRenderer obj={response.data} />

        </div>
      </div>


    </Page>
  )
}

export default Order