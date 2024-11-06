import CreatePostModal from '../../components/modal/CreatePostModal'
import Api from '../../constants/Api'
import { useGetPostsQuery } from '../../services/postSlice'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'
import Page from '../../layout/Page'

const Posts = () => {

  const postRes = useGetPostsQuery()


  if (postRes.isLoading) return <PageLoading />
  if (postRes.isError) return <ApiErrorModal res={postRes} />

  const posts = postRes.data

  return (
    <Page  >
      <div className='d-flex p-3 justify-content-between mx-4'>
        <h2>Posts</h2>
        <CreatePostModal refetch={postRes.refetch()} />
      </div>
      <div className="row row-cols-3 g-3 p-4">
        {
          posts?.map((post) =>
            <div className="col card-group " key={post.id}>
              <div className="card  overflow-hidden ">
                {
                  post.upload &&
                  <img src={Api.RISHIVAR_BACKEND_URL + post?.upload?.src} className=" object-fit-cover w-100" alt="..." />

                }
                <div className="card-body ">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">{post.text}</p>
                  <p className="card-text  bg-warning text-center rounded-pill">{post.status}</p>
                </div>
              </div>
            </div>
          )
        }

      </div>
    </Page>
  )
}

export default Posts