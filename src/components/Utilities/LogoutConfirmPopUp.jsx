import { createPortal } from "react-dom";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";

const LogoutConfirmPopUp = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center overflow-y-auto p-4 backdrop-blur-sm backdrop-brightness-50 sm:items-center"
      onClick={onCancel}
    >
      <div
        className="relative my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-2 top-2 cursor-pointer text-gray-400 transition hover:text-gray-600"
        >
          <FaTimes size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <FaSignOutAlt size={22} />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-gray-800">Log out?</h1>
          <p className="mb-6 text-gray-600">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="ui-btn-lift rounded-lg bg-gray-200 px-4 py-2 text-gray-700 shadow-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="ui-btn-lift rounded-lg bg-red-600 px-4 py-2 text-white shadow-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutConfirmPopUp;
