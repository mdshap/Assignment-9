import React, { useEffect, useRef, useState } from "react";
import { use } from "react";
import { Link, useNavigate } from "react-router";

import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Authentication/AuthContext";

const Login = () => {
  const { user, signInUser, setRegisterLoading, setLoading, signInWithGoogle } =
    use(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => res.json())
      .catch(() => setRegisterLoading(false))
      .catch(() => setRegisterLoading(false));
  };

  const toastShownRef = useRef(false);
  const justLoggedInRef = useRef(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setErrorLogin("");
    justLoggedInRef.current = true;

    signInUser(email, password)
      .then((result) => {
        toast.success("Successfully Logged in!");
        justLoggedInRef.current = true;
        console.log("Logged In:", result.user);
      })
      .catch((err) => {
        setLoading(false);
        setErrorLogin("Invalid email or password");
        toast.error("Invalid Email or Password");
        justLoggedInRef.current = false;
        console.log(err);
      });
  };

  useEffect(() => {
    if (!user) return;

    if (justLoggedInRef.current) {
      justLoggedInRef.current = false;
      navigate("/", { replace: true });
      return;
    }

    if (!toastShownRef.current) {
      toastShownRef.current = true;
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div
      className="hero min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('pubg.png')",
      }}>
      <div className="hero-overlay "></div>
      <div className="hero-content w-full max-w-5xl mx-auto flex-col lg:flex-row-reverse gap-10 px-6 py-12">
        <div className="text-center lg:text-left w-sm bg-black/20 p-4 rounded-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Join the <span className="text-blue-500">Game Zone</span>
          </h1>
          <p className="mt-4 text-md md:text-2xl text-white max-w-2xl">
            Download the latest PC games instantly — fast installers, verified
            builds, and one-click updates. Play more, wait less.
          </p>
        </div>

        <div className="card w-full max-w-md backdrop-blur-sm rounded-2xl shadow-2xl  md:ml-40 border border-white/40">
          <div className="card-body p-8">
            <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-2">
              Login now!
            </h2>

            <form onSubmit={handleLogin} className="grid gap-4">
              <div>
                <label className="label text-sm  text-white">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="input input-bordered w-full placeholder-gray-400"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="label text-sm  text-white">Password</label>
                <div className="flex relative justify-center items-center">
                  <input
                    required
                    type={showPass ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-full placeholder-gray-400"
                    placeholder="Password"
                  />
                  {showPass ? (
                    <FaRegEyeSlash
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-950 text-lg cursor-pointe"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-950 text-lg cursor-pointe"
                    />
                  )}
                </div>

                <div className="text-red-600 text-center">{errorLogin}</div>
              </div>

              <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:scale-[1.01] transition">
                Login
              </button>

              <div className="text-center text-sm text-gray-500">OR</div>
            </form>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 flex items-center justify-center gap-3 hover:shadow-md transition">
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Continue with Google
            </button>
            <Link
              to="/register"
              className="mx-auto text-cyan-600 hover:text-blue-400">
              Don't Have An Account? Create One
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
