import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import type { AppProps } from "next/app";
import AuthWrapper from "../context/AuthContext";
import CartWrapper from "../context/CartContext";
import WishlistWrapper from "../context/WishlistContext";
import SnackbarWrapper from "../context/SnackbarContext";
import GroupProductWrapper from "../context/GroupProductContext";
import { Facebook, ScrollToTop } from "../components";
import NextNProgress from "nextjs-progressbar";
// EAAFZBavrYXXUBADQdpRUPXa4ZATs4x9KO7etoWCrgLUHwiCgFaiXqzneIj3shrEphnRljqJL9jGZAoyBA3rCu3PWYqtumJ39fvZALw4pSu013HCMXcmtJ54DYFvyYrRMbG5r7iR1SAseYRQN0ZBqXUiWCag5VgZC4nCniQFO6EG2VOg0qu3V39
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarWrapper>
      <AuthWrapper>
        <CartWrapper>
          <WishlistWrapper>
            <GroupProductWrapper>
              <>
                <ScrollToTop />
                <NextNProgress
                  color="var(--logo-bg-color)"
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={3}
                  showOnShallow={true}
                />
                {/* <Facebook /> */}
                <Component {...pageProps} />
              </>
            </GroupProductWrapper>
          </WishlistWrapper>
        </CartWrapper>
      </AuthWrapper>
    </SnackbarWrapper>
  );
}
