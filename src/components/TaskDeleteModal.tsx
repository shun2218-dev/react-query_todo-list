import React, { Dispatch, FC, SetStateAction, memo } from "react";
import {
  Button,
  Flex,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { Task } from "../types";
import { textBold } from "../styles/styles.css";
import { useMutateTask } from "../hooks/useMutateTask";

type Props = {
  openedTask: Task | null;
  setOpenedTask: Dispatch<SetStateAction<Task | null>>;
  opened: boolean;
  close: () => void;
};

const TaskDeleteModalMemo: FC<Props> = ({
  openedTask,
  setOpenedTask,
  opened,
  close,
}) => {
  const { deleteTaskMutation } = useMutateTask();
  const [deleteConfirm, setDeleteConfirm] = useInputState<string>("");
  const theme = useMantineTheme();
  const handleClickClose = () => {
    setOpenedTask(null);
    setDeleteConfirm("");
    close();
  };
  const handleDeleteTaskClick = async ({ id }: { id: string }) => {
    deleteTaskMutation.mutateAsync({ id: id });
    handleClickClose();
  };
  const isEqual = (value: string) => {
    return value === openedTask?.content;
  };
  return (
    <Modal
      opened={opened}
      onClose={handleClickClose}
      title="Confirmation"
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      centered
      styles={{ inner: { left: 0 }, content: { minWidth: 500 } }}
    >
      <Stack spacing={30}>
        <Title size={22}>Are you sure to delete the task?</Title>
        <Text>
          Enter the following ID to confirm deletion of this task:{" "}
          <span className={`${textBold}`}>{openedTask?.content}</span>
        </Text>
        <TextInput
          placeholder={openedTask?.content}
          value={deleteConfirm}
          onChange={setDeleteConfirm}
        />
        <Flex gap={10} justify="end">
          <Button variant="text" color="gray" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => handleDeleteTaskClick({ id: openedTask?.id! })}
            disabled={!isEqual(deleteConfirm)}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export const TaskDeleteModal = memo(TaskDeleteModalMemo);
