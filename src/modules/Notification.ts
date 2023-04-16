import { notification } from "antd";


export default function openNotification  (message: string,description: string): void {
    notification.open({
      message: message,
      description: description,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
