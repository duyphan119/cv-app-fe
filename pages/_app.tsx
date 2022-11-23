import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import type { AppProps } from "next/app";
import AuthWrapper from "../context/AuthContext";
import CartWrapper from "../context/CartContext";
import WishlistWrapper from "../context/WishlistContext";
import SnackbarWrapper from "../context/SnackbarContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthWrapper>
      <CartWrapper>
        <WishlistWrapper>
          <SnackbarWrapper>
            <Component {...pageProps} />
          </SnackbarWrapper>
        </WishlistWrapper>
      </CartWrapper>
    </AuthWrapper>
  );
}
