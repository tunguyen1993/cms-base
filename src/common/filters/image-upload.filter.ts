export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};
