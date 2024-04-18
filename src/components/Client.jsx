import React from "react";
import ClientInput from "./Inputs/ClientInput";
import ClientTable from "./Tables/ClientTable";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries";

const Client = () => {
  const {
    data: clientData,
    error: clientQueryError,
    loading: clientQueryLoading,
  } = useQuery(GET_CLIENTS);
console.log(clientData);
  return (
    <>
      <ClientInput />
      <ClientTable clientData={clientData} clientQueryLoading={clientQueryLoading} />
    </>
  );
};

export default Client;
