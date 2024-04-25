// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import Link from "next/link";
import { FC } from "react";

// ||||||||||||||||||||||||||||| linkButton Component ||||||||||||||||||||||||||||||||||||

interface IlinkButtonProps {
  text: string;
  onClick?: () => any;
  colorBg: string;
}

const LinkButton: FC<IlinkButtonProps> = ({ text, onClick, colorBg }) => {
  // Return
  return (
    <button
      className={`ring-2 ring-offset-2 text-neutral-200 p-2 mx-2 rounded ${colorBg} `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default LinkButton;
