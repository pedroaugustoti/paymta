import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Deixamos o controle de visualização de abas ser feito na interface (Client/Server Components)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};