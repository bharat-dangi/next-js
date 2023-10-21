import { gql } from "@apollo/client";
const CHECK_ADDRESS = gql`
  query callCheckAddress(
    $postalCode: String!
    $suburb: String!
    $state: String!
  ) {
    checkAddress(postalCode: $postalCode, suburb: $suburb, state: $state) {
      message
    }
  }
`;

export { CHECK_ADDRESS };
