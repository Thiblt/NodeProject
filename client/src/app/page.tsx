// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import Layout from "@/layouts/layout";
import { FC } from "react";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface IpageProps {}

const page: FC<IpageProps> = ({}) => {
  // Return
  return (
    <Layout>
      <p>hello</p>
    </Layout>
  );
};
export default page;
