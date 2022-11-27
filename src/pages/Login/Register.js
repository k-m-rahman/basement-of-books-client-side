import {
  Button,
  FileInput,
  Label,
  Radio,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import useToken from "../../hooks/useToken";

const Register = () => {
  const [signupError, setSignUpError] = useState("");
  const {
    signUp,
    updateUserProfile,
    verifyEmail,
    setLoading,
    setUser,
    loading,
    setForUpdate,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || "/";

  const errorStyle = "text-red-500 font-semibold text-xs mt-1";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  const handleSignUp = (data) => {
    console.log(data);

    setLoading(true);
    const { email, password, name, img, role } = data;

    // handling the image file
    const imgbbKey = process.env.REACT_APP_imgagebb_key;
    const formData = new FormData();
    const image = img[0];
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // registration
        signUp(email, password)
          .then((result) => {
            const user = result.user;
            setUser(user);
            setSignUpError("");
            handleEmailVerification();
            handleProfileUpdate(name, imgData.data.url);
            saveUser(name, email, imgData.data.url, role);
          })
          .catch((error) => {
            setSignUpError(error.message);
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  // email verification
  const handleEmailVerification = () => {
    verifyEmail();
  };

  // updating user name and photo

  const handleProfileUpdate = (name, photo) => {
    const profile = {
      displayName: name,
      photoURL: photo,
    };

    updateUserProfile(profile)
      .then(() => {
        console.log("User name and photo updated");
        // navigate(from, { replace: true });
        setForUpdate((prev) => !prev);
      })
      .catch((error) => console.error(error));
  };

  const saveUser = (name, email, photo, role) => {
    const user = { name, email, photo, role };
    fetch("https://basement-of-books-server-side.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        swal(
          "User Created successfully!",
          "Please verify your email!",
          "success"
        );
        setCreatedUserEmail(email);
      });
  };

  return (
    <div className="dark:bg-slate-600  py-10">
      <div className="mx-5 md:w-1/2 md:mx-auto mt-10 border p-5 pb-10 rounded-lg shadow-xl mb-10">
        <div>
          <h3 className="text-3xl text-center font-semibold mb-4 dark:text-slate-200">
            Register
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col gap-4 text-left w-10/12 mx-auto"
        >
          {/* name */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Full Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Your Full Name"
              {...register("name", {
                required: "Name is required",
              })}
              shadow={true}
            />
            {errors.name && (
              <p className={errorStyle}>{errors.name?.message}</p>
            )}
          </div>

          {/* photo */}
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              id="file"
              {...register("img", { required: "Photo is required" })}
              accept="image/*"
              helperText="A profile picture is useful to confirm your are logged into your account"
            />
            {errors.img && <p className={errorStyle}>{errors.img?.message}</p>}
          </div>

          {/* email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email Address is required",
              })}
              shadow={true}
            />
            {errors.email && (
              <p className={errorStyle}>{errors.email?.message}</p>
            )}
          </div>

          {/* password */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Your Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters long or more",
                },
                pattern: {
                  value: /(?=.*?[#?!@$%^&*-])/,
                  message: "Password must have at least one special character",
                },
                // others validation
                validate: {
                  equals: (password) => {
                    if (!/(?=.*?[0-9])/.test(password)) {
                      return "Password must have at least one digit";
                    } else if (!/(?=.*?[A-Z])/.test(password)) {
                      return "Password must have at least one capital letter";
                    }
                  },
                },
              })}
              shadow={true}
            />
            {errors.password && (
              <p className={errorStyle}>{errors.password?.message}</p>
            )}
          </div>

          {/* user role */}

          <fieldset className="flex gap-4" id="radio">
            <legend className="mb-2 font-semibold text-sm">
              Choose your role
            </legend>
            {/* buyer role button */}
            <div className="flex items-center gap-2">
              <Radio
                id="buyer"
                {...register("role")}
                value="Buyer"
                defaultChecked={true}
              />
              <Label htmlFor="buyer">Buyer</Label>
            </div>
            {/* seller role button */}
            <div className="flex items-center gap-2">
              <Radio id="seller" {...register("role")} value="Seller" />
              <Label htmlFor="seller">Seller</Label>
            </div>
          </fieldset>

          {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
          <div className="flex items-center gap-2">
            <Label htmlFor="agree">
              Already have any account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline dark:text-blue-300"
              >
                Login
              </Link>
            </Label>
          </div>
          <Button type="submit">
            {loading ? (
              <Spinner aria-label="Small spinner example" size="sm" />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
