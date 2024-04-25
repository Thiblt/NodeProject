// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import HomeBar from "@/app/bars/page";
import Link from "next/link";
import { FC } from "react";

// ||||||||||||||||||||||||||||| header Component ||||||||||||||||||||||||||||||||||||

interface IheaderProps {}

const Header: FC<IheaderProps> = ({}) => {
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
          <a href="/signin">Connexion</a>
        </li>
      </ul>
    </header>
  );
};
export default Header;
