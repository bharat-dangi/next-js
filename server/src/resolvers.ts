import axios from "axios";
import { checkAddressValidity } from "./utility";

export type Address = {
  postalCode: string;
  suburb: string;
  state: number;
};

type Response = {
  message: string;
};

const checkAddress = async (addressData: Address): Promise<Response> => {
  try {
    if (
      !addressData?.postalCode ||
      !addressData?.state ||
      !addressData?.suburb
    ) {
      return { message: "All fields are required" };
    }
    const apiResponse = await axios.get(process.env.ADDRESS_CHECK_URL!, {
      headers: {
        "auth-key": process.env.ADDRESS_CHECK_API_KEY,
        Accept: "application/json",
      },
      params: {
        q: addressData?.suburb,
        state: addressData?.state,
      },
    });
    return { message: checkAddressValidity(apiResponse?.data, addressData) };
  } catch (error) {
    return { message: "Something went wrong" };
  }
};

export const root = {
  checkAddress,
};
