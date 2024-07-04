import styled, { css } from 'styled-components';
import { TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

interface RowItemProps {
  heading?: boolean;
  error?: boolean;
}

export const StyledForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 50px 100px 100px 200px 150px 90px 100px 320px 80px 95px;
  border-bottom: 1px solid grey;
`;

export const RowItem = styled(Typography)<RowItemProps>`
  padding: 8.5px 14px;
  font-size: 1rem;
  color: white;
  display: flex;
  text-align: center;
  border-radius: 4px;

  ${(props) =>
    props.heading &&
    css`
      font-weight: 700 !important;
      text-transform: uppercase;
    `}

  ${(props) =>
    props.error &&
    css`
      border: 2px solid red;
    `}
`;

export const StyledTextField = styled(TextField)`
  &.row-item {
    padding: 0;
    font-size: 1rem;
    color: white;
    display: flex;
    text-align: center;
  }
`;

export const DateRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateWidth = styled.div`
  width: 150px;
  text-align: center;
`;

export const StyledDatePicker = styled(DatePicker)`
  & .MuiInputBase-root {
    height: 42px;
    width: 150px;
  }
`;

export const ErrorMessage = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  margin-left: 10px;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const ErrorRowItem = styled(Typography)<{ hasError: boolean }>`
  border: ${(props) => (props.hasError ? '2px solid red' : 'none')};
  border-radius: 4px;
  height: 20px;
  cursor: pointer;
`;
