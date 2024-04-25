// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { FC, ReactNode } from "react";
import Header from "./header";

// ||||||||||||||||||||||||||||| layout Component ||||||||||||||||||||||||||||||||||||

interface IlayoutProps {
  children?: React.ReactNode;
}

const Layout: FC<IlayoutProps> = ({ children }) => {
  // Return
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
