import React from "react";
import { Button, Box } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddFilesBtn = () => {
  return (
    <div>
      <Button variant="outlined" component="label" startIcon={<PlaylistAddIcon />}>
        Choose files to add
        <input type="file" hidden />
      </Button>
    </div>
  );
};

export default AddFilesBtn;
