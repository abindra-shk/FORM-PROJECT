import React, { useState, useEffect } from "react";
import Row from "./Row";
import styles from "./Home.module.css";
import axios from "axios";
import {FormItem} from "../../interface/index";

const Home: React.FC = () => {
  const [data, setData] = useState<FormItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/test");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

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

  const updateRow = async (updatedRow: FormItem) => {
    try {
      if (updatedRow._id.startsWith("temp_")) {
        // New row, check if it has data entered
        if (updatedRow.firstName !== "" || updatedRow.lastName !== "" || updatedRow.email !== "" || updatedRow.address !== "" || updatedRow.ratePerHour !== 0 || updatedRow.hours !== 0) {
          // for post
          const response = await axios.post(
            "http://localhost:8000/api/test",
            { ...updatedRow, _id: updatedRow._id.replace("temp_", "") } // Replace temporary ID format with the actual ID format
          );
          console.log("New row added:", response.data);
          fetchData(); // fetch updated data
        }
      } else {
        // existing data through patch
        const response = await axios.patch(
          `http://localhost:8000/api/test/${updatedRow._id}`,
          updatedRow
        );
        console.log("Row updated successfully:", response.data);
        const newData = data.map((item) =>
          item._id === updatedRow._id ? updatedRow : item
        );
        setData(newData);
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const deleteRow = async (id: string) => {
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
