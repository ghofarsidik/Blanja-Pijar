import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function ModalAddProduct({ handleOpen, open, handleChangeImage }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add photo for product</DialogHeader>
        <DialogBody>
          <input type="file" multiple onChange={handleChangeImage} />
          <p className="text-sm mt-1">You can choose multiple file, format file (jpg, png, jpeg) max size 2mb</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
