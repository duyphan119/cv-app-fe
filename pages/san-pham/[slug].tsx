import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { getAllProducts } from "../../apis/product";
import { ProductInfo } from "../../components";
import { getListProducts } from "../../dummyData";
import { DefaultLayout } from "../../layouts";
import styles from "../../styles/ProductDetail.module.css";
import { CODE_OK, MSG_SUCCESS } from "../../utils/constants";
import { Product } from "../../utils/types";
type Props = {
  product: Product;
};

const ProductDetail = (props: Props) => {
  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{getListProducts(1)[0].name}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxWidth="lg">
          <div className={styles.body}>
            <ProductInfo product={props.product} />
          </div>
        </Container>
      </>
    </DefaultLayout>
  );
};
export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const res = await getAllProducts({ slug });
  const { code, message, data } = res;
  return code === CODE_OK || message === MSG_SUCCESS
    ? {
        props: { product: data.items[0] },
      }
    : {
        notFound: true,
      };
}

export default ProductDetail;