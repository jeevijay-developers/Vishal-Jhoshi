import React from "react";
import MessageContainer from "./MessageContainer";
import { IoChevronBackCircle } from "react-icons/io5";
type Props = {
  selectedUser: string;
  handleGoBack: () => void;
  isSmallDevice: boolean;
  showIcon: boolean;
};
const NewChatMessageBox: React.FC<Props> = ({
  selectedUser,
  handleGoBack,
  isSmallDevice,
  showIcon,
}) => {
  return (
    <main className="">
      <div className="d-flex flex-row justify-content-start position-relative  py-2 bg-primary gap-3">
        <div className="w-fit">
          <img
            width={35}
            height={35}
            className="rounded-circle ms-3"
            src={`https://randomuser.me/api/portraits/men/${100}.jpg`}
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
          <p className="p-0 m-0 fw-semibold">{selectedUser}</p>
          {" : "}
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
      <MessageContainer />
      {/* send message   */}
      <div className="py-2 bg-white">
        <div className="d-flex flex-row gap-3">
          <input type="text" className="w-75" />
          <button className="btn btn-success">Send</button>
        </div>
      </div>
    </main>
  );
};

export default NewChatMessageBox;
