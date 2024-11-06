import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import { useGetOrdersQuery } from '../../services/orderSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import PageLoading from '../../components/PageLoading';
import ReactTable from '../../components/ReactTable';


const Orders = () => {

  const orderRes = useGetOrdersQuery()



  if (orderRes.isLoading) return <PageLoading />
  if (orderRes.isError) return <ApiErrorModal res={orderRes} />

  const columns = [
    { Header: '#', accessor: 'id', Cell: ({ value }) => <Link to={`./${value}`} className='link-success'>{value}</Link> },
    { Header: 'Rate', accessor: 'rate' },
    { Header: 'Duration', accessor: 'duration' },
    { Header: 'Amount', accessor: 'amount' },
  ]
  return (
    <Page>
      <ReactTable columns={columns} data={orderRes.data} />
    </Page>
  )
}

export default Orders