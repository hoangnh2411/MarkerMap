import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Space,
  Card,
} from "antd";
import axios from "axios";
import openNotification from "@/modules/Notification";

import {
  ADMIN_CURRENT_PAGE_PLACE_LIST,
  ADMIN_MENU_KEY_TAB_PLACE,
} from "@/constant/AdminConstant";
import Axios from "@/modules/axios";
import { MarkerType } from "@/models/MarkerType";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
interface ChildComponentProps {
  onChangeView: (menu_Tab_Key: string, currentPageKey: string) => void;
  id: any;
}

const CreatePlace = (props: ChildComponentProps) => {
  const [form] = Form.useForm();
  const [searchResult, setSearchResult] = React.useState<any>(null);

  const [place, setPlace] = useState<MarkerType>({
    _id: null,
    lng_code: 0,
    name: "",
    lat_code: 0,
    website_link: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    const initData = async () => {
      if (props.id != null)
        await Axios.get(`/api/places/${props.id}`)
          .then((res) => {
            console.log(res);
            form.setFieldValue("name", res.data.name);
            form.setFieldValue("lat_code", res.data.lat_code);
            form.setFieldValue("lng_code", res.data.lng_code);
            form.setFieldValue("website_link", res.data.website_link);
            form.setFieldValue("phone_number", res.data.phone_number);
            form.setFieldValue("address", res.data.address);
          })
          .catch((err) => console.log(err));
    };
    initData();
  }, []);
  const onFinish = (values: any) => {
    console.log("Success:", values);
    if (props.id === null) {
      Axios.post("/api/places", values)
        .then((res) => {
          console.log(res);
          openNotification("MarkerMap", `Crete place successfully`);
          props.onChangeView(
            ADMIN_MENU_KEY_TAB_PLACE,
            ADMIN_CURRENT_PAGE_PLACE_LIST
          );
        })
        .catch((err) => {
          console.log("Error!" + err);
        });
    } else {
      Axios.put(`/api/places/${props.id}`, values)
        .then((res) => {
          console.log(res);
          openNotification("MarkerMap", `Update place successfully`);
          props.onChangeView(
            ADMIN_MENU_KEY_TAB_PLACE,
            ADMIN_CURRENT_PAGE_PLACE_LIST
          );
        })
        .catch((err) => {
          console.log("Error!" + err);
        });
    }
  };
  const handleSearch = (result: any) => {
    setSearchResult(result);
  };
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Card title={props.id === null ? "Thêm mới" : "Cập nhật"}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={place}
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
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng thêm địa chỉ" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Kinh độ"
            name="lat_code"
            rules={[{ required: true, message: "Vui lòng thêm kinh độ" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Vĩ độ"
            name="lng_code"
            rules={[{ required: true, message: "Vui lòng thêm vĩ độ" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone_number">
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Website" name="website_link">
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button
              type="primary"
              onClick={() =>
                props.onChangeView(
                  ADMIN_MENU_KEY_TAB_PLACE,
                  ADMIN_CURRENT_PAGE_PLACE_LIST
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
export default CreatePlace;
