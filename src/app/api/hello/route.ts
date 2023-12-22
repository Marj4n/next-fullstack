import { isLogin } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!isLogin(req)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    return NextResponse.json(
      {
        message: "Hello World",
        description: "Welcome to the api route",
        data: [
          {
            route: "users",
            method: "GET",
            description: "Returns a list of users",
          },
          {
            route: "users?id=$id",
            method: "GET",
            description: "Returns a single user",
          },
          {
            route: "register",
            method: "POST",
            description: "Registers a new user",
            body: {
              name: "string",
              username: "string",
              password: "string",
              confirmPass: "string",
            },
          },
        ],
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      }
    );
  }
}
