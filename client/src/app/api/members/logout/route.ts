// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const GET = async (req: NextRequest) => {
  try {
    const refresh_token = cookies().get("refresh_token")?.value;
    if (!refresh_token)
      return NextResponse.json({ status: 401, message: "Error: Unauthorized" });

    cookies().delete("refresh_token");
    return NextResponse.json({
      status: 200,
      message: "Success: Request successfully completed",
    });
  } catch (e) {
    return NextResponse.error();
  }
};
