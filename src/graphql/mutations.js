import { gql } from "@apollo/client";

const CREATE_CLIENT = gql`
  mutation createClient(
    $name: String!
    $sections: String!
    $date: String!
    $files: String!
  ) {
    createClient(
      data: { name: $name, sections: $sections, files: $files, date: $date }
    ) {
      files
      date
      id
      name
      sections
    }
  }
`;
const PUBLISH_CLIENT = gql`
  mutation publishClient($id: ID) {
    publishClient(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;
const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID) {
    deleteClient(where: { id: $id }) {
      id
    }
  }
`;
const EDIT_CLIENT = gql`
  mutation editClient(
    $sections: String
    $name: String
    $files: String
    $date: String
    $id: ID
  ) {
    updateClient(
      where: { id: $id }
      data: { date: $date, files: $files, name: $name, sections: $sections }
    ) {
      date
      files
      id
      name
      sections
    }
  }
`;
export { CREATE_CLIENT, PUBLISH_CLIENT, DELETE_CLIENT, EDIT_CLIENT };
