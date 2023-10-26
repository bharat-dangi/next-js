import { Address } from "./resolvers";

// Check if given data are valid or not
export const checkAddressValidity = (
  rawData: any,
  addressData: Address
): string => {
  const localityData = rawData?.localities?.locality;

  if (!localityData?.length)
    return `The suburb ${addressData?.suburb} does not exist in the state ${addressData?.state}.`;

  const postalCodeData = localityData?.find(
    (singleData: any) => singleData?.postcode === addressData?.postalCode
  );

  if (postalCodeData) return "The postcode, suburb, and state input are valid.";

  return `The postcode ${addressData?.postalCode} does not match the suburb ${addressData?.suburb}`;
};
