// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import { cookies } from "next/headers";
import { useAxiosServer } from "@/hooks/axios.hook";
import { NextRequest, NextResponse } from "next/server";

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const refresh_token = await useAxiosServer
      .post("members/signup", {
        email,
        pwd: password,
      })
      .then((res) => {
        if (res.status !== 200) return null;
        return res.data.data;
      })
      .catch((e) => null);

    if (!refresh_token)
      return NextResponse.json({
        status: 401,
        message: "Error: l'email ou le mot de passe est incorrect",
      });

    cookies().set("refresh_token", refresh_token, {
      // httpOnly: true,
    });
    return NextResponse.json({
      status: 200,
      message: "Success: Request successfully completed",
    });
  } catch (e) {
    return NextResponse.error();
  }
};
