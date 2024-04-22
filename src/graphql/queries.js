import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query GetClients {
  clients {
    id
    name
    sections
    date
    files
  }
}

`;

export { GET_CLIENTS };
