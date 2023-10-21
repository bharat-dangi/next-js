// "use client";
import { useState } from "react";
import styles from "./address.module.css";
import { CHECK_ADDRESS } from "../api/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import { client } from "../api/graphql.client";

export default function AddressForm() {
  const [postcode, setPostcode] = useState<string>("");
  const [suburb, setSuburb] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [checkAddress, { loading, error, data }] = useLazyQuery(CHECK_ADDRESS);
  console.log("Dataaa", data);
  // notifyOnNetworkStatusChange: true,
  // onCompleted: (data) => {
  //   console.log("Dataaa", data);
  //   setMessage(data?.checkAddress?.message);
  // },

  return (
    <div className={styles.addressFormContainer}>
      <div className={styles.form}>
        <label className={styles.formLabel}>
          Postal Code:
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          Suburb:
          <input
            type="text"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={styles.formInput}
          />
        </label>
        {errorMessage !== "" && (
          <h3 style={{ color: "red" }}>{errorMessage}</h3>
        )}

        {message !== "" && <h3 style={{ color: "green" }}>{message}</h3>}
        <button
          type="button"
          className={styles.submitButton}
          onClick={(e) => {
            e.preventDefault();
            if (!postcode || !suburb || !state) {
              setErrorMessage("All fields are required.");
              return;
            }
            checkAddress({
              client: client,
              variables: {
                postalCode: postcode,
                suburb,
                state,
              },
            });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
