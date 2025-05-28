import { getAllChatRoomById } from "@/server/chats";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LiaStarOfLifeSolid } from "react-icons/lia";

interface User {
  _id: string;
  name: string;
  email: string;
  image_url: string;
  seenBy: string[];
}

type Props = {
  handleUserSelect: (user: User) => void;
  selectedUser: User;
};

const NewChatSidebar: React.FC<Props> = memo(
  ({ handleUserSelect, selectedUser }) => {
    const [users, setUsers] = useState<User[] | []>([]);
    const LOGGED_IN_USER = useSelector((state: any) => state.user);
    const UPDATE = useSelector((state: any) => state.chat.update);
    useEffect(() => {
      // fetch all the rooms
      console.log("fetching room");

      getAllChatRoomById(LOGGED_IN_USER._id)
        .then((data) => {
          console.log(data);

          setUsers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [LOGGED_IN_USER, UPDATE]);
    return (
      <div
        className=" overflow-auto"
        style={{
          height: "100vh",
        }}
      >
        <div
          className=" bg-body-tertiary h-100"
          tabIndex={-1}
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header"></div>
          <div className="offcanvas-body d-md-flex flex-column  overflow-y-auto">
            <ul className="nav flex-column">
              {users &&
                users.length > 0 &&
                users.map((users: User) => {
                  return (
                    <li
                      className={`nav-item d-flex flex-row  gap-2 py-3 ms-1 ${
                        selectedUser?.name === users?.name ? "bg-primary" : ""
                      }  cursor-pointer ps-2`}
                      onClick={() => handleUserSelect(users)}
                      style={{
                        borderBottom: "1px solid lightgray",
                      }}
                      key={users._id}
                    >
                      <div>
                        <img
                          width={35}
                          height={35}
                          className="rounded-circle"
                          src={`${users.image_url}`}
                          alt=""
                          onError={(
                            err: React.SyntheticEvent<HTMLImageElement, Event>
                          ) => {
                            err.currentTarget.src =
                              "https://placehold.co/600x400";
                          }}
                        />
                      </div>
                      <div className=" d-flex flex-row gap-2 flex-wrap ">
                        <p className="p-0 m-0 fw-semibold">
                          {users?.name ?? "User"}
                        </p>
                      </div>
                      {!users.seenBy.includes(LOGGED_IN_USER._id) && (
                        <LiaStarOfLifeSolid />
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);

export default NewChatSidebar;
