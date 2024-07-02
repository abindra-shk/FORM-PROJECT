import React, { useState, useEffect } from "react";
import Row from "./Row";
import styles from "./Home.module.css";
import axios from "axios";
import { FormItem } from "../../interface/index";
import { API_ENDPOINTS } from '../../service/constants';
import {
  GetRequest,
  // PostRequest,
  // DeleteRequest,
  // PatchRequest,
} from '../../service/services';

const Home: React.FC = () => {
  const [data, setData] = useState<FormItem[]>([]);

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
      setData([]); // Ensure data is an array even if there's an error
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

  const validatePayload = (updatedRow: FormItem) => {
    if (
      updatedRow.firstName === "" ||
      updatedRow.lastName === "" ||
      updatedRow.email === "" ||
      updatedRow.address === "" ||
      updatedRow.ratePerHour === 0 ||
      updatedRow.hours === 0
    ) {
      return false;
    }
    return true;
  };

  const updateCurrentData = (updatedRow: FormItem, updatedData: FormItem) => {
    if (updatedRow._id?.startsWith("temp_")) {
      const oldData = [...data];
      oldData[oldData.length - 1] = updatedData; // Replace the last added temp row with the actual data
      setData(oldData);
    } else {
      setData(
        data.map((item) => (item._id === updatedData._id ? updatedData : item))
      );
    }
  };

  const updateRow = async (updatedRow: FormItem) => {
    try {
      if (!validatePayload(updatedRow)) {
        console.warn("Validation failed for row", updatedRow);
        return;
      }

      let payload = { ...updatedRow };
      let response = null;
      if (updatedRow._id?.startsWith("temp_")) {
        delete payload._id;
        response = await axios.post(
          "http://localhost:8000/api/test/",
          payload
        );
      } else {
        response = await axios.patch(
          `http://localhost:8000/api/test/${updatedRow._id}`,
          payload
        );
      }

      const updatedData = response.data;
      updateCurrentData(updatedRow, updatedData);
      console.log("Row updated:", response.data);
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const deleteRow = async (id?: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/test/${id}`);
      const newData = data.filter((item) => item._id !== id);
      setData(newData);
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={styles.tableRow}>
            <div className={styles.tableHeaderCell}>ID</div>
            <div className={styles.tableHeaderCell}>First Name</div>
            <div className={styles.tableHeaderCell}>Last Name</div>
            <div className={styles.tableHeaderCell}>Email</div>
            <div className={styles.tableHeaderCell}>Address</div>
            <div className={styles.tableHeaderCell}>Rate per Hour</div>
            <div className={styles.tableHeaderCell}>Hours</div>
            <div className={styles.tableHeaderCell}>Total</div>
            <div className={styles.tableHeaderCell}>Action</div>
          </div>
        </div>
        <div className={styles.tableBody}>
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
            <div>No data available</div>
          )}
          <div className={styles.tableRow}>
            <div className={styles.tableCell} style={{ textAlign: "center" }}>
              <button onClick={addRow} className={styles.addButton}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
