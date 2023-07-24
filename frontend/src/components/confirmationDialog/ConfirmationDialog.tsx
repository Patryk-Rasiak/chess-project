import { useState } from "react";
import React from "react";
import styles from "./ConfirmationDialog.module.scss";

export const ConfirmationDialog = ({
  text,
  handleConfirm,
}: {
  text: string;
  handleConfirm: () => void;
}) => {
  const [showPrompt, setShowPrompt] = useState(true);
  const closePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <>
      {showPrompt && (
        <div className={styles.container}>
          <div className={styles.overlay} />
          <div className={styles.modal}>
            <h1>Confirmation</h1>
            <p>Are you sure you want to {text}?</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={closePrompt}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};
