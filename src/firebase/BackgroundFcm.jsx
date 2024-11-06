
import { useParams } from "react-router-dom"
import FcmHandler from "./FcmHandler";

const BackgroundFcm = () => {

    const { subject, subjectId, event } = useParams()
    const title = 'Title'
    const body = 'body'




    return (
        <FcmHandler title={title} body={body} subject={subject} subjectId={subjectId} event={event} messageId={new Date() + ""} />
    )
}

export default BackgroundFcm