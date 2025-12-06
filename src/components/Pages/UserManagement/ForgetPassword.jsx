// ForgotPassword.jsx
import React, { use, useEffect, useState } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Authentication/AuthContext";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

export default function ForgetPassword() {
  const location = useLocation();
  const query = useQuery();
  const { resetPassword } = use(AuthContext);

  const initialEmail =
    (location && location.state && location.state.email) ||
    query.get("email") ||
    "";

  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setLoading(false);
      toast.success("Password reset email sent. Check your inbox.");
      window.open("https://mail.google.com", "_blank", "noopener,noreferrer");
    } catch (err) {
      setLoading(false);
      const message =
        err?.code === "auth/user-not-found"
          ? "No user found with this email."
          : err?.message || "Failed to send reset email.";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset}>
        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 rounded bg-slate-800 text-white"
          disabled={loading}
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </form>

      <p className="text-sm mt-4">
        After sending you’ll be redirected to Gmail in a new tab to check your
        message.
      </p>
    </div>
  );
}
