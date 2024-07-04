import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
// import styles from "./CurrencyField.module.css";
import styles from "../Home.module.css";
import { CurrencyGrid, Field, InputField } from "./Home.style";

interface CurrencyFieldProps {
  ratePerHour: number;
  hours: number;
  total: number;
  onFieldUpdate: (updatedField: {
    ratePerHour: number;
    hours: number;
    total: number;
  }) => void;
}

const CurrencyField: React.FC<CurrencyFieldProps> = ({
  ratePerHour,
  hours,
  total,
  onFieldUpdate,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [currentRatePerHour, setCurrentRatePerHour] = useState<string>(
    `$${ratePerHour}`
  );
  const [currentHours, setCurrentHours] = useState<number>(hours);
  const [currentTotal, setCurrentTotal] = useState<number>(total);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setCurrentRatePerHour(`$${ratePerHour}`);
    setCurrentHours(hours);
    setCurrentTotal(total);
    console.log(ratePerHour + "-" + hours + "-" + total);
    onFieldUpdate({ ratePerHour, hours, total });
  }, [ratePerHour, hours, total]);

  const handleBlur = () => {
    const numericRatePerHour = parseFloat(
      currentRatePerHour.replace(/[$,]/g, "")
    );
    if (numericRatePerHour > 1000) {
      setErrorMessage("Rate per hour cannot exceed $1000");
      return;
    }
    if (currentHours > 24) {
      setErrorMessage("Hours cannot exceed 24");
      return;
    }
    setErrorMessage("");

    const updatedTotal = numericRatePerHour * currentHours;
    setCurrentTotal(updatedTotal);

    onFieldUpdate({
      ratePerHour: numericRatePerHour,
      hours: currentHours,
      total: updatedTotal,
    });

    setEditingField(null);
  };

  const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRatePerHour((event.target as HTMLInputElement).value);
  };

  const handleChangeHours = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +(event.target as HTMLInputElement).value;
    setCurrentHours(value);
  };

  return (
    <CurrencyGrid>
      <Field>
        {editingField === "ratePerHour" ? (
          <InputMask
            mask="$999"
            className={styles.inputField}
            value={currentRatePerHour}
            onChange={handleChangeRate}
            onBlur={handleBlur}
          />
        ) : (
          <span onClick={() => setEditingField("ratePerHour")}>
            {currentRatePerHour}
          </span>
        )}
      </Field>
      <Field>
        {editingField === "hours" ? (
          <InputField
            type="number"
            value={currentHours}
            onChange={handleChangeHours}
            onBlur={handleBlur}
          />
        ) : (
          <span onClick={() => setEditingField("hours")}>{currentHours}</span>
        )}
      </Field>

<Field>
        <span>{currentTotal}</span>
        </Field>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </CurrencyGrid>
  );
};

export default CurrencyField;
