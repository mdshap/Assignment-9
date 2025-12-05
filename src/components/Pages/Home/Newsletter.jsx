// NewsletterStylish.jsx
import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa";

export default function Newsletter({
  rememberKey = "nh_subscribed",
  initialEmail = ""
}) {
  // colors (keep here so JS-driven styles can use them)
  const PRIMARY = "#CAEB66"; // lime
  const SECONDARY = "#03373D"; // deep teal

  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // try to restore subscription state
    const val = localStorage.getItem(rememberKey);
    if (val === "1") setSubscribed(true);
  }, [rememberKey]);

  const validateEmail = (e) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(e);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter an email address.");
      return;
    }
    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");

    try {
      // simulate API call
      await new Promise((r) => setTimeout(r, 700));

      // success
      setStatus("success");
      setSubscribed(true);
      localStorage.setItem(rememberKey, "1");
      setTimeout(() => setStatus("idle"), 900); // clear sending state visually
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError("Subscription failed. Try again.");
    }
  };

  const reset = () => {
    setSubscribed(false);
    localStorage.removeItem(rememberKey);
    setStatus("idle");
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className="py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* tiny local styles for gradients/animations */}
      <style>{`
        :root{
          --nh-primary: ${PRIMARY};
          --nh-secondary: ${SECONDARY};
        }
        .nh-card {
          background: linear-gradient(135deg, rgba(2,22,21,0.02), rgba(2,22,21,0.03));
          border: 1px solid rgba(3,55,61,0.06);
          backdrop-filter: blur(6px);
        }
        .nh-cta {
          background: linear-gradient(90deg, var(--nh-primary), #b8e34f 60%, var(--nh-secondary));
          color: rgba(1,5,5,0.98);
        }
        .nh-ghost {
          background: linear-gradient(90deg, rgba(2,22,21,0.02), rgba(3,55,61,0.02));
          border: 1px solid rgba(3,55,61,0.06);
        }
        @keyframes popIn {
          0% { transform: scale(.6); opacity: 0 }
          60% { transform: scale(1.06); opacity: 1 }
          100% { transform: scale(1); }
        }
        .nh-pop { animation: popIn .45s cubic-bezier(.2,.9,.3,1) both; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div className="nh-card rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          {/* decorative gradient blob */}
          <div
            aria-hidden
            style={{
              background:
                "radial-gradient(circle at 10% 10%, rgba(202,235,102,0.12), transparent 12%), radial-gradient(circle at 90% 90%, rgba(3,55,61,0.07), transparent 16%)",
            }}
            className="pointer-events-none absolute inset-0 rounded-2xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3
                id="newsletter-title"
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: SECONDARY }}
              >
                Stay in the loop
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Weekly tips, code snacks and new releases — hand-picked and delivered once a week.
              </p>

              <ul className="mt-4 text-sm space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 w-3 h-3 rounded-full" style={{ background: PRIMARY }} />
                  <span>Concise tutorials & code examples</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 w-3 h-3 rounded-full" style={{ background: SECONDARY }} />
                  <span>Early access and community perks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 w-3 h-3 rounded-full" style={{ background: PRIMARY }} />
                  <span>No spam — unsubscribe any time</span>
                </li>
              </ul>
            </div>

            <div>
              {subscribed ? (
                <div className="flex items-center gap-4 bg-white/60 border rounded-xl p-4 nh-pop">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg" style={{ background: PRIMARY }}>
                    <FaCheck className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">You're on the list!</p>
                    <p className="text-sm text-gray-600">Expect our next email soon.</p>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={reset}
                      className="btn btn-ghost btn-sm nh-ghost text-xs"
                      aria-label="Reset subscription"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-3">
                    <label htmlFor="nh-email" className="sr-only">
                      Email address
                    </label>

                    <input
                      id="nh-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Your best email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full input input-lg rounded-xl px-4 py-3 border-gray-200 focus:ring-0"
                      aria-invalid={!!error}
                      aria-describedby={error ? "nh-error" : undefined}
                    />

                    <button
                      type="submit"
                      className={`nh-cta inline-flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm hover:scale-[1.01] transition-transform`}
                      aria-label="Subscribe"
                      disabled={status === "sending"}
                      style={{ border: "none" }}
                    >
                      <span className="font-semibold text-sm">Subscribe</span>
                      <FaPaperPlane className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p id="nh-hint" className="text-xs text-gray-600">
                      We respect your inbox. Unsubscribe anytime.
                    </p>
                    {error ? (
                      <p id="nh-error" className="text-xs text-red-600">
                        {error}
                      </p>
                    ) : (
                      <div className="text-xs text-gray-500">Secure · no spam</div>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* subtle bottom bar */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-12 rounded-full opacity-5" style={{ background: PRIMARY }} />
        </div>
      </div>
    </section>
  );
}
