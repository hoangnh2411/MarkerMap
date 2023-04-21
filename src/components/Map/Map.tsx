"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, marker } from "leaflet";
import { useEffect, useState } from "react";
import Axios from "../../modules/axios";

import { CategoriesType } from "@/models/CategoryType";
import { Button, Drawer, Space, Tooltip, Tree } from "antd";
import {
  CaretLeftOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { DataNode } from "antd/es/tree";
const Map = () => {
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [categoriesShow, setCategoriesShow] = useState<CategoriesType>([]);
  const [visible, setVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [categoriesData, setCategoriesData] = useState<DataNode[]>([]);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const getData = async () =>
    await Axios.get("/api/categories")
      .then((res) => {
        setCategories(res.data);
        setCategoriesShow(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {}, [categories]);

  useEffect(() => {
    setCategoriesShow(
      categories.map((category) => ({
        ...category,
        places: category.places?.filter((place) =>
          selectedKeys.includes(place._id)
        ),
      }))
    );
  }, [selectedKeys]);
  useEffect(() => {
    setCategoriesData(
      categories.map((category) => ({
        title: category.name,
        key: category._id,
        children: category.places?.map((place) => ({
          title: place.name,
          key: place._id,
        })),
      }))
    );
  }, [categories]);

  const customIcon = (imageUrl: string) =>
    new Icon({
      iconUrl: imageUrl,
      iconSize: [60, 60], // Size
      className: "color-red",
    });
  const defaultCheckedKeys = categoriesData.flatMap((node) => node.key);
  return (
    <div>
      <Drawer
        title="Danh sách"
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
        extra={
          <Space>
            <Button onClick={onClose} icon={<CaretLeftOutlined />}></Button>
          </Space>
        }
      >
        <>
          {/* Drawer content */}
          <Tree
            checkable
            defaultCheckedKeys={defaultCheckedKeys}
            onCheck={(checkedKeys) => {
              setSelectedKeys(checkedKeys as string[]);
            }}
            treeData={categoriesData}
          />
        </>
      </Drawer>
      <MapContainer
        zoomControl={false}
        style={{ width: "100%", height: "100vh" }}
        center={[21.0278, 105.8342]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        <ZoomControl position="topright"></ZoomControl>
        <Button
          onClick={showDrawer}
          className="leaflet-control leaflet-bar"
          style={{ backgroundColor: "#1677ff" }}
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
        />
        {categoriesShow.map((market) =>
          market.places?.map((place) => (
            <Marker
              key={place._id}
              position={[place.lat_code, place.lng_code]}
              icon={customIcon(`./church_${market.iconColor}.png`)}
            >
              <Popup>
                <div style={{ width: "100%", justifyContent: "center",textAlign: "center" }}>
                  <p>
                    <strong>{place.name}</strong>
                  </p>
                  <p>{place.address}</p>
                  <div>
                    <Button
                      shape="circle"
                      icon={<GlobalOutlined style={{verticalAlign: "0.125rem"}}/>}
                      onClick={() => window.open(place.website_link, "_blank")}
                    />
                    <Button
                      shape="circle"
                      icon={<GlobalOutlined style={{verticalAlign: "0.125rem"}}/>}
                      onClick={() => window.open(`https://www.google.com/maps/dir//${place.name}`, "_blank")}
                    />
                    <Tooltip title={place.phone_number}>
                      <Button
                        shape="circle"
                        icon={<PhoneOutlined style={{verticalAlign: "0.125rem"}} />}
                      />
                    </Tooltip>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
