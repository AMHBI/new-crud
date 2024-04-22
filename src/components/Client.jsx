import React, { useCallback, useEffect, useState } from "react";
import ClientInput from "./Inputs/ClientInput";
import ClientTable from "./Tables/ClientTable";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries";
import {
  CREATE_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  PUBLISH_CLIENT,
} from "../graphql/mutations";
import { DevTool } from "@hookform/devtools";

const Client = () => {
  //States
  const [isEditing, setIsEditing] = useState(false);
  const [editRowData,setEditRowData]=useState(null);
 
  // Query:

  //all client
  const {
    data: clientQueryData,
    error: clientQueryError,
    loading: clientQueryLoading,
  } = useQuery(GET_CLIENTS);


  //Edit Client


  //Delete Client
  console.log(clientQueryData);

  const RenderTable = useCallback(() => {
    return (
      <ClientTable
        //Data
        clientQueryData={clientQueryData}
        clientQueryLoading={clientQueryLoading}
        //Functions
        setIsEditing={setIsEditing}
        setEditRowData= {setEditRowData}
        
      />
    );
  }, [clientQueryData]);
  return (
    <>
      <ClientInput
        //Data
        isEditing={isEditing}
        editRowData={editRowData}
        //Functions
        setIsEditing={setIsEditing}

      />
      <RenderTable />
    </>
  );
};

export default Client;
