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
import { Button, IconButton, Tooltip } from "@mui/material";
import { GET_CLIENTS } from "../../graphql/queries";
import { decodedFile } from "../../utils/base64ToFile";
import ShowModal from "../../modules/Modal";

// const ShowModal =  ({onClick,onClose,open,url}) => {
//   return  (
//     <Modal
//       open={open}
//       onClose={onClose}
//       // className={classes.modal}
//       aria-labelledby="file-modal"
//       aria-describedby="file-modal-description"
//     >
//       <div >
//         <iframe title="file-preview" src={decodedFile(url)} style={{ width: '100%', height: '500px' }} />
//       </div>
//     </Modal>
//   );
// }

const ClientTable = ({
  clientQueryData,
  clientQueryLoading,
  setIsEditing,
  setEditRowData,
}) => {
  const [clientData, setClientData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileString, setFileString] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalFiles, setModalFiles] = useState(undefined);

  const showFilesInModal = (filesArray) => {
    const newArray = filesArray.map((item) => {
      return { fileName: item.fileName, data: decodedFile(item.format) };
    });
    setModalFiles(newArray);
    setOpenModal(true);
    console.log(newArray);
  };
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
      refetchQueries: [GET_CLIENTS],
    });
  };

  const editHandler = (client) => {
    setEditRowData(client);
    setIsEditing(true);
  };

  if (clientQueryLoading) return <h1>Loading...</h1>;
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
                  <TableCell align='right'>
                    {!!JSON.parse(i.files).length && (
                      <>
                        {JSON.parse(i.files).length}
                        <Button
                          onClick={() => showFilesInModal(JSON.parse(i.files))}>
                          نمایش فایل ها
                        </Button>
                        <ShowModal
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                          modalFiles={modalFiles}
                        />
                      </>
                    )}
                  </TableCell>
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
      {/* <ShowModal open={modalOpen} onClose={handleModalClose}  url={fileString}/> */}
    </div>
  );
};

export default ClientTable;
