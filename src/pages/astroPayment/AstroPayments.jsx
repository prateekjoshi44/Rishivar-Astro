import ReactTable from '../../components/ReactTable';
import Page from '../../layout/Page';


const AstroPayments = () => {



  const paymentsList = [
    { id: 18, name: "Pritesh", dob: new Date(), description: "hello" },
    { id: 112, name: "A", dob: new Date(), description: "hello" },
    { id: 145, name: "B", dob: new Date(), description: "hello" },
    { id: 12, name: "D", dob: new Date(), description: "hello" },
    { id: 142, name: "Z", dob: new Date(), description: "hello" },
    { id: 197, name: "H", dob: new Date(), description: "hello" },

  ]

  const columns = [
    { Header: '#', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'DOB', accessor: 'dob' },
    { Header: 'Description', accessor: 'description' },

  ]
  return (
    <Page>
      <ReactTable columns={columns} data={paymentsList} />
    </Page>
  )

}

export default AstroPayments