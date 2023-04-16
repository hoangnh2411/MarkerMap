import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Axios from "@/modules/axios";
import { DownloadOutlined } from "@ant-design/icons";
import openNotification from "@/modules/Notification";
import {
  ADMIN_CURRENT_PAGE_CREATE_CATEGORY,
  ADMIN_MENU_KEY_TAB_CATEGORY,
} from "@/constant/AdminConstant";
import { CategoriesType, CategoryType } from "@/models/CategoryType";
import { MarkerType } from "@/models/MarkerType";

interface ChildComponentProps {
  onCreateOrUpdate: (
    menu_Tab_Key: string,
    currentPageKey: string,
    _id: any
  ) => void;
}

const CateogoryList = (props: ChildComponentProps) => {
  const columns: ColumnsType<CategoryType> = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Màu sắc",
      dataIndex: "iconColorText",
      key: "iconColorText",
    },
    {
      title: "DS nhà thờ",
      dataIndex: "iconColor",
      key: "iconColor",
      render: (_, record) => (
        <Space size="middle">
          {record.places?.map((place: MarkerType): any => {
            return <Tag key={place._id}>{place.name}</Tag>;
          })}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              props.onCreateOrUpdate(
                ADMIN_MENU_KEY_TAB_CATEGORY,
                ADMIN_CURRENT_PAGE_CREATE_CATEGORY,
                record._id
              )
            }
            icon={<DownloadOutlined />}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(record)}
            icon={<DownloadOutlined />}
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [categories, setCategories] = useState<CategoriesType>([]);
  const [markersText, setMarkersText] = useState<string>("");
  const onDelete = (record: CategoryType) => {
    Axios.delete(`/api/categories/${record._id}`)
      .then((res) => {
        openNotification("MarkerMap", "Xoá thành công");
        getData();
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  };
  const getData = async () =>
    Axios.get("/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });

  useEffect(() => {
    getData();
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Card title="Danh sách">
        <Button
          style={{ float: "right" }}
          type="primary"
          onClick={() =>
            props.onCreateOrUpdate(
              ADMIN_MENU_KEY_TAB_CATEGORY,
              ADMIN_CURRENT_PAGE_CREATE_CATEGORY,
              null
            )
          }
        >
          Thêm mới
        </Button>
        <Table columns={columns} dataSource={categories} />
      </Card>
    </Space>
  );
};

export default CateogoryList;
