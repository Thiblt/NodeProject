"use client";
// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import Layout from "@/layouts/layout";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import LinkButton from "@/components/linkButton";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface IpageProps {}
interface IBars {
  message?: string;
  data?: any[];
}

const HomeBar: FC<IpageProps> = ({}) => {
  const [bars, setBars] = useState<IBars | null>(null);
  const data = async () => {
    await axios
      .get("http://localhost:3000/api/bars")
      .then((response) => {
        setBars(response.data);
        return response.data;
      })
      .catch(() => {
        return null;
      });
  };

  useEffect(() => {
    data();
  }, []); // [] pour eviter le rappel -> lié a React

  // Return
  return (
    <Layout>
      <div className="mt-8 container mx-auto px-8">
        <div className="flex justify-center">
          <LinkButton
            text={"Ajouter un bar"}
            btnAction={`http://localhost:3000/bars/add`}
            colorBg={
              "bg-slate-400 px-6 ring-cyan-900 border-cyan-900 hover:bg-slate-800/80"
            }
          ></LinkButton>
        </div>
        {bars?.data?.map((bar) => {
          return (
            <div
              className="border mt-5 justify-between px-5 flex flex-row mx-auto"
              key={bar.id}
            >
              <div>
                <ul>
                  <li className="uppercase text-2xl">{bar.name}</li>
                  <li className="px-5">Adresse : {bar.adresse}</li>
                  <li className="px-5">Téléphone : {bar.tel}</li>
                </ul>
              </div>
              <div className=" content-center">
                <ul>
                  <li>
                    <LinkButton
                      text={"Modifier"}
                      btnAction={`http://localhost:3000/bars/modify/${bar.id}`}
                      colorBg={
                        "bg-emerald-800 ring-emerald-900 hover:bg-emerald-800/50"
                      }
                    ></LinkButton>
                    <LinkButton
                      text={"Supprimer"}
                      btnAction={`http://localhost:3000/bars/delete/${bar.id}`}
                      colorBg={"bg-red-800 ring-red-900 hover:bg-red-800/50"}
                    ></LinkButton>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
export default HomeBar;
