import { Accordion, Badge, Flex, Text } from "@mantine/core";
import React, { FC, useState } from "react";
import { AddTask } from "./AddTask";
import { useInputState } from "@mantine/hooks";
import { flexContainer, fullwidth } from "../styles/styles.css";
import { SearchTask } from "./SearchTask";
import { FilterTask } from "./FilterTask";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";

export const InputList: FC = () => {
  const [addInput, setAddInput] = useInputState<string>("");
  return (
    <Accordion className={`${fullwidth}`}>
      <Accordion.Item value="add">
        <Accordion.Control>
          <Flex justify="center">
            <Badge variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
              <Flex gap={10}>
                <IconPlus size="1rem" />
                <Text>Add Task</Text>
              </Flex>
            </Badge>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          <AddTask input={addInput} setInput={setAddInput} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="search">
        <Accordion.Control>
          <Flex justify="center">
            <Badge variant="gradient" gradient={{ from: "teal", to: "lime" }}>
              <Flex gap={10}>
                <IconSearch size="1rem" />
                <Text>Search Task</Text>
              </Flex>
            </Badge>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          <SearchTask />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="filter">
        <Accordion.Control>
          <Flex justify="center">
            <Badge variant="gradient" gradient={{ from: "orange", to: "red" }}>
              <Flex gap={10}>
                <IconFilter size="1rem" />
                <Text>Filter Task</Text>
              </Flex>
            </Badge>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          <FilterTask />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
