import React, { useEffect, useRef, useState } from "react";
import { use } from "react";
import { Link,  useNavigate } from "react-router";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Authentication/AuthContext";

const Register = () => {
  const toastShownRef = useRef(false);
  const { user, createUser, setRegisterLoading, signInWithGoogle, signOutUser, setLoading } =
    use(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [errorPass, setErrorPass] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then((res) => res.json())
          .catch(() => setRegisterLoading(false))
      .catch(() => setRegisterLoading(false));
  }

  const handleEmailRegister = (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    if (!passwordPattern.test(password)) {
      setErrorPass(
        "Invalid Password! Your password must have 1 Upper & Lower Case and 1 Special Character"
      );
      return;
    }

    setErrorPass("");
    createUser(name, email, password, photoURL)
      .then(async (result) => {
        console.log(result)
        setRegisterSuccess(true);
        try {
          await signOutUser();
        } catch (err) {
          console.error("Sign out after register failed:", err);
        }
      })
      .catch((error) => {
        toast.error("Invalid Email or Email Already Exists");
        console.log(error);
      });
    }

  useEffect(() => {
    if (user && !toastShownRef.current) {
    toastShownRef.current = true;
    navigate("/", { replace: true });
  }}, [user, navigate]);


    useEffect(() => {
    if (registerSuccess){
      signOutUser() 
      toast.success('Successfully Created Account')
      navigate("/login", { replace: true })
      
  };
  }, [registerSuccess, navigate, signOutUser, setLoading]);

  return (
    <div
      className="hero min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('fifa.png')",
      }}>
      <div className="hero-overlay "></div>
      <div className="hero-content w-full   flex-col-reverse lg:flex-row gap-10 px-6 py-12">
        

        <div className="text-center lg:text-left max-w-4xl bg-black/20 p-4 rounded-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Join the <span className="text-blue-500">Game Zone</span>
          </h1>
          <p className="mt-4 text-md md:text-2xl text-white max-w-2xl">
  Download the latest PC games instantly — fast installers, verified builds,
  and one-click updates. Play more, wait less.
</p>

        </div>

        <div className="card w-full max-w-md bg-/40 backdrop-blur-sm rounded-2xl shadow-2xl md:ml-40 border">
          <div className="card-body p-8">
            <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-2">
              Register now!
            </h2>

            <form onSubmit={handleEmailRegister} className="grid gap-4">
              <div>
                <label className="label text-sm text-white">Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="input input-bordered w-full placeholder-gray-400"
                  placeholder="Your full name"
                />
              </div>

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
                <label className="label text-sm text-white">Photo URL</label>

                <input
                  required
                  type="url"
                  name="photoURL"
                  className="input input-bordered w-full placeholder-gray-400"
                  placeholder="Link to Your Photo"
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
                <div className="text-red-600 text-center">{errorPass}</div>
              </div>

              <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:scale-[1.01] transition">
                Create Account
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
              to="/login"
              className="mx-auto text-red-400 hover:text-blue-400">
              Already Have An Account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
