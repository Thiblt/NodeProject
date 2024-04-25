// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import axios from "axios";
import { FC, useEffect, useState } from "react";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface OrderpageProps {}

const OrderPage: FC<OrderpageProps> = ({}) => {
//   const [bars, setBars] = useState<OrderpageProps | null>(null);
//   const data = async () => {
//     await axios
//       .get("http://localhost:3000/api/bars")
//       .then((response) => {
//         setBars(response.data);
//         return response.data;
//       })
//       .catch(() => {
//         return null;
//       });
//   };

//   useEffect(() => {
//     data();
//   }, []);

  return (
    <div>
      <p>page Component</p>
    </div>
  );
};
export default OrderPage;
