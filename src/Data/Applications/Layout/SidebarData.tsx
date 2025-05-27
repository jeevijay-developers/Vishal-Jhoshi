import { MenuItem } from "@/Types/LayoutTypes";


export const UserListData = [
  {
    icon: "Profile",
    text: "Profile",
    href: "/profile",
  },
];

export const StudentMenuList: MenuItem[] | undefined = [
  {
    title: "General",
    lanClass: "lan-1",
    Items: [
      {
        title: "Profile",
        id: 1,
        icon: "mdi:account", // ✅ Correct icon for a user/profile
        path: "/profile",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Dashboard",
        id: 1,
        icon: "mdi:account",
        path: "/dashboard",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "My Mentor",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/my-mentor",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Study Mode",
        id: 1,
        icon: "hugeicons:study-lamp",
        path: "/study-mode",
        type: "link",
        lanClass: "lan-3",
      },
    ],
  },

  {
    title: "Tests",
    lanClass: "lan-1",
    Items: [
      {
        title: "Live Test",
        id: 1,
        icon: "mingcute:checks-line",
        path: "/live-test",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Result Dashboard",
        id: 1,
        icon: "si:insights-line",
        path: "/test-dashboard",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Predict College",
        id: 1,
        icon: "mingcute:checks-line",
        path: "/college",
        type: "link",
        lanClass: "lan-3",
      },
      // {
      //   title: "Practice Test",
      //   id: 2,
      //   icon: "uil:analysis",
      //   path: "/practice-test",
      //   type: "link",
      //   lanClass: "lan-3",
      // },
      // {
      //   title: "Assignment",
      //   id: 2,
      //   icon: "uil:analysis",
      //   path: "/assignment",
      //   type: "link",
      //   lanClass: "lan-3",
      // },
    ],
  },
  {
    title: "Chat",
    lanClass: "lan-1",
    Items: [
      {
        title: "Chat with VJ sir",
        id: 1,
        icon: "mdi:chat-outline",
        path: "/chat-admin",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Chat with Mentor",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/chat-mentor",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Messages",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/message",
        type: "link",
        lanClass: "lan-3",
      },
    ],
  },
  {
    title: "Studies",
    lanClass: "lan-3",
    Items: [
      // {
      //   title: "My Progress",
      //   id: 2,
      //   icon: "ri:progress-5-fill",
      //   path: "/progress",
      //   type: "link",
      //   lanClass: "lan-3",
      // },
    ],
  },
];

export const AdminMenuList: MenuItem[] | undefined = [
  {
    title: "General",
    lanClass: "lan-1",
    Items: [
      {
        title: "Profile",
        id: 1,
        icon: "mdi:account", // ✅ Correct icon for a user/profile
        path: "/profile",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Dashboard",
        id: 1,
        icon: "si:insights-line",
        path: "/dashboard",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Test Dashboard",
        id: 1,
        icon: "si:insights-line",
        path: "/test-dashboard",
        type: "link",
        lanClass: "lan-3",
      },
      // {
      //   title: "Sessions",
      //   id: 2,
      //   icon: "material-symbols:live-tv-outline",
      //   path: "/sessions",
      //   type: "link",
      //   lanClass: "lan-3",
      // },
    ],
  },
  {
    title: "Tests",
    lanClass: "lan-1",
    Items: [
      {
        title: "Live Test",
        id: 1,
        icon: "mingcute:checks-line",
        path: "/live-test",
        type: "link",
        lanClass: "lan-3",
      },
      // {
      //   title: "Practice Test",
      //   id: 2,
      //   icon: "uil:analysis",
      //   path: "/practice-test",
      //   type: "link",
      //   lanClass: "lan-3",
      // },
    ],
  },
  {
    title: "Chat",
    lanClass: "lan-1",
    Items: [
      {
        title: "Chats",
        id: 1,
        icon: "mdi:chat-outline",
        path: "/chat-admin",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Mentors",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/chat-mentor",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Our Mentors",
        id: 1,
        icon: "mdi:account", // ✅ Correct icon for a user/profile
        path: "/our-mentors",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Add Mentor",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/add-mentor",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Messages",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/message",
        type: "link",
        lanClass: "lan-3",
      },
    ],
  },
  {
    title: "App Settings",
    lanClass: "lan-3",
    Items: [
      {
        title: "User & Permissions",
        id: 1,
        icon: "hugeicons:study-lamp",
        path: "/user-permissions",
        type: "link",
        lanClass: "lan-3",
      },
    ],
  },
];

export const MentorMenuList: MenuItem[] | undefined = [
  {
    title: "General",
    lanClass: "lan-1",
    Items: [
      {
        title: "Profile",
        id: 1,
        icon: "mdi:account", // ✅ Correct icon for a user/profile
        path: "/profile",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Dashboard",
        id: 1,
        icon: "si:insights-line",
        path: "/dashboard",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Sessions",
        id: 2,
        icon: "material-symbols:live-tv-outline",
        path: "/sessions",
        type: "link",
        lanClass: "lan-3",
      },
    ],
  },
  {
    title: "Tests",
    lanClass: "lan-1",
    Items: [
      {
        title: "Live Test",
        id: 1,
        icon: "mingcute:checks-line",
        path: "/live-test",
        type: "link",
        lanClass: "lan-3",
      },
      // {
      //   title: "Practice Test",
      //   id: 2,
      //   icon: "uil:analysis",
      //   path: "/practice-test",
      //   type: "link",
      //   lanClass: "lan-3",
      // },
    ],
  },
  {
    title: "Chat",
    lanClass: "lan-1",
    Items: [
      {
        title: "Chat with VJ sir",
        id: 1,
        icon: "mdi:chat-outline",
        path: "/chat-admin",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Chat with Students",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/chat-mentor",
        type: "link",
        lanClass: "lan-3",
      },
      {
        title: "Messages",
        id: 2,
        icon: "mdi:chat-outline",
        path: "/message",
        type: "link",
        lanClass: "lan-3",
      },
    ],
  },
  // {
  //   title: "App Settings",
  //   lanClass: "lan-3",
  //   Items: [
  //     {
  //       title: "User & Permissions",
  //       id: 1,
  //       icon: "hugeicons:study-lamp",
  //       path: "/user-permissions",
  //       type: "link",
  //       lanClass: "lan-3",
  //     },
  //   ],
  // },
];
