"use client";

// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useAxios } from "@/hooks/axios.hook";
import { FC } from "react";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface IpageProps {}

const HomePage: FC<IpageProps> = ({}) => {
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

  // Return
  return (
    <div>
      <p>page Component</p>
      <button onClick={handleLogout}>Deconnection</button>
    </div>
  );
};
export default HomePage;
