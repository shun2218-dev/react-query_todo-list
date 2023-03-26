import React, { FC, ReactNode } from "react";
import { Header, Title } from "@mantine/core";
import { header } from "../styles/SimgpleHeader.css";

type Props = {
  children: ReactNode;
  height?: number;
  title: string;
};

export const SimpleHeader: FC<Props> = ({ children, height = 100, title }) => {
  return (
    <Header height={height} className={`${header}`}>
      <Title>{title}</Title>
      {children}
    </Header>
  );
};
