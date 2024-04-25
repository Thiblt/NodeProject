// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const GET = async (req: NextRequest) => {
  try {
    const data = await axios
      /* 
      .post(
        "http://localhost:3001/order",
        {},
        { headers: { Authorization: "Bearer " } }
      ) 
      */

      .get("http://localhost:3001/order")
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