// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import Link from "next/link";
import { FC } from "react";

// ||||||||||||||||||||||||||||| linkButton Component ||||||||||||||||||||||||||||||||||||

interface IModalProps {
  children: any;
}

const ModalScreen: FC<IModalProps> = ({ children }) => {
  // Return
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div>{children}</div>
    </div>
  );
};
export default ModalScreen;
