import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RedirectToRoot = () => {
  const navigate = useNavigate()

  useEffect(() => { navigate("/") }, [])

  return (
    <div>It will never Display.</div>
  )
}

export default RedirectToRoot