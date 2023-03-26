import { Loader } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import React, { FC, ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  children: ReactNode;
};

const Error = () => {
  return <IconExclamationCircle color="red" />;
};

export const Asynchronous: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
