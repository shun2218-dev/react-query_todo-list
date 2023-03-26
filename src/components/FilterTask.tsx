import React, { FC } from "react";
import { Button, Checkbox, Group } from "@mantine/core";

import { useStore } from "../store";

export const FilterTask: FC = () => {
  const setFilter = useStore((state) => state.setFilter);

  return (
    <Group position="center" align="center">
      <Checkbox
        label="isDone"
        onChange={(e) => {
          setFilter({ is_done: e.target.checked });
        }}
      />
      <Button onClick={() => setFilter(null)}>Clear</Button>
    </Group>
  );
};
