// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
// eslint-disable-next-line import/no-extraneous-dependencies
// const multerS3 = require('multer-s3');
// const AppError = require('../utils/appError');

// const s3 = new AWS.S3();

const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: '2023kwangstagram-uploader',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream
    })
    .promise();
  return Location;
};

module.exports = uploadToS3;
