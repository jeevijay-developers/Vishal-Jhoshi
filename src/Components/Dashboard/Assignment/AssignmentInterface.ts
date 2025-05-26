interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "student";
}
