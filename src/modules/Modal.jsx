import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Link, Tooltip } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ShowModal({ openModal, setOpenModal, modalFiles }) {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{ top: "10%", color: "red" }}>
            <CloseIcon />
          </IconButton>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            فایل ها
          </Typography>
          {modalFiles?.map((file, index) => (
            <Box
              key={index}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"row-reverse"}
              justifyContent={"left"}>
              <Box>
                <Typography>{file.fileName}</Typography>
              </Box>
              <Box>
                <Tooltip title='مشاهده' arrow enterDelay={1000}>
                  <IconButton href={file.data} target='_blank'>
                    <RemoveRedEye />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
