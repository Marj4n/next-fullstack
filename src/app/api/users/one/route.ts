import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const users = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    return NextResponse.json(
      {
        users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      }
    );
  }
}
