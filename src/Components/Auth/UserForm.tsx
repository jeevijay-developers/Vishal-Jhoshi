import {
  CreateAccount,
  DontHaveAccount,
  EmailAddressLogIn,
  ForgotPassword,
  OrSignInWith,
  SignInAccount,
  SignUpAccount,
  Password,
  RememberPassword,
  SignIn,
  SignInToAccount,
  SignUp,
} from "@/Constant";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo1.png";
import imageTwo from "../../../public/assets/images/logo/logo-dark.png";
import { signUp } from "@/server/auth";
import { signIn } from "next-auth/react";
// import SelecQuestion from "../Test/Test Components/attending/SelecQuestion";

const targetClass = [
  {
    index: 0,
    targetClass: "Select Target Course",
  },
  {
    index: 1,
    targetClass: "JEE Mains",
  },
  {
    index: 2,
    targetClass: "JEE Advanced",
  },
  {
    index: 3,
    targetClass: "NEET",
  },
];

const classes = [
  {
    index: 0,
    targetClass: "Select Class",
  },
  {
    index: 1,
    targetClass: "Class 6",
  },
  {
    index: 2,
    targetClass: "Class 7",
  },
  {
    index: 3,
    targetClass: "Class 8",
  },
  {
    index: 4,
    targetClass: "Class 9",
  },
  {
    index: 5,
    targetClass: "Class 10",
  },
  {
    index: 6,
    targetClass: "Class 11",
  },
  {
    index: 7,
    targetClass: "Class 12",
  },
  {
    index: 8,
    targetClass: "Dropper",
  },
];

export const UserForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [signUpCheck, setSignUp] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const router = useRouter();
  // old code
  // const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (signUpCheck) {
  //     const result = await signUp(email, password, name);
  //     if (result?.status === "success") {
  //       setSignUp(false);
  //       toast.success("Success...");
  //     } else {
  //       toast.error("Invalid Data...");
  //     }
  //     return;
  //   }

  //   const result = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false,
  //     callbackUrl: "/pages/dashboard",
  //   });
  //   // const result = await signIn(email, password);

  //   // console.log(result);

  //   // if (result.statusCode === 200) {
  //   //   toast.success("successfully Logged in Rediract......");
  //   //   router.push(result.url || "http://localhost:3000/dashboard");
  //   // } else {
  //   //   toast.error("Invalid Credentaial...");
  //   // }
  //   if (result?.ok) {
  //     console.log(result);
  //     toast.success("successfully Logged in ......");
  //     router.push(result.url || "/dashboard");
  //     // create a room after successfull login
  //   } else {
  //     toast.error("Invalid Credentaial...");
  //   }
  // };
  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signUpCheck) {
        const result = await signUp(
          email,
          password,
          name,
          target,
          studentClass
        );
        if (result?.status === "success") {
          setSignUp(false);
          toast.success("Success...");
        } else {
          toast.error("Invalid Data...");
        }
        console.log({ email, password, name, target, studentClass });
      } else {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/pages/dashboard",
        });

        if (result?.ok) {
          toast.success("successfully Logged in ......");
          router.push(result.url || "/dashboard");
        } else {
          toast.error("Invalid Credentaial...");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Link className="logo" href="/dashboard/default">
          <Image
            width={91}
            height={27}
            className="img-fluid for-light"
            src={imageOne}
            alt="login page"
            priority
          />
          <Image
            width={91}
            height={27}
            className="img-fluid for-dark"
            src={imageTwo}
            alt="login page"
            priority
          />
        </Link>
      </div>
      <div className="login-main">
        <Form
          className="theme-form"
          onSubmit={(event) => formSubmitHandle(event)}
        >
          <h2 className="text-center">
            {signUpCheck ? SignUpAccount : SignInToAccount}
          </h2>
          {signUpCheck && (
            <>
              <FormGroup>
                <Label className="col-form-label">Name</Label>
                <Input
                  defaultValue={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="User name"
                />
              </FormGroup>{" "}
              {/* <br /> */}
              <FormGroup>
                <Label className="col-form-label">Select Target</Label>
                <Input
                  type="select"
                  defaultValue={""}
                  onChange={(event) => {
                    console.log(event.target.value);

                    setTarget(event.target.value);
                  }}
                >
                  {targetClass.map((item, index) => (
                    <option key={index} value={item.targetClass}>
                      {item.targetClass}
                    </option>
                  ))}
                </Input>
                <Label className="col-form-label">Select Class</Label>
                <Input
                  type="select"
                  defaultValue={""}
                  onChange={(event) => {
                    console.log(event.target.value);

                    setStudentClass(event.target.value);
                  }}
                >
                  {classes.map((item, index) => (
                    <option key={index} value={item.targetClass}>
                      {item.targetClass}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </>
          )}
          <FormGroup>
            <Label className="col-form-label">{EmailAddressLogIn}</Label>
            <Input
              type="email"
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Test123@gmail.com"
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="position-relative form-input">
              <Input
                type={show ? "text" : "password"}
                defaultValue={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Test@123"
              />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>

          {!signUpCheck ? (
            <FormGroup className="mb-0 checkbox-checked">
              <FormGroup className="checkbox-solid-info" check>
                <Input id="checkbox1" type="checkbox" />
                <Label className="text-muted" htmlFor="checkbox1">
                  {RememberPassword}
                </Label>
              </FormGroup>
              <Link className="link" href={`/authentication/forget_password`}>
                {ForgotPassword}
              </Link>
              <div className="text-end mt-3">
                <Button type="submit" color="primary" block disabled={loading}>
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    SignIn
                  )}
                </Button>
              </div>
            </FormGroup>
          ) : (
            <FormGroup className="mb-0 checkbox-checked">
              <div className="text-end mt-3">
                <Button type="submit" color="primary" block disabled={loading}>
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    SignUp
                  )}
                </Button>
              </div>
            </FormGroup>
          )}
          {signUpCheck ? (
            <p className="mt-4 mb-0 text-center">
              {SignInAccount}
              <Button className="ms-2" onClick={() => setSignUp(false)}>
                {SignIn}
              </Button>
            </p>
          ) : (
            <p className="mt-4 mb-0 text-center">
              {DontHaveAccount}
              <Button className="ms-2" onClick={() => setSignUp(true)}>
                {CreateAccount}
              </Button>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};
