import React, { FC } from "react";
import { Table, Text } from "@mantine/core";
import { useStore } from "../store";
import { useSubscribeTasks } from "../hooks/useSubscribeTasks";
import { useDisplayTasks } from "../hooks/useDisplayTasks";
import { TaskRows } from "./TaskRows";

const NotFoundText: FC = () => {
  const searchWords = useStore((state) => state.searchWords);
  const filter = useStore((state) => state.filter);
  return (
    <>
      {(searchWords.length > 0 && searchWords[0] !== "") || filter !== null ? (
        <Text fz="lg">
          No tasks were found that contain the words you searched for.
        </Text>
      ) : (
        <Text fz="lg">You don't have any tasks.</Text>
      )}
    </>
  );
};

export const TaskList = () => {
  const { display } = useDisplayTasks();
  useSubscribeTasks();

  const ths = (
    <tr>
      <th>Is done</th>
      <th>Content</th>
      <th>Created at</th>
      <th>Updated at</th>
      <th></th>
    </tr>
  );

  return (
    <>
      {display !== null && display.length > 0 ? (
        <Table width={"100%"}>
          <thead>{ths}</thead>
          <TaskRows tasks={display} />
        </Table>
      ) : (
        <NotFoundText />
      )}
    </>
  );
};
