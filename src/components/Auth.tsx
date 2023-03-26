import { FC, FormEvent } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useMutateAuth } from "../hooks/useMutateAuth";

const Auth: FC = () => {
  const { getInputProps, reset, loginMutation, registMutation, onSubmit } =
    useMutateAuth();

  const [isRegist, { toggle: isRegistToggle }] = useDisclosure(false);
  const [title, titleToggle] = useToggle(["Welcome back!", "Welcome!"]);
  const [text, textToggle] = useToggle([
    "Do not have an account yet?",
    "Do you have an account yet?",
  ]);
  const [anchorText, anchorTextToggle] = useToggle([
    "Create account",
    "Sign in",
  ]);
  const [buttonLabel, buttonLabelToggle] = useToggle(["Sign in", "Sign up"]);

  const toggleHandler = () => {
    reset();
    isRegistToggle();
    titleToggle();
    textToggle();
    anchorTextToggle();
    buttonLabelToggle();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegist) {
      registMutation.mutate();
    } else {
      loginMutation.mutate();
    }
  };

  return (
    <Container size={420} my={40} w="100%">
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {title}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {text}
        <Anchor size="sm" component="button" onClick={toggleHandler}>
          {anchorText}
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        component="form"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          withAsterisk
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          mt="md"
          {...getInputProps("password")}
        />
        {isRegist && (
          <PasswordInput
            label="Password Confirmation"
            placeholder="Enter again"
            withAsterisk
            mt="md"
            {...getInputProps("confirmation")}
          />
        )}
        {!isRegist && (
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
        )}
        <Button fullWidth mt="xl" type="submit">
          {buttonLabel}
        </Button>
      </Paper>
    </Container>
  );
};

export default Auth;
