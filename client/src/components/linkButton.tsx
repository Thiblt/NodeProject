// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import Link from "next/link";
import { FC } from "react";

// ||||||||||||||||||||||||||||| linkButton Component ||||||||||||||||||||||||||||||||||||

interface IlinkButtonProps {
  text: string;
  btnAction: string;
  colorBg: string;
}

const LinkButton: FC<IlinkButtonProps> = ({ text, btnAction, colorBg }) => {
  // Return
  return (
    <Link
      className={`ring-2 ring-offset-2 text-neutral-200 p-2 mx-2 rounded ${colorBg} `}
      href={btnAction}
    >
      {text}
    </Link>
  );
};
export default LinkButton;
