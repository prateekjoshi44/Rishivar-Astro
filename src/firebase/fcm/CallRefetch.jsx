import { useEffect } from 'react'
import { useGetCallQuery } from '../../services/callSlice';

const CallRefetch = ({ id }) => {
  const response = useGetCallQuery(id);
  useEffect(() => { response.refetch() }, [])
  return (<></>)
}

export default CallRefetch