import React from "react";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <HeaderTop />
      <HeaderBottom />
    </header>
  );
};

export default Header;
