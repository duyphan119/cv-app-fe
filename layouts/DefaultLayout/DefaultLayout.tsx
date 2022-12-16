import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./style.module.css";

type Props = {
  children?: ReactNode;
};

const DefaultLayout = (props: Props) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ padding: "16px 0", flex: 1 }}>{props.children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
