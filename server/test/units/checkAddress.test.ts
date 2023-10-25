import axios from "axios";
import { Address, root } from "../../src/resolvers";
import MockAdapter from "axios-mock-adapter";
import { checkAddressValidity } from "../../src/utility";

const { checkAddress } = root;

describe("checkAddress Function", () => {
  let mock: any;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });
  //   Test case for a valid address
  it("should return a valid response for a valid address", async () => {
    const addressData: Address = {
      postalCode: "12345",
      state: "CA",
      suburb: "Test Suburb",
    };
    const apiResponseData = {
      localities: {
        locality: [
          {
            postcode: "12345",
            state: "CA",
            suburb: "Test Suburb",
          },
          {
            postcode: "56789",
            state: "CA",
            suburb: "Test Suburb",
          },
        ],
      },
    };

    mock.onGet(process.env.ADDRESS_CHECK_URL).reply(200, apiResponseData);

    const response = await checkAddress(addressData);
    expect(response).toEqual({
      message: "The postcode, suburb, and state input are valid.",
    });
  });

  // Test case for missing fields
  it("should return an error for missing fields", async () => {
    const addressData: Partial<Address> = {};
    const response = await checkAddress(addressData as Address);
    expect(response).toEqual({ message: "All fields are required" });
  });

  // Test case for an invalid suburb
  it("should return an error for an invalid suburb", async () => {
    const addressData: Address = {
      postalCode: "12345",
      state: "VIC",
      suburb: "Invalid Suburb",
    };
    const apiResponseData = {
      localities: "",
    };

    mock.onGet(process.env.ADDRESS_CHECK_URL).reply(200, apiResponseData);

    const response = await checkAddress(addressData);
    expect(response).toEqual({
      message: "The suburb Invalid Suburb does not exist in the state VIC.",
    });
  });

  // Test case for an invalid postal code
  it("should return an error for an invalid postal code", async () => {
    const addressData: Address = {
      postalCode: "54321",
      state: "VIC",
      suburb: "Test Suburb",
    };
    const apiResponseData = {
      localities: {
        locality: [
          {
            postcode: "12345",
            state: "VIC",
            suburb: "Test Suburb",
          },
          {
            postcode: "67895",
            state: "VIC",
            suburb: "Test Suburb",
          },
        ],
      },
    };

    mock.onGet(process.env.ADDRESS_CHECK_URL).reply(200, apiResponseData);

    const response = await checkAddress(addressData);
    expect(response).toEqual({
      message: "The postcode 54321 does not match the suburb Test Suburb",
    });
  });

  // Test case for a network error
  it("should return an error for a network error", async () => {
    const addressData: Address = {
      postalCode: "12345",
      state: "CA",
      suburb: "Test Suburb",
    };

    mock.onGet(process.env.ADDRESS_CHECK_URL).networkError();

    const response = await checkAddress(addressData);
    expect(response).toEqual({ message: "Something went wrong" });
  });
});

describe("checkAddressValidity Function", () => {
  it("should return an error message for an invalid suburb", () => {
    const rawData = {
      localities: "",
    };
    const addressData = {
      postalCode: "12345",
      state: "CA",
      suburb: "Invalid Suburb",
    };

    const result = checkAddressValidity(rawData, addressData);
    expect(result).toBe(
      "The suburb Invalid Suburb does not exist in the state CA."
    );
  });

  it("should return a success message for a valid address", () => {
    const rawData = {
      localities: {
        locality: [
          {
            postcode: "12345",
            state: "CA",
            suburb: "Test Suburb",
          },
          {
            postcode: "34215",
            state: "CA",
            suburb: "Test Suburb",
          },
        ],
      },
    };
    const addressData = {
      postalCode: "12345",
      state: "CA",
      suburb: "Test Suburb",
    };

    const result = checkAddressValidity(rawData, addressData);
    expect(result).toBe("The postcode, suburb, and state input are valid.");
  });

  it("should return an error message for a mismatched postal code", () => {
    const rawData = {
      localities: {
        locality: [
          {
            postcode: "54321", // This doesn't match the addressData postalCode
            state: "CA",
            suburb: "Test Suburb",
          },
        ],
      },
    };
    const addressData = {
      postalCode: "12345",
      state: "CA",
      suburb: "Test Suburb",
    };

    const result = checkAddressValidity(rawData, addressData);
    expect(result).toBe(
      "The postcode 12345 does not match the suburb Test Suburb"
    );
  });

  it("should return an error message for missing locality data", () => {
    const rawData = {}; // No locality data
    const addressData = {
      postalCode: "12345",
      state: "CA",
      suburb: "Test Suburb",
    };

    const result = checkAddressValidity(rawData, addressData);
    expect(result).toBe(
      "The suburb Test Suburb does not exist in the state CA."
    );
  });
});
