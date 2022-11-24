import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { providerLogin, login, setLoading, resetPassword, loading } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [loginError, setLoginError] = useState("");

  const [userEmail, setUserEmail] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const errorStyle = "text-red-500 font-semibold text-xs mt-1";
  const [loginUserEmail, setLogInUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  // google signIn
  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginError("");
        toast.success("Logged in successfully!", { duration: 2000 });
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // saving user as buyer for google log in
  const saveUser = (name, email) => {
    const user = { name, email, role: "Buyer" };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLogInUserEmail(email);
      });
  };

  // email password based signIn
  const handleLogin = (data) => {
    const { email, password } = data;
    console.log(email, password);
    login(email, password)
      .then((result) => {
        const user = result.user;
        setLoginError("");
        toast.success("Logged in successfully!", { duration: 2000 });
        setLogInUserEmail(email);
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleEmailBlur = (email) => {
  //   setUserEmail(email);
  // };

  const handleResetPassword = () => {
    if (userEmail) {
      resetPassword(userEmail)
        .then(() => {
          toast.success(
            "Password reset email has been sent. Please, check your email!",
            { duration: 2000 }
          );
        })
        .catch((error) => {
          toast.error("Invalid Email");
          console.error(error);
        });
    } else {
      toast("Please provide your email!");
    }
  };

  return (
    <div className="dark:bg-slate-600  py-10">
      <div className="mx-5 md:w-1/2 md:mx-auto my-10 border p-5 pb-10 rounded-lg shadow-xl">
        <div>
          <h3 className="text-3xl dark:text-slate-200 font-semibold mb-4">
            Login
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4 text-left w-10/12 mx-auto"
        >
          {/* email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              {...register("email", {
                required: "Email Address is required",
                validate: {
                  equals: (email) => {
                    setUserEmail(email);
                  },
                },
              })}
              placeholder="Your Email"
              shadow={true}
            />
            {errors.email && (
              <p className={errorStyle}>{errors.email?.message}</p>
            )}
          </div>

          {/* password */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters or more",
                },
              })}
              placeholder="Your Password"
              shadow={true}
            />
            {/* password error */}
            {errors.password && (
              <p className={errorStyle}>{errors.password?.message}</p>
            )}
          </div>

          {/* auth error  */}
          {loginError && <p className={errorStyle}>{loginError}</p>}
          <div className="flex items-center gap-2">
            <Label>
              Don't have any account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline dark:text-blue-300"
                state={{ from: from }}
                replace
              >
                Register
              </Link>
            </Label>
          </div>
          <Button type="submit">
            {loading ? (
              <Spinner aria-label="Small spinner example" size="sm" />
            ) : (
              `Login`
            )}
          </Button>

          <div className="flex items-center gap-2">
            <Label>
              Forgot Password?
              <span
                onClick={handleResetPassword}
                className="text-blue-600 hover:underline ml-2 dark:text-blue-300"
              >
                Reset Password
              </span>
            </Label>
          </div>
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="border-gray-300 w-10/12 rounded-lg border p-3 bg-slate-200 hover:bg-slate-300 flex items-center justify-center gap-2 mx-auto"
          >
            <FaGoogle></FaGoogle>
            <span>Google Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
