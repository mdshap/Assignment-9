
import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Authentication/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

const  UserInformation = ({ onSave, className = "" }) => {
  const { user } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    photoURL: "",
    phoneNumber: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setForm({
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      phoneNumber: user.phoneNumber || "",
    });
  }, [user]);

  const openModal = () => {
    setMessage(null);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSaving(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    const updates = {
      displayName: form.displayName?.trim() || null,
      photoURL: form.photoURL?.trim() || null,
      phoneNumber: form.phoneNumber?.trim() || null,
    };

    try {
      if (onSave) {
        await onSave(updates);
      }
      setMessage({
        type: "success",
        text: "Saved (UI only). AuthProvider should persist it.",
      });
      setTimeout(() => closeModal(), 700);
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Save failed" });
      setSaving(false);
    }
  }


  return (
    <div className={`max-w-4xl mx-auto p-4 ${className}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            {user.photoURL ? (
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">No avatar</div>
            )}
          </div>

          <div className="text-center md:text-left">
            <div className="text-lg font-semibold text-gray-900">
              {user?.displayName}
            </div>
            <div className="text-sm text-gray-500">
              {user.email || "No email"}
            </div>
          </div>

          <div className="mt-2">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg shadow hover:brightness-95 transition">
              Edit profile
            </button>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-blue-600 rounded-lg">
            <div className="text-xs text-gray-400">Name</div>
            <div className="mt-1 text-blue-600 font-medium">{user?.displayName}</div>
          </div>

          <div className="p-4 border border-green-600 rounded-lg">
            <div className="text-xs text-gray-400">Email</div>
            <div className="mt-1 text-green-600 font-medium">{user.email || "—"}</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-xs text-gray-400">Phone</div>
            <div className="mt-1">{user.phoneNumber || "None"}</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-xs text-gray-400">Verified</div>
            <div className=" mt-1 text-gray-500">
              {user.emailVerified ? (
                <div className="text-green-600 flex gap-2  items-center">
                  <FaCheckCircle /> Yes
                </div>
              ) : (
                <div className="text-red-600 flex gap-2  items-center">
                  <RxCrossCircled /> No
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border rounded-lg sm:col-span-2">
            <div className="text-xs text-gray-400">Sign in status</div>
            <div className="mt-1 text-sm text-gray-600">
              Created:{" "}
              {user.metadata?.creationTime || user.metadata?.createdAt}
            </div>
            <div className="text-sm text-gray-600">
              Last Sign-in:{" "}
              {user.metadata?.lastSignInTime || user.metadata?.lastLoginAt}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          />

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6"
            role="dialog"
            aria-modal="true">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Edit profile</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-gray-500">Display name</label>
                <input
                  name="displayName"
                  value={form.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Photo URL</label>
                <input
                  name="photoURL"
                  value={form.photoURL}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                
              </div>

              <div>
                <label className="text-xs text-gray-500">Phone number</label>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>

              {message && (
                <div
                  className={`text-sm ${
                    message.type === "error" ? "text-red-600" : "text-green-600"
                  }`}>
                  {message.text}
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-md bg-secondary text-white disabled:opacity-60">
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
export default UserInformation;