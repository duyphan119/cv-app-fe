import { Container, Grid } from "@mui/material";
import React from "react";
import DefaultLayout from "../DefaultLayout";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children?: React.ReactNode;
  onSort?: any;
  totalProducts: number;
};

const ProductsLayout = (props: Props) => {
  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <Header onSort={props.onSort} totalProducts={props.totalProducts} />
          </Grid>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            {props.children}
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default ProductsLayout;
