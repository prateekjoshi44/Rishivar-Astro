import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import { useGetChatsQuery } from '../../services/chatSlice';
import PageLoading from '../../components/PageLoading';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import ReactTable from '../../components/ReactTable';


const Chats = () => {

  const chatRes = useGetChatsQuery()




  if (chatRes.isLoading) return <PageLoading />
  if (chatRes.isError) return <ApiErrorModal res={chatRes} />

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
      <ReactTable columns={columns} data={chatRes.data} />

    </Page>
  )
}

export default Chats