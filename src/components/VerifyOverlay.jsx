import PropTypes from "prop-types";

export function SpinnerOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-[#23293b] bg-opacity-90">
      <svg width={150} height={150} viewBox="0 0 150 150">
        <circle
          cx="75"
          cy="75"
          r="55"
          stroke="#474D5C"
          strokeWidth="10"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M75 20 a55 55 0 0 1 55 55"
          stroke="#fff"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 75 75"
            to="360 75 75"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}

export function SuccessOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-[#23293b] bg-opacity-90">
      <svg width={150} height={150} viewBox="0 0 150 150">
        <circle
          cx="75"
          cy="75"
          r="55"
          stroke="#474D5C"
          strokeWidth="10"
          fill="none"
          opacity="0.85"
        />
        <circle
          cx="75"
          cy="75"
          r="55"
          stroke="#fff"
          strokeWidth="10"
          fill="none"
          strokeDasharray="10,12"
          opacity="0.9"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 75 75"
            to="360 75 75"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M55 80 l20 20 l30 -35"
          fill="none"
          stroke="#fff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

SpinnerOverlay.propTypes = {};
SuccessOverlay.propTypes = {};