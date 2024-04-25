// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||,
import { NextRequest, NextResponse } from "next/server"

// ||||||||||||||||||||||||||||| Route ||||||||||||||||||||||||||||||||||||,
export const GET = async (req: NextRequest) => {
try{
  return NextResponse.next();
}
catch(e){
  return NextResponse.error();
}
}