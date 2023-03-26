import React, { ChangeEvent, FC, memo, useState } from "react";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { serverTimestamp } from "firebase/firestore";
import { useMutateTask } from "../hooks/useMutateTask";
import { InputProps, Task } from "../types";
import { useStore } from "../store";

export const AddTaskMemo: FC<InputProps> = ({ input, setInput }) => {
  const [error, setError] = useState<string | boolean>(false);
  const { createTaskMutation } = useMutateTask();
  const session = useStore((state) => state.session);
  const handleAddTaskClick = () => {
    if (input !== "") {
      const data: Task = {
        uid: session!.uid,
        content: input,
        is_done: false,
        created_at: serverTimestamp(),
      };
      createTaskMutation.mutateAsync(data);
      setInput("");
    } else {
      setError("Please enter some text and then click on the button.");
    }
  };
  return (
    <Group position="center" align="baseline">
      <TextInput
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (error) {
            setError(false);
          }
        }}
        error={error}
      />
      <ActionIcon
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        onClick={handleAddTaskClick}
      >
        <IconPlus size="1rem" />
      </ActionIcon>
    </Group>
  );
};

export const AddTask = memo(AddTaskMemo);
