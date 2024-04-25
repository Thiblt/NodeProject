// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import { useAxiosPrivate, useAxiosServer } from "@/hooks/axios.hook";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const GET = async (req: NextRequest) => {
  try {
    const refreshToken = cookies().get("refresh_token")?.value;
    const { nom, adress, telephone, description, mail } = await req.json();
    if (!refreshToken) {
      return NextResponse.json({ status: 400 });
    }
    const accesToken = await useAxiosServer
      .get("/members/access")
      .then((res) => {
        if (res.data.data) return res.data.data;
        else return null;
      })
      .catch(() => null);
    if (!accesToken) {
      return NextResponse.json({ status: 400 });
    }
    await useAxiosPrivate
      .post("/bars", {
        name: nom,
        adresse: adress,
        tel: telephone,
        email: mail,
        description: description,
      })
      .then(() => {
        return NextResponse.json({ message: "ok" });
      });
    return NextResponse.next();
  } catch (e) {
    return NextResponse.error();
  }
};
