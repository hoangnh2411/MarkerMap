import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MapType, MarkerType } from "@/models/MarkerType";
import Axios from "@/modules/axios";
import { DownloadOutlined } from "@ant-design/icons";
import openNotification from "@/modules/Notification";
import {
  ADMIN_CURRENT_PAGE_CREATE_PLACE,
  ADMIN_MENU_KEY_TAB_PLACE,
} from "@/constant/AdminConstant";

interface ChildComponentProps {
  onCreateOrUpdate: (
    menu_Tab_Key: string,
    currentPageKey: string,
    _id: any
  ) => void;
}

const PlaceList = (props: ChildComponentProps) => {
  interface DataType {
    key: string;
    name: string;
    lat_code: number;
    lng_code: number;
    //   address: string;
    //   tags: string[];
  }

  const columns: ColumnsType<MarkerType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kinh độ",
      dataIndex: "lat_code",
      key: "lat_code",
    },
    {
      title: "Vĩ độ",
      dataIndex: "lat_code",
      key: "lng_code",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              props.onCreateOrUpdate(
                ADMIN_MENU_KEY_TAB_PLACE,
                ADMIN_CURRENT_PAGE_CREATE_PLACE,
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

  const [markers, setMarkers] = useState<MapType>([]);

  const onCreateOrUpdate = (item: MarkerType) => {
    openNotification("MarkerMap", "Edit successfully");
  };

  const onDelete = (record: MarkerType) => {
    Axios.delete(`http://localhost:8082/api/places/${record._id}`)
      .then((res) => {
        openNotification("MarkerMap", "Xoá thành công");
        getData();
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  };
  const getData = async () =>
    Axios.get("/api/places")
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });

  useEffect(() => {
    getData();
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Card title="Danh sách địa điểm">
        <>
          <Button
            style={{ float: "right" }}
            type="primary"
            onClick={() =>
              props.onCreateOrUpdate(
                ADMIN_MENU_KEY_TAB_PLACE,
                ADMIN_CURRENT_PAGE_CREATE_PLACE,
                null
              )
            }
          >
            Thêm mới
          </Button>
          <Table columns={columns} dataSource={markers} />
        </>
      </Card>
    </Space>
  );
};

export default PlaceList;
