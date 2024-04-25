"use client";
import axios from "axios";
// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface IpageProps {}
interface IBar {
  id?: string;
  name?: string;
  description?: string;
  adresse?: string;
  tel?: string;
  email?: string;
}
const Page: FC<IpageProps> = ({}) => {
  const params = useParams<{ id: string }>();

  const [bar, setBar] = useState<IBar | null>(null);
  const data = async () => {
    await axios
      .get("http://localhost:3000/api")
      .then((response) => {
        setBar(response.data);
        return response.data;
      })
      .catch(() => {
        return null;
      });
  };

  useEffect(() => {
    data();
  }, []);

  console.log(params);
  // Return
  return <div></div>;
};
export default Page;
