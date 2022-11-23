import Head from "next/head";
import React from "react";
import { AccountLayout } from "../../layouts";

type Props = {};

const FollowOrder = (props: Props) => {
  return (
    <AccountLayout titleHeading="Đơn hàng của tôi">
      <>
        <Head>
          <title>Đơn hàng của tôi</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
    </AccountLayout>
  );
};

export default FollowOrder;