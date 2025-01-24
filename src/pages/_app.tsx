import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutRoutes = ["/auth/login", "/auth/register"];
  const isNoLayoutPage = noLayoutRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        {isNoLayoutPage ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        )}
      </CartProvider>
    </AuthProvider>
  );
}
