"use client"
// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface OrderpageProps {
    id: number
    name: string
    price: number
    id_bar: number
    date: string
    status: string
}

const OrderPage: FC<OrderpageProps> = ({}) => {
    const [barId, setBarId] = useState<number | undefined>(0);
   const [orders, setOrder] = useState<OrderpageProps[] | null>(null);
   const data = async () => {
     await axios
       .get("http://localhost:3000/api/order/" +barId, {
 
   })
      .then((response) => {
        setOrder(response.data);
        return response.data;
       })
       .catch(() => {
         return null;
       });
   };

   useEffect(() => {
     data();
   }, [barId]);

  return (
    <div>
        <form>
     <label htmlFor="name">Id du bar:</label>
<input type="number" id="barId" name="barId" value={barId} onChange={(event) => setBarId(parseInt(event.target.value))}/>
         </form>
         {orders !== null && orders.map( (order: OrderpageProps)=>
        <ul>
          <li>{order.name}</li>
          <li>{order.price}</li>
          <li>{order.date}</li>
          <li>{order.status}</li>
          <li>Supprimer</li>
          <li>Modifier</li>
          <li>Obtenir le pdf</li>

        </ul>
      )}
      <Link href={""}>Ajouter une nouvelle commande</Link>
    </div>
  );
};
export default OrderPage;
