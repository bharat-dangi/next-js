import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { CHECK_ADDRESS } from "../api/query";

export const useCheckAddress = () => {
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
  return {
    postcode,
    suburb,
    state,
    setPostcode,
    setSuburb,
    setState,
    loading,
    checkAddress,
  };
};
