import React, { FC } from "react";
import { Group, TextInput } from "@mantine/core";
import { useStore } from "../store";

export const SearchTask: FC = () => {
  const setSearchWords = useStore((state) => state.setSearchWords);
  return (
    <Group position="center">
      <TextInput onChange={(e) => setSearchWords(e.target.value)} />
    </Group>
  );
};
