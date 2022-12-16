import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  deleteGroupProduct,
  getAllGroupProducts,
  restoreGroupProduct,
  softDeleteGroupProduct,
} from "../../../apis/groupProduct";
import { ConfirmDialog, DataManagement } from "../../../components";
import { AdminLayout } from "../../../layouts";
import { MSG_SUCCESS } from "../../../utils/constants";
import { formatDateTime } from "../../../utils/helpers";
import { GroupProduct, ResponseItems } from "../../../utils/types";

type Props = {
  groupProductData: ResponseItems<GroupProduct>;
};
const LIMIT = 10;
const ProductCategories = (props: Props) => {
  const [groupProductData, setGroupProductData] = useState<
    ResponseItems<GroupProduct>
  >(props.groupProductData);
  const [current, setCurrent] = useState<GroupProduct | null>(null);

  const handleSoftDelete = async (id: number) => {
    try {
      const { message } = await softDeleteGroupProduct(id);
      if (message === MSG_SUCCESS) {
        const _groupProductData = { ...groupProductData };
        const index = _groupProductData.items.findIndex(
          (gp: GroupProduct) => gp.id === id
        );
        if (index !== -1) {
          _groupProductData.items[index].deletedAt = "" + new Date().getTime();
          setGroupProductData(_groupProductData);
        }
      }
    } catch (error) {
      console.log("Soft delete group product error", error);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      const { message } = await restoreGroupProduct(id);
      if (message === MSG_SUCCESS) {
        const _groupProductData = { ...groupProductData };
        const index = _groupProductData.items.findIndex(
          (gp: GroupProduct) => gp.id === id
        );
        if (index !== -1) {
          _groupProductData.items[index].deletedAt = null;
          setGroupProductData(_groupProductData);
        }
      }
    } catch (error) {
      console.log("Restore delete group product error", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (current) {
        let { id } = current;
        const { message } = await deleteGroupProduct(id);
        if (message === MSG_SUCCESS) {
          const _groupProductData = { ...groupProductData };
          _groupProductData.items = _groupProductData.items.filter(
            (gp: GroupProduct) => gp.id !== id
          );
          _groupProductData.count -= 1;
          setGroupProductData(_groupProductData);
        }
      }
    } catch (error) {
      console.log("Delete group product error", error);
    }
  };

  useEffect(() => {
    setGroupProductData(props.groupProductData);
  }, [props.groupProductData]);

  return (
    <AdminLayout pageTitle="Nhóm sản phẩm">
      <>
        <Head>
          <title>Quản lý nhóm sản phẩm</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DataManagement
          paperTitle="Danh sách nhóm sản phẩm"
          sortBys={[
            {
              display: "Tên",
              value: "name",
            },
            {
              display: "Bí danh",
              value: "slug",
            },
          ]}
          rows={groupProductData.items}
          count={groupProductData.count}
          limit={LIMIT}
          hasCheck={true}
          columns={[
            {
              style: { width: 70, textAlign: "center" },
              display: "#",
              key: "index",
            },
            {
              style: { textAlign: "left" },
              key: "name",
              display: "Tên nhóm sản phẩm",
              render: (row: GroupProduct) => (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  {row.thumbnail ? (
                    <div>
                      <Image
                        alt=""
                        width={72}
                        height={72}
                        priority={true}
                        src={row.thumbnail}
                      />
                    </div>
                  ) : null}
                  {row.name}
                </div>
              ),
            },
            {
              style: { textAlign: "left" },
              key: "slug",
              display: "Bí danh",
            },
            {
              style: { width: 180, textAlign: "center" },
              key: "createdAt",
              display: "Ngày tạo",
              render: (row: GroupProduct) => formatDateTime(row.createdAt),
            },
            {
              style: { width: 90, textAlign: "center" },
              key: "deletedAt",
              display: "Hiển thị",
              render: (row: GroupProduct) =>
                row.deletedAt ? (
                  <ClearIcon
                    style={{ color: "#d32f2f" }}
                    onClick={() => handleRestore(row.id)}
                  />
                ) : (
                  <CheckIcon
                    style={{ color: "#33eb91" }}
                    onClick={() => handleSoftDelete(row.id)}
                  />
                ),
            },
            {
              style: { width: 100 },
              key: "actions",
              render: (row: GroupProduct) => (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link href={`/admin/nhom-san-pham/${row.id}/sua`}>
                      <button className="btnEdit">Sửa</button>
                    </Link>
                    <button
                      className="btnDelete"
                      style={{ marginLeft: "8px" }}
                      onClick={() => setCurrent(row)}
                    >
                      Xóa
                    </button>
                  </div>
                  {current ? (
                    <ConfirmDialog
                      open={current.id === row.id ? true : false}
                      onClose={() => setCurrent(null)}
                      onConfirm={handleDelete}
                      title="Xác nhận"
                      text="Bạn có chắc chắn muốn xóa không?"
                    />
                  ) : null}
                </>
              ),
            },
          ]}
        />
      </>
    </AdminLayout>
  );
};

export default ProductCategories;

export async function getServerSideProps(context: any) {
  console.log(context.query);
  const { p, sort_by, sort_type } = context.query;
  const res = await getAllGroupProducts({
    p: p || 1,
    limit: LIMIT,
    sort_by,
    sort_type,
    withDeleted: true,
  });
  const { message, data } = res;
  return message === MSG_SUCCESS
    ? {
        props: { groupProductData: data },
      }
    : {
        notFound: true,
      };
}
