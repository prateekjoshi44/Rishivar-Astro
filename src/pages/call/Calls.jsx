import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import { useGetCallsQuery } from '../../services/callSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import PageLoading from '../../components/PageLoading';
import ReactTable from '../../components/ReactTable';


const Calls = () => {

  const callRes = useGetCallsQuery()

  if (callRes.isLoading) return <PageLoading />
  if (callRes.isError) return <ApiErrorModal res={callRes} />

  const columns = [
    { Header: '#', accessor: 'id', Cell: ({ value }) => <Link to={`./${value}`} className='link-success'>{value}</Link> },
    { Header: 'Started At', accessor: 'startedAt' },
    { Header: 'Ended At', accessor: 'endedAt' },
    { Header: 'User', accessor: 'userId' },
    { Header: 'Astro', accessor: 'astroId' },
    { Header: 'Status', accessor: 'status' },
  ]
  return (
    <Page>
      <ReactTable columns={columns} data={callRes.data} />
    </Page>
  )
}

export default Calls