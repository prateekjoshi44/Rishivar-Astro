import { useEffect } from 'react'
import { useGetChatQuery } from '../../services/chatSlice';

const ChatRefetch = ({ id, messageId }) => {

  const response = useGetChatQuery(id);

  useEffect(() => { response.refetch() }, [])
  useEffect(() => { response.refetch() }, [messageId])

  return (
    <></>
  )
}

export default ChatRefetch