import React, { useState, useEffect } from "react";
import Row from "./Row/Row";
// import styles from "./Home.module.css";
import { FormItem } from "../../interface/index";
import { API_ENDPOINTS } from "../../service/constants";
// import CurrentField from "./CurrencyField";
import {
  GetRequest,
  PostRequest,
  DeleteRequest,
  PatchRequest,
} from "../../service/services";

import   { TablesContainer,AddButton, Tables, TableHead, TableRow, CurrencyGrid, TableHeaderCell, TableCell,  Error, DialogOverlay, Dialog, DialogActions,Button, Field }  from "./Row/Home.style";

const Home: React.FC = () => {
  const [data, setData] = useState<FormItem[]>([]);
  // //for currency
  //   const [fields, setFields] = useState({
  //     ratePerHour: 50,
  //     hours: 8,
  //     total: 400
  //   });

  //   const handleFieldUpdate = (updatedField: { ratePerHour: number; hours: number; total: number }) => {
  //     setFields(updatedField);
  //   };

  const fetchData = async () => {
    try {
      const response = await GetRequest(API_ENDPOINTS.TEST);
      if (response && response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("Unexpected response structure", response);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addRow = () => {
    const newId = `temp_${data.length + 1}`;
    const newRow: FormItem = {
      _id: newId,
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      ratePerHour: 0,
      hours: 0,
      total: 0,
    };
    setData([...data, newRow]);
  };

  const validatePayload = (record: FormItem) => {
    if (
      record.firstName === "" ||
      record.lastName === "" ||
      record.email === "" ||
      record.address === "" ||
      record.ratePerHour === 0 ||
      record.hours === 0
    ) {
      return false;
    }
    return true;
  };

  const updateCurrentData = (record: FormItem, updatedData: FormItem) => {
    if (record._id?.startsWith("temp_")) {
      const oldData = [...data];
      oldData[oldData.length - 1] = updatedData;
      setData(oldData);
    } else {
      setData(
        data.map((item) => (item._id === updatedData._id ? updatedData : item))
      );
    }
  };

  const updateRow = async (record: FormItem) => {
    console.warn("updateRow===>", record);
    try {
      if (!validatePayload(record)) {
        console.warn("Validation failed for row", record);
        return;
      }

      const payload: FormItem = { ...record };
      const { _id } = record;

      let response = null;
      if (_id?.startsWith("temp_")) {
        response = await PostRequest(`${API_ENDPOINTS.TEST}`, payload);
      } else {
        delete payload.createdAt;
        delete payload.updatedAt;
        delete payload._id;
        delete payload.__v;
        response = await PatchRequest(`${API_ENDPOINTS.TEST}/${_id}`, payload);
      }

      const updatedData = response.data;
      updateCurrentData(record, updatedData);
      console.log("Row updated:", response.data);
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const deleteRow = async (id?: string) => {
    try {
      await DeleteRequest(`${API_ENDPOINTS.TEST}/${id}`);
      const newData = data.filter((item) => item._id !== id);
      setData(newData);
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <TablesContainer>
      <Tables>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <CurrencyGrid>
              <TableHeaderCell>Currency</TableHeaderCell>
              <TableHeaderCell>Hours</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
            </CurrencyGrid>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <div>
          {data.length > 0 ? (
            data.map((row, index) => (
              <Row
                key={row._id}
                row={row}
                index={index}
                updateRow={updateRow}
                deleteRow={deleteRow}
              />
            ))
          ) : (
            <div>No Data Available</div>
          )}
          <TableRow>
            <TableCell style={{ textAlign: "center" }}>
              <AddButton onClick={addRow}>+</AddButton>
            </TableCell>
          </TableRow>
        </div>
      </Tables>
    </TablesContainer>
  );
};

export default Home;