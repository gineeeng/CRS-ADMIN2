import axios from "axios";
import backgroundImage from "../assets/login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return toast.error("Please add all fields");
    }

    try {
      await axios
        .post(`${import.meta.env.VITE_CRS_API_KEY}/api/admins/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          Cookies.set("role", response.data.role);
          Cookies.set("token", response.data.token);
          Cookies.set("userId", response.data.adminId);
          toast.success("You have successfully logged in!");
          navigate("/dashboard");
        });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen" style={backgroundStyle}>
      <div style={containerStyle} className="bg-gray-800 ">
        <form onSubmit={handleLogin} style={formStyle}>
          <h2 className="text-4xl font-bold mb-2">Login to continue</h2>
          <div className="flex flex-col py-2">
            <label>Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password: </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <button className="w-full my-5 py-4 text-xl font-semibold bg-[#0e0e0e] text-white font-semibold rounded-lg">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const containerStyle = {
  border: "2px solid #ccc",
  borderRadius: "20px",
  padding: "40px",
  margin: "12px",
  maxWidth: "800px",
  width: "100%",
  display: "flex",
};

const formStyle = {
  flex: 1,
};
