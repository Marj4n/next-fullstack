import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
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
