import React, { FC } from "react";
import { signOut as _signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { SimpleHeader } from "./SimpleHeader";
import { container } from "../styles/styles.css";
import { Button, Center, Container, Stack, TextInput } from "@mantine/core";
import { TaskList } from "./TaskList";
import { InputList } from "./InputList";
import { Asynchronous } from "./Asynchronous";
import { useQueryClient } from "react-query";

const DashBoard: FC = () => {
  const queryClient = useQueryClient();
  const signOut = () => {
    _signOut(auth);
    queryClient.removeQueries(["tasks"]);
  };
  return (
    <Container className={`${container}`} w="100%">
      <SimpleHeader title="Todo List">
        <Button onClick={signOut}>Sign Out</Button>
      </SimpleHeader>
      <Stack spacing={50} sx={{ width: "100%" }} align="center">
        <InputList />
        <Asynchronous>
          <TaskList />
        </Asynchronous>
      </Stack>
    </Container>
  );
};

export default DashBoard;
