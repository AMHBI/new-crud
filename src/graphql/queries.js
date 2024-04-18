import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query GetClient {
    clients {
      id
      name
      sections
      clientDate
      files {
        fileName
        url
      }
    }
  }
`;

export { GET_CLIENTS };
