import { Message } from "@/Types/Message";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const MessageContainer = ({ messages, setMessages }: Props) => {
  const USER = useSelector((state: any) => state.user);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const messageUlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageUlRef.current) {
      messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
    }
    return () => {};
  }, [messages]);

  return (
    <div
      style={{
        backgroundImage: "url(/assets/svg/diamond-sunset.svg)",
        backgroundSize: "cover",
        height: "90dvh",
        overflowY: "auto",
        padding: "1rem",
      }}
      className="rounded shadow-sm"
      ref={messageUlRef}
    >
      <ul
        id="message-ul"
        className="d-flex flex-column gap-3 m-0 p-0 list-unstyled"
      >
        {messages?.map((message: any, idx: number) => {
          const isCurrentUser = message.sender._id === USER._id;

          return (
            <li
              key={idx}
              className={`d-flex flex-column ${
                isCurrentUser ? "align-self-end" : "align-self-start"
              } w-100`}
              style={{ maxWidth: "80%" }}
            >
              <div
                className={`d-flex ${
                  isCurrentUser
                    ? "flex-row-reverse align-self-end"
                    : "flex-row align-self-start"
                } align-items-end gap-2`}
              >
                {/* Profile Image */}
                <img
                  className="rounded-circle border"
                  height={30}
                  width={30}
                  src={
                    isCurrentUser
                      ? message.sender.image_url
                      : message.sender.image_url
                  }
                  alt="user"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/30x30";
                  }}
                />

                {/* Message Content */}
                <div>
                  <small
                    className={`d-block ${
                      isCurrentUser ? "text-end" : "text-start"
                    } text-muted`}
                  >
                    {isCurrentUser ? "You" : message.sender.name}
                  </small>

                  <div
                    className={`p-2 rounded-4 shadow-sm ${
                      isCurrentUser
                        ? "bg-white text-dark"
                        : "bg-primary text-white"
                    }`}
                    style={{
                      fontSize: "0.95rem",
                      minWidth: "50px",
                      wordBreak: "break-word",
                    }}
                  >
                    <div>{message.message}</div>
                    <div
                      className="text-end"
                      style={{ fontSize: "0.7rem", opacity: 0.7 }}
                    >
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessageContainer;
