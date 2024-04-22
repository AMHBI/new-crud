import React, { useEffect, useState } from "react";

import { DELETE_CLIENT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { GET_CLIENTS } from "../../graphql/queries";

const ClientTable = ({
  clientQueryData,
  clientQueryLoading,
  setIsEditing,
  setEditRowData
}) => {
  const [clientData, setClientData] = useState([]);
  const [
    deleteClient,
    {
      data: deleteClientData,
      error: deleteClientError,
      loading: deleteClientLoading,
    },
  ] = useMutation(DELETE_CLIENT);

  useEffect(() => {
    if (clientQueryData) setClientData(clientQueryData.clients);

    return () => {
      if (clientQueryData) setClientData(clientQueryData.clients);
    };
  }, [clientQueryData]);

  const deleteHandler = (deleteId) => {
    deleteClient({
      variables: {
        id: deleteId,
      },
      refetchQueries:[GET_CLIENTS]
    });
  };
  console.log("clientQueryData :", clientQueryData);

  const editHandler = (client) => {
    setIsEditing(false)
    setEditRowData(client)
    setIsEditing(true)
  };
  if(clientQueryLoading)return <h1>Loading...</h1>
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>شماره ID مشتری</TableCell>
              <TableCell align='right'>نام مشتری</TableCell>
              <TableCell align='right'>تخصص ها</TableCell>
              <TableCell align='right'>تاریخ ایجاد</TableCell>
              <TableCell align='right'>فایل ها</TableCell>
              <TableCell align='right'>اقدامات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData ? (
              clientData?.map((i) => (
                <TableRow
                  key={i.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {i.id.slice(-5).concat("...")}
                  </TableCell>
                  <TableCell align='right'>{i.name}</TableCell>
                  <TableCell align='right'>
                    {JSON.parse(i.sections).map((section, index) => (
                      <pre key={index}> {section.name} </pre>
                    ))}
                  </TableCell>
                  <TableCell align='right'>
                    {new Date(+i.date).toLocaleDateString("fa")}
                  </TableCell>
                  <TableCell align='right'>{i.customerCreateDate}</TableCell>
                  <TableCell align='right'>
                    <Tooltip title='ویرایش' arrow enterDelay={2000}>
                      <IconButton onClick={() => editHandler(i)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='حذف' arrow enterDelay={2000}>
                      <IconButton onClick={() => deleteHandler(i.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h1>nothing...</h1>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientTable;
