"use client";
// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import Layout from "@/layouts/layout";
import { FC, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import LinkButton from "@/components/linkButton";
import { useAxios } from "@/hooks/axios.hook";
import FormBar from "@/components/formModal";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface IpageProps {}
interface IBars {
  message?: string;
  data?: any[];
}

const HomeBar: FC<IpageProps> = ({}) => {
  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    await useAxios
      .post("/bars/add", {
        nom,
        adress,
        telephone,
        description,
        mail,
      })
      .then((res) => {
        if (res.data.status === 200) setShowModal(false);
      });
  };
  const [bars, setBars] = useState<IBars | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [nom, setNom] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [mail, setMail] = useState<string>("");

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
      {showModal && (
        <FormBar
          data={{
            nom: { value: nom, setNom },
            adress: { value: adress, setAdress },
            description: { value: description, setDescription },
            mail: { value: mail, setMail },
            telephone: { value: telephone, setTelephone },
          }}
          onClick={handleAdd}
        ></FormBar>
      )}
      <div className="mt-8 container mx-auto px-8">
        <div className="flex justify-center">
          <LinkButton
            text={"Ajouter un bar"}
            colorBg={
              "bg-slate-400 px-6 ring-cyan-900 border-cyan-900 hover:bg-slate-800/80"
            }
            onClick={() => {
              setShowModal(!showModal);
            }}
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
                      colorBg={
                        "bg-emerald-800 ring-emerald-900 hover:bg-emerald-800/50"
                      }
                    ></LinkButton>
                    <LinkButton
                      text={"Supprimer"}
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
