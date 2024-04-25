"use client";

// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useAxios } from "@/hooks/axios.hook";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import Loading from "./loading";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface IpageProps {}

const HomePage: FC<IpageProps> = ({}) => {
  const router = useRouter();

  // Functions
  const handleLogout = async () => {
    try {
      await useAxios
        .get("/members/logout", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.status === 200) {
            window.location.reload();
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    router.replace("/bars");
  }, []);

  // Return
  return <Loading />;
};
export default HomePage;
