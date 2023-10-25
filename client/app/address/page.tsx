import { useState } from "react";
import styles from "./address.module.css";
import { CHECK_ADDRESS } from "../api/query";
import { useLazyQuery } from "@apollo/client";
import { client } from "../api/graphql.client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddressForm() {
  const [postcode, setPostcode] = useState<string>("");
  const [suburb, setSuburb] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [checkAddress, { loading }] = useLazyQuery(CHECK_ADDRESS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!data?.checkAddress?.message) {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      toast.success(data?.checkAddress?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onError: (error) => {
      toast.error(error?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });

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

        {loading && <div className={styles.loader}></div>}

        <button
          type="button"
          className={styles.submitButton}
          onClick={(e) => {
            e.preventDefault();
            if (!postcode || !suburb || !state) {
              toast.error("All fields are required.", {
                position: toast.POSITION.TOP_RIGHT,
              });
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
        <ToastContainer />
      </div>
    </div>
  );
}
