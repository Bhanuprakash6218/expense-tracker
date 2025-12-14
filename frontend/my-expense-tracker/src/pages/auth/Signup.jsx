import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    let profilePicUrl = "";
    if (!fullName) {
      setError("Please enter your Full Name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid Email Address");
      return;
    }
    if (!password) {
      setError("Please enter a Password");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profilePicUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: profilePicUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@gmail.com"
            />
            <div className="col-span-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 Characters"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs my-2">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
