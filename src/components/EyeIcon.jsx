const EyeIcon = ({ open, size = 16 }) =>
  open ? (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8c1.3-2.5 4-4.5 6.5-4.5s5.2 2 6.5 4.5c-1.3 2.5-4 4.5-6.5 4.5s-5.2-2-6.5-4.5z" stroke="#B0B7C3" strokeWidth="1.2"/>
      <circle cx="8" cy="8" r="2" stroke="#B0B7C3" strokeWidth="1.2"/>
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8c1.3-2.5 4-4.5 6.5-4.5s5.2 2 6.5 4.5c-1.3 2.5-4 4.5-6.5 4.5s-5.2-2-6.5-4.5z" stroke="#B0B7C3" strokeWidth="1.2"/>
      <path d="M4 4l8 8" stroke="#B0B7C3" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

export default EyeIcon;