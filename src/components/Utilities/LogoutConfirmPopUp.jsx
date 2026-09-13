import { FaSignOutAlt, FaTimes } from "react-icons/fa";

const LogoutConfirmPopUp = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-4 backdrop-blur-sm backdrop-brightness-50 sm:items-center"
      onClick={onCancel}
    >
      <div
        className="relative my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <FaSignOutAlt size={22} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Log out?
          </h1>
          <p className="text-gray-600 mb-6">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 cursor-pointer text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmPopUp;
