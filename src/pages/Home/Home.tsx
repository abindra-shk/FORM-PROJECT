import React, { useState, useEffect } from "react";
import Row from "./Row";
import styles from "./Home.module.css";
import axios from "axios";
import { FormItem } from "../../interface/index";
// import { v4 as uuidv4 } from 'uuid';

const Home: React.FC = () => {
  const [data, setData] = useState<FormItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/test");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addRow = () => {
    const newId = `temp_${data.length + 1}`; // Generate a temporary ID for new rows
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
      updatedRow.firstName == "" ||
      updatedRow.lastName == "" ||
      updatedRow.email == "" ||
      updatedRow.address == "" ||
      updatedRow.ratePerHour == 0 ||
      updatedRow.hours == 0
    ) {
      return;
    }
  };
  const updateCurrentData = (updatedRow: FormItem, updatdData: FormItem) => {
    if (updatedRow._id?.startsWith("temp_")) {
      const oldData = [...data];
      oldData[oldData.length] = updatdData;
      setData(oldData);
    } else {
      setData(
        data.map((item) => {
          if (item._id == updatdData._id) {
            return updatdData;
          }
          return item;
        })
      );
    }
  };

  const updateRow = async (updatedRow: FormItem) => {
    try {
      validatePayload(updatedRow);
      let payload = { ...updatedRow };
      let response = null;
      if (updatedRow._id?.startsWith("temp_")) {
        delete payload._id;
        const newId = (data.length + 1).toString();
        response = await axios.post(
          `http://localhost:8000/api/test/${newId}`,
          payload // updatedRow._id.replace("temp_", "")Replace temporary ID format with the actual ID format
        );
      } else {
        // response = await axios.patch(
        //   "http://localhost:8000/api/test",
        //   { ...payload}
        // );
        response = await axios.patch(
          `http://localhost:8000/api/test/${updatedRow._id}`,
          (payload = {
            firstName: updatedRow.firstName,
            lastName: updatedRow.lastName,
            email: updatedRow.email,
            address: updatedRow.address,
            ratePerHour: updatedRow.ratePerHour,
            hours: updatedRow.hours,
            total: updatedRow.total,
          })
        );
      }

      const updatdData = response.data;
      updateCurrentData(updatedRow, updatdData);
      console.log("New row added:", response.data);
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
          {data.map((row, index) => (
            <Row
              key={row._id}
              row={row}
              index={index}
              updateRow={updateRow}
              deleteRow={deleteRow}
            />
          ))}
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
