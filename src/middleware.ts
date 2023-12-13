export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/api/hello",
    "/api/users/:path*",
    "/app/:path*",
    "/other/:path*",
    "/help/:path*",
  ],
};
