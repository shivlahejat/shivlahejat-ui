import { styled } from "shivlahejat";
import { theme } from "./theme";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0;
  background: ${theme.color.card};
  color: ${theme.color.cardForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
`;

export const CardHeader = styled.div`
  display: grid;
  gap: 6px;
  padding: 0 24px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
`;

export const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;

export const CardContent = styled.div`
  padding: 0 24px;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
`;
