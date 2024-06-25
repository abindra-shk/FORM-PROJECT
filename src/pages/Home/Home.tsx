import React, { useState, useEffect } from "react";
import Row from "./Row";
import styles from "./Home.module.css";
import DataRow from "../../interface";
import axios from "axios";

const initialData: DataRow[] = [
  {
    id: 1,
    name: "Ram Adhikari",
    age: 10,
    email: "ram@gmail.com",
    ratePerHour: 10,
    numberOfHours: 50,
    total: 500,
  },
  {
    id: 2,
    name: "Sita Nepal",
    age: 19,
    email: "sita@gmail.com",
    ratePerHour: 60,
    numberOfHours: 5,
    total: 300,
  },
  {
    id: 3,
    name: "Hari Kc",
    age: 80,
    email: "Hari@gmail.com",
    ratePerHour: 50,
    numberOfHours: 10,
    total: 500,
  },
];

const Home: React.FC = () => {
  const [data, setData] = useState<DataRow[]>(() => {
    const savedData = localStorage.getItem("tableData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const displayAllUsers = async (): Promise<void> => {
    try {
      const res = await axios.get("http://localhost:8000/api/test");
      console.log("data", res.data.data);
      setData(res.data.data);
      // setFormArray(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(data));
    displayAllUsers();
  }, [data]);

  const addRow = () => {
    const newRow: DataRow = {
      id: data.length + 1,
      name: "",
      age: 0,
      email: "",
      ratePerHour: 0,
      numberOfHours: 0,
      total: 0,
    };
    setData([...data, newRow]);
  };

  const updateRow = (updatedRow: DataRow) => {
    const newData = data.map((item) =>
      item.id === updatedRow.id ? updatedRow : item
    );
    setData(newData);
  };

  const deleteRow = (id: number) => {
    const newData = data
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index + 1 }));
    setData(newData);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={styles.tableRow}>
            <div className={styles.tableHeaderCell}>ID</div>
            <div className={styles.tableHeaderCell}>FName</div>
            <div className={styles.tableHeaderCell}>LName</div>
            <div className={styles.tableHeaderCell}>Email</div>
            <div className={styles.tableHeaderCell}>Rate per Hour</div>
            <div className={styles.tableHeaderCell}>Number of Hours</div>
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
