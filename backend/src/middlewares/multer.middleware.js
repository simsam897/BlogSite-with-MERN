import express from "express";
import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"), false);
  }
};

const storage = multer.memoryStorage();
const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;
