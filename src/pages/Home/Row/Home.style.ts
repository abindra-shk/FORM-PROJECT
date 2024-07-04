

import styled, { CSSObject } from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TableCellBaseProps {
  clickable?: boolean;
}

const TableCellBase = styled.div<TableCellBaseProps>`
  flex: 1;
  padding: 15px;
  text-align: left;
  box-sizing: border-box;

  ${({ clickable }): CSSObject | string | undefined =>
    clickable
      ? `
          cursor: pointer;
          &:hover {
            background-color: #f1f1f1;
          }
        `
      : undefined}
`;


export const TablesContainer = styled(FlexContainer)`
  margin-left: 150px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

export const Tables = styled.div`
  width: 150vh;
  border: 1px solid #ddd;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px 0;
`;

export const TableHead = styled(TableCellBase)`
  background-color: #f5f5f5;
  font-weight: bold;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 80px 100px 100px 200px 100px 300px 80px;
  border-bottom: 1px solid #ddd;
`;

export const CurrencyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
`;

export const TableHeaderCell = styled(TableCellBase)`
  font-weight: bold;
`;

export const TableCell = styled(TableCellBase)`
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  padding: 9px;

  &:focus {
    border: 1px solid #007bff;
  }
`;

export const AddButton = styled(FlexContainer)`
  background: #7e98b5;
  color: #100f0f;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;

  &:hover {
    background: #0056b3;
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export const DialogOverlay = styled(FlexContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const Dialog = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background-color: ${props => (props.color === "danger" ? "red" : "#4caf50")};
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin-left: 10px;
`;

export const Field = styled(FlexContainer)`
  padding: 15px;
`;
