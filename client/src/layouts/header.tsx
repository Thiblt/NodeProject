"use client";

// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import HomeBar from "@/app/bars/page";
import { useAxios } from "@/hooks/axios.hook";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

// ||||||||||||||||||||||||||||| header Component ||||||||||||||||||||||||||||||||||||

interface IheaderProps {}

const Header: FC<IheaderProps> = ({}) => {
  const [user, setUser] = useState(false);

  const handleVerifyUser = async () => {
    try {
      await useAxios
        .get("/members/current", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setUser(true);
          } else {
            setUser(false);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

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
    handleVerifyUser();
  }, []);

  // Return
  return (
    <header className="flex flex-row bg-slate-500 text-lg h-10">
      <ul className="flex w-2/3 justify-around my-auto">
        <li>
          <Link href="/bars">Bar</Link>
        </li>
        <li>
          <Link href="/beers">Bière</Link>
        </li>
        <li>
          <Link href="/order">Commande</Link>
        </li>
      </ul>
      <ul className=" flex flex-row w-1/3 justify-center my-auto">
        <li>
          {user ? (
            <button onClick={handleLogout}>Se Deconnecter</button>
          ) : (
            <a href="/signin">Connexion</a>
          )}
        </li>
      </ul>
    </header>
  );
};
export default Header;
