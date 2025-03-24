import { ElementType } from "react";

interface Props {
  icon: ElementType; // Định dạng đúng cho component SVG
  label: string;
}

const IconButton = ({ icon: Icon, label }: Props) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      <Icon className="icon" />
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
