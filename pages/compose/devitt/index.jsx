import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";

import { addDevitt, uploadImage } from "../../../firebase/client";

const FORM_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  LOADING: 2,
  COMPLETE: 3,
};

const ComposeDevittPage = () => {
  const user = useUser();
  const [status, setStatus] = useState(FORM_STATES.USER_NOT_KNOWN);
  const [message, setMessage] = useState("");
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const onProgress = () => {};
    const onError = () => {};
    const onComplete = () => {
      task.snapshot.ref.getDownloadURL().then((imgUrl) => setImgURL(imgUrl));
    };
    if (task) {
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(FORM_STATES.LOADING);
    addDevitt({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(FORM_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    const newTask = uploadImage(file);
    setTask(newTask);
  };

  const isButtonDisabled =
    message.length === 0 || status === FORM_STATES.LOADING;

  return (
    <>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar alt={user.userName} src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
            value={message}
          />
          {imgURL && (
            <section className="remove-img">
              <button type="button" onClick={() => setImgURL(null)}>
                X
              </button>
              <img alt="" src={imgURL} />
            </section>
          )}
          <div>
            <Button submit disabled={isButtonDisabled}>
              Devittear
            </Button>
          </div>
        </form>
      </section>

      <style jsx>
        {`
          .form-container {
            align-items: flex-start;
            display: flex;
          }

          .avatar-container {
            padding: 20px 0 0 10px;
          }

          div {
            padding: 16px;
          }

          button {
            background: rgba(0, 0, 0, 0.3);
            border: 0;
            border-radius: 999px;
            color: #fff;
            cursor: pointer;
            font-size: 24px;
            width: 32px;
            height: 32px;
            top: 16px;
            position: absolute;
            right: 16px;
          }

          .remove-img {
            position: relative;
          }

          img {
            border-radius: 10px;
            height: auto;
            width: 100%;
          }

          form {
            padding: 10px;
          }

          textarea {
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid transparent"};
            border-radius: 10px;
            font-size: 21px;
            outline: none;
            padding: 16px;
            resize: none;
            min-height: 200px;
            font-size: 21px;
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default ComposeDevittPage;
