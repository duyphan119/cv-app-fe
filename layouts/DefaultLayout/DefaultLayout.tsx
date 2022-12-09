import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./style.module.css";

type Props = {
  children?: ReactNode;
};

const DefaultLayout = (props: Props) => {
  return (
    <>
      <Header />
      <div>
        <div style={{ padding: "16px 0" }}>{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
