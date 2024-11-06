import { useEffect, useRef, useState } from 'react'
import { ImAttachment } from 'react-icons/im';

const AttachModal = ({ name, labelClass, ...attributes }) => {

    const modalId = "attachModal"

    const [file, setFile] = useState(null)
    const fileInputRef = useRef(null);

    const btnClassName = " btn btn-outline-primary px-4 shadow-sm rounded-pill ms-3 " + (labelClass ? labelClass : "")
    const labelClassName = "d-lg-none flex-center p-0 btn btn-outline-primary shadow-sm rounded-circle ms-2 " + (labelClass ? labelClass : "")
    const labelClassNameLg = "d-none d-lg-block btn btn-outline-primary px-4 shadow-sm rounded-pill ms-3 " + (labelClass ? labelClass : "")


    const onChange = (e) => setFile(e.target.files[0])



    useEffect(() => {
        const inputElement = fileInputRef.current;
        const form = inputElement?.form;

        if (form) {
            const handleReset = () => setFile(null);
            form.addEventListener('reset', handleReset);

            // Cleanup the event listener
            return () => {
                form.removeEventListener('reset', handleReset);
            };
        }
    }, []);

    return (
        <>
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#" + modalId}>
                Launch demo modal
            </button> */}
            {/* <Button
                    className="d-lg-none flex-center p-0 btn-primary shadow-sm rounded-circle ms-3"
                    loadingLabel="Posting"
                    res={postChatRes}
                    refetch={ticketRes.refetch}
                    style={{ width: 35, height: 35 }}
                >
                    <VscSend className='' />
                </Button> */}
            {
                file ?
                    <button className={labelClassName} style={{ width: 35, height: 35 }} type="button" data-bs-toggle="modal" data-bs-target={"#" + modalId}>
                        <ImAttachment />
                    </button>
                    :
                    <button className={labelClassName} style={{ width: 35, height: 35 }} type="button" data-bs-toggle="modal" data-bs-target={"#" + modalId}>
                        <ImAttachment />
                    </button>
            }
            {
                file ?
                    <button className={labelClassNameLg} type="button" data-bs-toggle="modal" data-bs-target={"#" + modalId}>
                        <ImAttachment className='me-2' />
                        Change File
                    </button>
                    :
                    <button className={labelClassNameLg} type="button" data-bs-toggle="modal" data-bs-target={"#" + modalId}>
                        <ImAttachment className='me-2' />
                        Attach a File
                    </button>
            }


            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalId + "Label"} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={modalId + "Label"}>Attach File</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {
                                file &&
                                <div className='mt-3 p-2 bg-white border rounded-3 shadow-sm text-primary d-flex align-items-center'>
                                    <ImAttachment className='me-2' />
                                    {file.name}
                                    {/* <MdOutlineFileDownload className='text-dark border ms-auto fs-4' /> */}
                                </div>
                            }



                            <input
                                type={"file"}
                                className={"d-none"}
                                id={name}
                                name={name}
                                ref={fileInputRef}
                                onChange={onChange}
                                {...attributes}
                            />


                        </div>
                        <div className="modal-footer">
                            {
                                file ?
                                    <label htmlFor={name} className={btnClassName}>
                                        <ImAttachment className='me-2 ' />
                                        Change File
                                    </label>
                                    :
                                    <label htmlFor={name} className={btnClassName}>
                                        <ImAttachment className='me-2 ' />
                                        Attach a File
                                    </label>
                            }
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default AttachModal
