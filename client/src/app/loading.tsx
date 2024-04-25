// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { FC } from "react";
import { MoonLoader } from "react-spinners";

// ||||||||||||||||||||||||||||| loading Component ||||||||||||||||||||||||||||||||||||

interface IloadingProps {}

const Loading: FC<IloadingProps> = ({}) => {
  // Return
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center gap-x-4">
      <h3 className="text-3xl font-bold">Loading Page</h3>
      <MoonLoader color="#36d7b7" size={50} speedMultiplier={0.5} />
    </div>
  );
};
export default Loading;
