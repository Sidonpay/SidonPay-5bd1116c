import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function HangTightOverlay() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[110] bg-[#2D7A51] bg-opacity-60">
      <div className="bg-white rounded-md shadow-lg w-[340px] px-6 py-8 flex flex-col items-center">
        <h2 className="text-sm font-bold mb-1 text-center">Hang tight</h2>
        <p className="text-gray-700 text-center mb-6 text-xs">
          Super Admin will send your full <br /> password reset link.
        </p>
        <button
          type="button"
          className="w-full py-2 px-4 rounded bg-[#256B3B] text-white font-semibold text-base transition hover:bg-[#1C5130] focus:outline-none"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

HangTightOverlay.propTypes = {};