import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Card, Select } from "antd";
import openNotification from "@/modules/Notification";
import { ColorMarker } from "@/constant/ColorMarkerConstaint";

import {
  ADMIN_CURRENT_PAGE_CATEGORY_LIST,
  ADMIN_CURRENT_PAGE_PLACE_LIST,
  ADMIN_MENU_KEY_TAB_CATEGORY,
  ADMIN_MENU_KEY_TAB_PLACE,
} from "@/constant/AdminConstant";
import Axios from "@/modules/axios";
import { MapType, MarkerType } from "@/models/MarkerType";
import { CategoryType } from "@/models/CategoryType";
import IconContext from "@ant-design/icons/lib/components/Context";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
interface ChildComponentProps {
  onChangeView: (menu_Tab_Key: string, currentPageKey: string) => void;
  id: any;
}

const { Option } = Select;

const CreateCategory = (props: ChildComponentProps) => {
  const [form] = Form.useForm();
  const [places, setPlaces] = useState<MapType>([]);
  const [category, setCategory] = useState<CategoryType>({
    name: "",
    iconColor: "",
    iconColorText: "",
    _id: null,
    markers: [],
    places: [],
    markerText: "",
  });

  useEffect(() => {
    const getAllPlaces = async () => {
      await Axios.get("/api/places")
        .then((res) => {
          setPlaces(res.data);
        })
        .catch((err) => {
          console.log("Error from ShowBookList");
        });
    };
    const initData = async () => {
      if (props.id != null)
        await Axios.get(`/api/categories/${props.id}`)
          .then((res) => {
            form.setFieldValue("name", res.data.name);
            form.setFieldValue("iconColor", res.data.iconColor);
            form.setFieldValue("marker_ids", res.data.places);
          })
          .catch((err) => console.log(err));
    };
    getAllPlaces();
    initData();
  }, []);
  const onFinish = async (values: any) => {
    category.name = values.name;
    category.markers = values.marker_ids;
    category.iconColor = values.iconColor;
    console.log(category.iconColorText)
    // setCategory(values);
    if (props.id === null) {
      Axios.post("/api/categories", category)
        .then((res) => {
          openNotification("MarkerMap", `Crete category successfully`);
          props.onChangeView(
            ADMIN_MENU_KEY_TAB_CATEGORY,
            ADMIN_CURRENT_PAGE_CATEGORY_LIST
          );
        })
        .catch((err) => {
          console.log("Error!" + err);
        });
    } else {
      Axios.put(`/api/categories/${props.id}`, category)
        .then((res) => {
          openNotification("MarkerMap", `Update place successfully`);
          props.onChangeView(
            ADMIN_MENU_KEY_TAB_CATEGORY,
            ADMIN_CURRENT_PAGE_CATEGORY_LIST
          );
        })
        .catch((err) => {
          console.log("Error!" + err);
        });
    }
  };
  function onChangeColor(value : any) {
    const option = ColorMarker.find((option) => option.value === value);
    category.iconColorText = option ? option.label : ""
  }
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Card title={props.id === null ? "Thêm mới" : "Cập nhật"}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={category}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng thêm tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Nhà thờ" name="marker_ids">
            <Select
              showSearch
              mode="multiple"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
            >
              {places.map((place) => (
                <Option key={place._id} value={place._id}>
                  {place.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Màu sắc"
            name="iconColor"
            rules={[{ required: true, message: "Vui lòng thêm màu sắc" }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              onChange={onChangeColor}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={ColorMarker}
            ></Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button
              type="primary"
              onClick={() =>
                props.onChangeView(
                  ADMIN_MENU_KEY_TAB_CATEGORY,
                  ADMIN_CURRENT_PAGE_CATEGORY_LIST
                )
              }
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};
export default CreateCategory;
