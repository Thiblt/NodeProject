// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import { NextResponse } from "next/server";
import axios from "axios";
import { NextApiRequest } from "next";

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const GET = async (req: NextApiRequest) => {
    const { idBar } = req.query
    console.log(idBar)
  try {
    const data = await axios
      /* 
      .post(
        "http://localhost:3001/order",
        {},
        { headers: { Authorization: "Bearer " } }
      ) 
      */

      .get("http://localhost:3001/orders/bars/" +idBar, )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(() => {
        return null;
      });
    if (!data) {
      return NextResponse.json(null);
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.error();
  }
};