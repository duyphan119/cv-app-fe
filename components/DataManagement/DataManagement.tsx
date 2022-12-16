import React, { useState, FormEvent, CSSProperties, ReactNode } from "react";
import { Box, Button, Pagination, Paper } from "@mui/material";
import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type SortBy = {
  display: string;
  value: string;
};

type Column = { key: string } & Partial<{
  style: CSSProperties;
  className: string;
  display: string;
  render: any;
}>;

type Props = Partial<{
  paperTitle: string;
  sortBys: SortBy[];
  columns: Column[];
  hasCheck: boolean;
  rows: any[];
  count: number;
  limit: number;
}>;

const DataManagement = (props: Props) => {
  const router = useRouter();
  const { p } = router.query;
  const [page, setPage] = useState<number>(p ? +p : 1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortType, setSortType] = useState<string>("asc");
  const handleSort = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj: any = {
      ...(page && page > 1 ? { p: page } : {}),
      sort_by: sortBy,
      sort_type: sortType,
    };
    const url = new URLSearchParams(obj).toString();
    url && router.push(router.pathname + "?" + url);
  };
  const showRow = (column: Column, row: any, index: number) => {
    if (column.render) {
      return column.render(row);
    }
    if (column.key === "index") {
      return index + 1;
    }

    return row[column.key];
  };
  const handleChange = (p: number) => {
    const obj: any = {
      ...(page && page > 1 ? { p: page } : {}),
      ...(sortBy !== "" ? { sort_by: sortBy, sort_type: sortType } : {}),
    };
    const url = new URLSearchParams(obj).toString();
    url && router.push(router.pathname + "?" + url);
  };
  return (
    <Paper className={styles.paper}>
      <div className={styles.paperTitle}>{props.paperTitle || "Tiêu đề"}</div>
      <Box className={styles.actionsWrapper}>
        <Box className={styles.actionsWrapperLeft}>
          <div className={styles.searchWrapper}>
            <input type="search" placeholder="Tìm theo tên" />
            <button className="btnSearch">Tìm</button>
          </div>
          <form className={styles.sortForm} onSubmit={handleSort}>
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="">Sắp xếp theo</option>
              {props.sortBys?.map((sb: SortBy) => (
                <option key={sb.value + ""} value={sb.value}>
                  {sb.display}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
            <button className="btnSort" type="submit" disabled={sortBy === ""}>
              Sắp xếp
            </button>
          </form>
        </Box>
        <Box>
          <Link href={router.pathname + "/them"}>
            <button className="btnAdd">Thêm mới</button>
          </Link>
        </Box>
      </Box>
      <table className="table">
        <thead>
          <tr>
            {props.hasCheck ? (
              <th style={{ width: 40 }}>
                <label htmlFor="checkAll">
                  <input type="checkbox" id="checkAll" />
                </label>
              </th>
            ) : null}
            {props.columns?.map((column: Column) => (
              <th
                key={column.key || column.display}
                style={column.style}
                className={column.className}
              >
                {column.display}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows?.map((row: any, index: number) => {
            return (
              <tr key={row.id}>
                {props.hasCheck ? (
                  <td>
                    <label htmlFor={"check" + row.id}>
                      <input type="checkbox" id={"check" + row.id} />
                    </label>
                  </td>
                ) : null}
                {props.columns?.map((column: Column) => (
                  <td key={column.key} style={column.style}>
                    {showRow(column, row, index)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        page={page}
        count={
          props.count && props.limit ? Math.ceil(props.count / props.limit) : 0
        }
        sx={{ ul: { justifyContent: "center", marginTop: "16px" } }}
        variant="outlined"
        shape="rounded"
        showLastButton
        showFirstButton
        onChange={(e, page) => handleChange(page)}
        color="primary"
      />
    </Paper>
  );
};

export default DataManagement;
