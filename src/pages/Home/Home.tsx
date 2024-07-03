import React, { useState, useEffect } from "react";
import Row from "./Row";
import styles from "./Home.module.css";
import { FormItem } from "../../interface/index";
import { API_ENDPOINTS } from "../../service/constants";
import {
  GetRequest,
  PostRequest,
  DeleteRequest,
  PatchRequest,
} from "../../service/services";

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
      //  const { _id, ...payload } = record;
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
            <div>No Data Available</div>
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
