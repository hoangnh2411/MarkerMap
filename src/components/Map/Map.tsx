"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, marker } from "leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import { MapType } from "../../models/MarkerType";
import Axios from "../../modules/axios";
import { CategoriesType } from "@/models/CategoryType";
const Map = () => {
  const [categories, setCategories] = useState<CategoriesType>([]);
  const getData = () =>
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

  const customIcon = (imageUrl: string) =>
    new Icon({
      // iconUrl: "https://cdn-icons-png.flaticon.com/512/8996/8996813.png",
      iconUrl: imageUrl,
      iconSize: [60, 60], // Size
      // iconColor: [100, 100, 100, 0]
      className: "color-red",
    });

  return (
    <MapContainer
      style={{ width: "100%", height: "100vh" }}
      center={[21.0278, 105.8342]}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {/* <Marker icon={customIcon} position={[21.02861, 105.8489]}>
        <Popup>
          Nhà thờ lớn HN
        </Popup>
      </Marker> */}

      {categories.map((market) =>
        market.places?.map((place) => (
          <Marker
            key={place._id}
            position={[place.lat_code, place.lng_code]}
            icon={customIcon(`./church_${market.iconColor}.png`)}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default Map;
