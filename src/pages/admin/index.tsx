import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import CreatePlace from "@/components/Admin/Place/CreatePlace";
import PlaceList from "@/components/Admin/Place/PlaceList";
import { ADMIN_CURRENT_PAGE_CATEGORY_LIST, ADMIN_CURRENT_PAGE_CREATE_CATEGORY, ADMIN_CURRENT_PAGE_CREATE_PLACE, ADMIN_CURRENT_PAGE_PLACE_LIST, ADMIN_MENU_KEY_TAB_CATEGORY, ADMIN_MENU_KEY_TAB_PLACE } from "@/constant/AdminConstant";
import CateogoryList from "@/components/Admin/Category/CategoryList";
import CreateCategory from "@/components/Admin/Category/CreateCategory";

const items: MenuProps["items"] = [
  {
    label: "Category",
    key: ADMIN_MENU_KEY_TAB_CATEGORY,
    icon: <MailOutlined />,
  },
  {
    label: "Place",
    key: ADMIN_MENU_KEY_TAB_PLACE,
    icon: <AppstoreOutlined />,
  },
  
];

const App: React.FC = () => {
  const [menuTabKey, setMenuTabKey] = useState(ADMIN_MENU_KEY_TAB_CATEGORY);
    const [currentPageKey, setCurrentPageKey] = useState(ADMIN_CURRENT_PAGE_CATEGORY_LIST)

    const [id,setID] = useState();

  const onClick: MenuProps["onClick"] = async (e) => {
    setMenuTabKey(e.key);
    switch (e.key) {
        case (ADMIN_MENU_KEY_TAB_PLACE) : {
            await setCurrentPageKey(ADMIN_CURRENT_PAGE_PLACE_LIST)
            break; 
        }
        case (ADMIN_MENU_KEY_TAB_CATEGORY): {
            await setCurrentPageKey(ADMIN_CURRENT_PAGE_CATEGORY_LIST)
            break; 
        }
    }
  };

  const changeView = (menu_Tab_Key: string,currentPageKey: string) => {
    setMenuTabKey(menu_Tab_Key)
    setCurrentPageKey(currentPageKey)
  }
  
  const onCreateOrUpdate = (menu_Tab_Key: string,currentPageKey: string, id: any) => {
    setMenuTabKey(menu_Tab_Key)
    setCurrentPageKey(currentPageKey)
    setID(id);
  }

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[menuTabKey]}
        mode="horizontal"
        items={items}
      />
      <div>{(menuTabKey === ADMIN_MENU_KEY_TAB_PLACE && currentPageKey === ADMIN_CURRENT_PAGE_CREATE_PLACE) && <CreatePlace onChangeView={changeView} id={id}  />}</div>
      <div>{(menuTabKey === ADMIN_MENU_KEY_TAB_PLACE && currentPageKey === ADMIN_CURRENT_PAGE_PLACE_LIST) && <PlaceList onCreateOrUpdate={onCreateOrUpdate} />}</div>
      <div>{(menuTabKey === ADMIN_MENU_KEY_TAB_CATEGORY && currentPageKey === ADMIN_CURRENT_PAGE_CATEGORY_LIST) && <CateogoryList onCreateOrUpdate={onCreateOrUpdate} />}</div>
      <div>{(menuTabKey === ADMIN_MENU_KEY_TAB_CATEGORY && currentPageKey === ADMIN_CURRENT_PAGE_CREATE_CATEGORY) && <CreateCategory onChangeView={changeView} id={id}  />}</div>

    </>
  );
};

export default App;
