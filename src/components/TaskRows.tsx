import { FC, memo, useState } from "react";
import { Task } from "../types";
import { Timestamp } from "firebase/firestore";
import { ActionIcon, Checkbox } from "@mantine/core";
import { useMutateTask } from "../hooks/useMutateTask";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { TaskDeleteModal } from "./TaskDeleteModal";

type Props = {
  tasks: Task[];
};
const TaskRowsMemo: FC<Props> = ({ tasks }) => {
  const { updateTaskMutation } = useMutateTask();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedTask, setOpenedTask] = useState<Task | null>(null);
  const formatTimestamp = (timestamp: unknown): string => {
    if (!!timestamp) {
      const date = timestamp as Timestamp;
      console.log("format", date.toDate().toLocaleString());
      return date.toDate().toLocaleString();
    } else {
      return "-";
    }
  };

  const handleUpdateTaskClick = ({
    id,
    is_done,
  }: {
    id: string;
    is_done: boolean;
  }) => {
    updateTaskMutation.mutateAsync({
      id: id!,
      is_done,
    });
  };

  const handleClickOpen = (task: Task) => {
    setOpenedTask(task);
    open();
  };

  return (
    <>
      <TaskDeleteModal
        openedTask={openedTask}
        setOpenedTask={setOpenedTask}
        opened={opened}
        close={close}
      />
      <tbody>
        {tasks.map((task, index) => {
          const createdAt = formatTimestamp(task.created_at);
          const updatedAt = formatTimestamp(task.updated_at);

          return (
            <tr key={`${task.content}_${index}`}>
              <td>
                <Checkbox
                  checked={task.is_done}
                  onChange={(e) =>
                    handleUpdateTaskClick({
                      id: task.id!,
                      is_done: e.target.checked,
                    })
                  }
                ></Checkbox>
              </td>
              <td>{task.content}</td>
              <td>{createdAt ?? ""}</td>
              <td>{updatedAt ?? ""}</td>
              <td>
                <ActionIcon onClick={() => handleClickOpen(task)}>
                  <IconTrash color="red" />
                </ActionIcon>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export const TaskRows = memo(TaskRowsMemo);
