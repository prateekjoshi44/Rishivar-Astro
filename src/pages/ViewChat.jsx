import { ImAttachment } from "react-icons/im";
import { usePostMessageMutation } from "../services/chatSlice";
import { usePostUploadMutation } from "../services/uploadSlice";
import { MdOutlineFileDownload } from "react-icons/md";
import ProfilePicture from "../components/ProfilePicture";
import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import Input from "../components/form/Input";
import AttachModal from "../components/modal/AttachModal";
import { VscSend } from "react-icons/vsc";
import Button from "../components/form/Button";
import { useParams } from "react-router";
import { useEffect } from "react";
import { formatDate } from "../utils/date";

const ViewChat = ({ chatRes, refetch }) => {
  const { id } = useParams();
  const [postChat, postChatRes] = usePostMessageMutation();
  // const chatRes = useGetChatQuery(id, { pollingInterval: 2000 })
  const [postUpload, postUploadRes] = usePostUploadMutation();

  const className = "d-flex align-items-center mb-3 ";

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;

      if (form.checkValidity()) {
        let uploadRes;
        let body = {};
        if (form["upload"].files.length > 0) {
          const uploadBody = new FormData();
          uploadBody.append("upload", form["upload"].files[0]);
          uploadRes = await postUpload(uploadBody);
          if (uploadRes.error) return;
          body.uploadId = uploadRes.data.id;
        }

        body.message = form["message"].value;
        body.chatId = id;

        const res = await postChat(body);
        if (!res.error) {
          form.reset();
          chatRes.refetch();
        }
      } else form.classList.add("was-validated");
    } catch (error) {
      console.error(error);
    }
  };

  const renderUpload = ({ name }) => (
    <div className="mt-3 p-2 bg-white border rounded-3 shadow-sm text-primary d-flex align-items-center">
      <ImAttachment className="me-2" />
      {name}
      <MdOutlineFileDownload
        className="text-dark border ms-auto fs-4"

      />
    </div>
  );

  const renderChat = ({
    id: chatId,
    message,
    user,
    astro,
    createdAt,
    upload,
  }) =>
    astro ? (
      <div className="container" key={chatId}>
        <div className="row justify-content-end">
          <div className="col-11 col-lg-6">
            <div className={className}>
              <div className="bg-warning bg-opacity-25 w-100 rounded-3 p-2 p-lg-3 me-1 me-lg-3 d-flex justify-content-between">
                <div className="">
                  {message}
                  {upload && renderUpload(upload)}
                  <div style={{ fontSize: "13px" }}>
                    {astro.name} - {formatDate(createdAt)}
                  </div>
                </div>
              </div>
              <ProfilePicture
                name={astro?.name}
                picture={astro?.picture}
                size={30}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container" key={chatId}>
        <div className="row">
          <div className="col-11 col-lg-6">
            <div className={className}>
              {/* <ProfilePicture name={astro?.email} size={30} /> */}
              <div className="bg-info w-100 rounded-3 p-2 p-lg-3 ms-1 ms-lg-3  d-flex justify-content-start">
                <div className="w-100">
                  {message}
                  {/* {uploads.length > 0 && renderUpload(uploads[0])} */}
                  <div className="text-start" style={{ fontSize: "13px" }}>
                    {user.name} - {formatDate(createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  useEffect(() => {
    if (chatRes.data) {
      const div = document.getElementById("chatsDiv");
      div.scrollTop = div.scrollHeight;
    }
  }, [chatRes?.data?.chats]);

  useEffect(() => {
    if (chatRes.data) {
      const form = document.getElementById("chatForm");
      form.reset();
    }
  }, [id]);

  if (chatRes.isLoading) return <PageLoading />;
  if (chatRes.isError) return <ApiErrorModal res={chatRes} />;


  if (postUploadRes.isLoading) return <PageLoading />;
  if (postUploadRes.isError) return <ApiErrorModal res={postUploadRes} />;

  const chat = chatRes?.data;

  return (
    <>
      {postChatRes.isError && <ApiErrorModal res={postChatRes} />}

      <div className="flex-grow-1 overflow-hidden">
        <div
          id="chatsDiv"
          className="px-3 px-lg-5 py-3 d-flex flex-column overflow-y-auto h-100"
        >
          {chat.chatItems?.map(renderChat)}
          {/* {renderChat(chat.id, chat.chatItems, chat.astro, chat.user, chat.uploads, chat.createdAt)} */}
        </div>
      </div>

      <form
        id="chatForm"
        onSubmit={onSubmit}
        className="px-2 p-x-lg-5 py-3 shadow bg-  border border-3 d-flex g-3 align-items-center"
        noValidate
      >
        <div className="flex-grow-1">
          <Input
            textArea
            containerClass={"shadow-sm rounded-pill w-100"}
            name={"message"}
            noLabel
            required
          />
        </div>

        <AttachModal name={"upload"} />

        <Button
          className="d-none d-lg-block btn-primary px-0 shadow-sm rounded-pill ms-3"
          loadingLabel="Posting"
          res={postChatRes}
          refetch={refetch}
        >
          Post
          <VscSend className="ms-2" />
        </Button>

        <div
          className="ms-2"
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            width: 35,
            height: 35,
          }}
        >
          <Button
            className="d-lg-none flex-center p-0 btn-primary shadow-sm rounded-circle "
            noLabel
            res={postChatRes}
            // refetch={chatRes.refetch}
            style={{ borderRadius: "50%", width: 35, height: 35 }}
          >
            <VscSend className="" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default ViewChat;
