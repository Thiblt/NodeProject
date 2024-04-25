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
interface IBeers {
  name?: string;
  description?: string;
  degree?: string;
  price?: string;
  id_bar?: string;
}

const HomeBeer: FC<IpageProps> = ({}) => {
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
        <label htmlFor="foundBar">Cherchez le bar : </label>
        <select name="foundBar" id="foundBar">
          {bars?.data?.map((bar) => {
            return (
              <option key={bar.id} value={bar.id}>
                {bar.name}
              </option>
            );
          })}
        </select>
      </div>
    </Layout>
  );
};

export default HomeBeer;
