// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = { id_bar: string };
// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const PUT = async (
  req: NextRequest,
  context: { params: Params },
  modifBar: any
) => {
  try {
    const id_bar = context.params.id_bar;

    const data = await axios
      .put(
        `http://localhost:3000/bars/${id_bar}`,
        {
          data: "data",
        },
        {
          headers: {
            Authorization: "Bearer ",
          },
        }
      )
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
