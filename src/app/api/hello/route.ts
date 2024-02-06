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
        description: "Welcome to the api route, here are the available routes",
        data: {
          User: [
            {
              route: "user",
              method: "GET",
              description: "Returns a list of users",
            },
            {
              route: "user/one?id=$id",
              method: "GET",
              description: "Returns a single user",
            },
            {
              route: "user",
              method: "POST",
              description: "Creates a new user",
              body: {
                name: "string",
                username: "string",
                password: "string",
                role: "string",
              },
            },
            {
              route: "user?id=$id",
              method: "DELETE",
              description: "Deletes a user",
            },
          ],
          Auth: [
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
