import CheckIcon from "./CheckIcon";
import CrossIcon from "./CrossIcon";

const RequirementItem = ({ checked, text }) => (
  <li className={`flex items-center gap-2 ${
    checked === null ? "text-gray-400" : checked ? "text-[#4CBF4B]" : "text-[#FF5B5B]"
  }`}>
    {checked === null ? null : checked ? (
      <CheckIcon size={16} />
    ) : (
      <CrossIcon size={16} />
    )}
    {text}
  </li>
);

export default RequirementItem;