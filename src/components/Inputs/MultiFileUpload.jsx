import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { toBase64 } from "../../utils/toBase64";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MultiFileUpload = ({ files, setFiles, serverFiles, setServerFiles }) => {
  const [showFiles, setShowFiles] = useState(false);
  //   const submitFiles = async () => {
  //     // const formattedFiles = await Promise.all(
  //     //   files.map(async (file) => {
  //     //     return {
  //     //       fileName: file.name,
  //     //       format: await toBase64(file),
  //     //     };
  //     //   })
  //     // );
  //     // console.log(formattedFiles);
  //     // await setServerFiles(formattedFiles);
  //     console.log(await serverFiles);
  //   };

  const deleteHandler = (name) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };
  useEffect(() => {
    if (files.length > 0) {
      const data = Promise.all(
        files?.map(async (file) => {
          return {
            fileName: file.name,
            format: await toBase64(file),
          };
        })
      ).then((data) => setServerFiles(data));
      
    }
    console.log(serverFiles);
  }, [files]);
  const handleSelectedFile = (event) => {
    const files = Array.from(event.target.files);

    for (let i = 0; i < files.length; i++) {
      setFiles((prev) =>
        prev.map((f) => f.name).includes(files[i].name)
          ? prev
          : [...prev, files[i]]
      );
    }
  };

  const showHandler = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <div>
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}>
        آپلود فایل
        <VisuallyHiddenInput
          type='file'
          accept='application/pdf'
          onChange={handleSelectedFile}
          multiple
        />
      </Button>

      {files.length === 0 ? null : (
        <React.Fragment>
          <Button onClick={() => setShowFiles(!showFiles)}>
            {showFiles ? "عدم نمایش فایل ها" : "نمایش فایل ها"}
          </Button>
          {showFiles ? (
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
              <List>
                {files.map((f) => (
                  <ListItem
                    key={f.name}
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        sx={{ color: "red" }}
                        onClick={() => deleteHandler(f.name)}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                    <ListItemAvatar onClick={() => showHandler(f)}>
                      <RemoveRedEyeIcon sx={{ cursor: "pointer" }} />
                    </ListItemAvatar>
                    <ListItemText primary={f.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : null}
        </React.Fragment>
      )}
      {/* {files?.length === 0 ? null : (
        <Button type='submit' onClick={submitFiles}>
          تائید فایل ها
        </Button>
      )} */}
    </div>
  );
};

export default MultiFileUpload;
