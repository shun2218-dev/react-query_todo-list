import React from "react";
import { notifications } from "@mantine/notifications";
import { IconAlertSmall, IconCheck } from "@tabler/icons-react";

type Notification = {
  title: string;
  message: string;
};

export const useNotification = () => {
  const successNotification = ({ title, message }: Notification) => {
    notifications.show({
      title,
      message,
      color: "teal",
      icon: <IconCheck size={20} />,
    });
  };

  const errorNotification = (
    error: unknown,
    { title }: Omit<Notification, "message">
  ) => {
    if (error instanceof Error) {
      notifications.show({
        title,
        message: error.message,
        color: "red",
        icon: <IconAlertSmall color="white" />,
      });
    }
  };
  return {
    successNotification,
    errorNotification,
  };
};
