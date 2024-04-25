// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||
export const GET = async (req: NextRequest) => {
  try {
    const refresh_token = cookies().get("refresh_token")?.value;
    if (!refresh_token) return NextResponse.json({ status: 401 });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
};
