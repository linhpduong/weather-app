import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const PageContentTemplate = ({ children, title }) => {
  return (
    <PageContainer>
      <Typography variant="h4">{title}</Typography>
      {children}
    </PageContainer>
  );
};

const PageContainer = styled(Stack)`
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: ${({ theme }) => theme.shape.borderRadius.m};
  background-color: ${({ theme }) => theme.palette.common.white};
  gap: ${({ theme }) => theme.spacing(4)};
  flex-direction: column;
`;

export default React.memo(PageContentTemplate);
