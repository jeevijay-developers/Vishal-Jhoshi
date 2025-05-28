import React, { useEffect, useRef, useState } from "react";
import MessageContainer from "./MessageContainer";
import { IoChevronBackCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getChats } from "@/server/chats";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { Message } from "@/Types/Message";
import { updateMessageSentByLoggedInUser } from "./messageHelper";
type Props = {
  selectedUser: User;
  handleGoBack: () => void;
  isSmallDevice: boolean;
  showIcon: boolean;
};

interface User {
  _id: string;
  name: string;
  email: string;
  image_url: string;
}
const NewChatMessageBox: React.FC<Props> = ({
  selectedUser,
  handleGoBack,
  isSmallDevice,
  showIcon,
}) => {
  const socket = useSelector(selectSocket);
  const CURRENT_USER = useSelector((state: any) => state.user);
  const SELECTED_USER = useSelector((state: any) => state.chat.selectedUser);
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (!selectedUser?._id || !CURRENT_USER?._id) {
      return;
    }
    console.log("fetching chats");

    getChats(CURRENT_USER._id, selectedUser._id)
      .then((data) => {
        console.log(data);

        setMessages(data);
      })
      .catch((err) => console.log(err));

    return () => {
      // console.log("deleting messages");
      setMessages([]);
      const elm = document.getElementsByClassName("hvt");
      while (elm.length > 0) {
        elm[0].remove(); // removes the first element until none are left
      }
    };
  }, [SELECTED_USER]);

  const messageRef = useRef(null);

  const sendMessage = () => {
    const message = messageRef.current?.value;
    if (message === "") return;

    // create message object
    const MESSAGE = {
      sender: CURRENT_USER._id,
      recipient: selectedUser._id,
      message,
    };
    try {
      updateMessageSentByLoggedInUser(MESSAGE, CURRENT_USER);
    } catch (err) {
      console.log(err);
    }

    // send message to the recipient id socket
    if (socket) {
      socket.emit("receiveMessage", { roomId: selectedUser._id, MESSAGE });
      //append the new message to the message container
    }
  };

  return (
    <main className="">
      <div className="d-flex flex-row justify-content-start position-relative  py-2 bg-primary gap-3">
        <div className="w-fit">
          <img
            width={35}
            height={35}
            className="rounded-circle ms-3"
            src={`${selectedUser?.image_url}`}
            style={{
              border: "1px solid white",
            }}
            alt=""
            onError={(err: React.SyntheticEvent<HTMLImageElement, Event>) => {
              err.currentTarget.src = "https://placehold.co/600x400";
            }}
          />
        </div>
        <div className=" d-flex flex-row gap-2">
          <p className="p-0 m-0 fw-semibold">{selectedUser?.name ?? "User"}</p>

          <span></span>
        </div>
        {isSmallDevice && showIcon && (
          <IoChevronBackCircle
            className="position-absolute"
            style={{ right: "10px" }}
            fontSize={"x-large"}
            onClick={handleGoBack}
          />
        )}
      </div>
      {/* message container */}
      <MessageContainer setMessages={setMessages} messages={messages} />
      {/* send message   */}
      <div className="py-2 bg-white">
        <div className="d-flex flex-row gap-3">
          <input ref={messageRef} type="text" className="w-75" />
          <button onClick={sendMessage} className="btn btn-success">
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewChatMessageBox;
