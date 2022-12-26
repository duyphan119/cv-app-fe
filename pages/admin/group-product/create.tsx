import { Button, Grid, Paper } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import {
  createGroupProduct,
  CreateGroupProductDTO,
  getAllGroupProducts,
} from "../../../apis/groupProduct";
import { uploadSingle } from "../../../apis/upload";
import { AdminLayout } from "../../../layouts";
import { MSG_SUCCESS } from "../../../utils/constants";
import { GroupProduct } from "../../../utils/types";

type Props = {};

const AddGRoupProduct = (props: Props) => {
  const router = useRouter();
  const [files, setFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupProductDTO>();
  const onSubmit: SubmitHandler<CreateGroupProductDTO> = async (data) => {
    try {
      let url = "";
      if (files) {
        const formData = new FormData();
        formData.append("image", files[0]);
        const { message, data: dataImage } = await uploadSingle(formData);
        if (message === MSG_SUCCESS) {
          console.log("Uploaded file: ", dataImage);
          url = dataImage.secure_url;
        }
      }
      const { message: msg } = await createGroupProduct({
        ...data,
        ...(url !== "" ? { thumbnail: url } : {}),
      });
      if (msg === MSG_SUCCESS) {
        router.push("/admin/group-product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <AdminLayout pageTitle="Nhóm sản phẩm">
      <>
        <Head>
          <title>Thêm mới nhóm sản phẩm</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Paper sx={{ padding: "16px" }}>
          <div
            style={{ fontSize: "2rem", fontWeight: "600", marginBottom: 16 }}
          >
            Thông tin thêm nhóm mới sản phẩm
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <div className="form-group">
                  {errors.name && errors.name.type === "required" && (
                    <div className="form-error">Tên không được để trống</div>
                  )}
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    autoComplete="off"
                    {...register("name")}
                  />
                  <label htmlFor="name" className="form-label required">
                    Tên nhóm sản phẩm
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="form-group">
                  <input
                    type="text"
                    id="slug"
                    className="form-control"
                    autoComplete="off"
                    {...register("slug")}
                  />
                  <label htmlFor="slug" className="form-label">
                    Bí danh
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="form-group">
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    autoComplete="off"
                    {...register("description")}
                  />
                  <label htmlFor="description" className="form-label">
                    Mô tả
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="form-group">
                  <input
                    type="file"
                    id="thumbnail"
                    className="form-control"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFiles(e.target.files)
                    }
                  />
                  <label htmlFor="thumbnail" className="form-label">
                    Ảnh đại diện
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ marginLeft: 8 }}
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </>
    </AdminLayout>
  );
};

export default AddGRoupProduct;