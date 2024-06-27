import React, { useState, useEffect } from "react";
import Row from "./Row";
import styles from "./Home.module.css";
import axios from "axios";

interface DataRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  ratePerHour: number;
  hours: number;
  total: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);

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
    const newRow: DataRow = {
      id: data.length + 1,
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

  const updateRow = async (updatedRow: DataRow) => {
    try {
      await axios.put(`http://localhost:8000/api/test/${updatedRow.id}`, updatedRow);
      const newData = data.map((item) =>
        item.id === updatedRow.id ? updatedRow : item
      );
      setData(newData);
    } catch (error) {
      console.error("Error updating row", error);
    }
  };

  const deleteRow = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/test/${id}`);
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    } catch (error) {
      console.error("Error deleting row", error);
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
          {data.map((row) => (
            <Row
              key={row.id}
              row={row}
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
