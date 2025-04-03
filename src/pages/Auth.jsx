import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [name, setName] = useState(""); // Added for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError("");
    setLoading(true);

    const url = isSignup
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    const userData = isSignup ? { name, email, password } : { email, password }; // Include `name` only for signup

    try {
      const response = await axios.post(
        url,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;
      dispatch(login({ user, token }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user details

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignup ? "Sign Up" : "Login"}
      </h2>
      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      {isSignup && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        onClick={handleAuth}
        className={`w-full p-2 rounded text-white transition ${
          loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="text-center mt-3">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-400 hover:underline"
        >
          {isSignup ? "Login here" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
