import { Container, Grid, Box } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { getAllProducts } from "../apis/product";
import { ProductCard } from "../components";
import { DefaultLayout } from "../layouts";
import styles from "../styles/Home.module.css";
import { Blog, Product, ResponseItems } from "../utils/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllBlogs } from "../apis/blog";
import { GetServerSidePropsContext } from "next";
import { COOKIE_ACCESSTOKEN_NAME } from "../utils/constants";
import { formatDateTime } from "../utils/helpers";
type ProductsProps = {
  products?: Product[];
};
const Products = (props: ProductsProps) => {
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={2} rowSpacing={2}>
        {props.products?.map((product) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={Math.random() + ""}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
        <Grid item xs={12} className={styles.viewAllWrapper}>
          <Link href="/product" className={styles.viewAll}>
            Xem tất cả sản phẩm
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

type Banner = {
  href: string;
  src: string;
};

type BannersProps = {
  banners?: Banner[];
};

const Banners = (props: BannersProps) => {
  return props.banners ? (
    <Swiper slidesPerView={1}>
      {props.banners.map((banner: Banner) => {
        return (
          <SwiperSlide key={banner.src}>
            <Box
              sx={{ width: "100vw" }}
              // sx={{
              //   height: {
              //     md: "560px",
              //     sm: "460px",
              //     xs: "360px",
              //   },
              //   width: "100%",
              //   overflow: "hidden",
              //   img: {
              //     width: {
              //       md: "1152px",
              //       sm: "900px",
              //       xs: "600px",
              //     },
              //     height: {
              //       md: "560px",
              //       sm: "460px",
              //       xs: "360px",
              //     },
              //   },
              // }}
            >
              <Link href={banner.href}>
                <Image
                  src={banner.src}
                  alt="banner"
                  priority={true}
                  height={560}
                  width={1952}
                />
              </Link>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : null;
};

type BlogProps = {
  blogs: Blog[];
};

const Blogs = (props: BlogProps) => {
  console.log(props.blogs);
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={2} rowSpacing={2}>
        {props.blogs.map((blog: Blog) => {
          return (
            <Grid item xs={12} md={4} key={blog.id}>
              <Link
                href={`/blog/${blog.slug}`}
                className={styles.blogThumbnail}
              >
                <Image
                  fill={true}
                  sizes="(max-width: 768px) 1vw"
                  src={blog.thumbnail}
                  alt=""
                  priority={true}
                />
              </Link>
              <Link href={`/blog/${blog.slug}`} className={styles.blogTitle}>
                {blog.title}
              </Link>
              <div className={styles.blogCreatedAt}>
                {formatDateTime(blog.createdAt)}
              </div>
            </Grid>
          );
        })}
        <Grid item xs={12} className={styles.viewAllWrapper}>
          <Link href="/blog" className={styles.viewAll}>
            Xem tất cả bài viết
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

type Props = {
  productData: ResponseItems<Product>;
  blogData: ResponseItems<Blog>;
};
export default function Home({ productData, blogData }: Props) {
  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Trang chủ</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Banners
            banners={[
              {
                href: "/",
                src: "https://i.pinimg.com/564x/b1/56/4e/b1564ef9b4e80b4bfd0af03222f1d80a.jpg",
              },
              {
                href: "/",
                src: "https://i.pinimg.com/564x/59/40/f7/5940f78b70d9b751e968c612a7e3aa90.jpg",
              },
            ]}
          />

          <h1 className={styles.h1}>Sản phẩm mới</h1>
          <Products products={productData.items} />
          <h1 className={styles.h1}>Bài viết</h1>
          <Blogs blogs={blogData.items} />
        </main>
      </>
    </DefaultLayout>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const [{ data: productData }, { data: blogData }] = await Promise.all([
      getAllProducts({
        limit: 24,
        product_variants: true,
        images: true,
      }),
      getAllBlogs(
        {
          limit: 3,
        },
        context.req.cookies[COOKIE_ACCESSTOKEN_NAME]
      ),
    ]);
    return {
      props: {
        productData,
        blogData,
      },
    };
  } catch (error) {
    return {
      props: {
        productData: { items: [], count: 0, totalPages: 0 },
        blogData: { items: [], count: 0, totalPages: 0 },
      },
    };
  }
}
