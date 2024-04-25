import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const GET = async (req: NextRequest) => {
  try {
    const data = await axios
      /* 
      .post(
        "http://localhost:3001/bars",
        {},
        { headers: { Authorization: "Bearer " } }
      ) 
      */

      .get(`http://localhost:3001/beers/bars/`)
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
