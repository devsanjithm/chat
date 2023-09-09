// import AWS from "aws-sdk";
// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// const bucketName = process.env.AWS_BUCKETNAME;
// const region = process.env.AWS_BUCKETREGION;
// const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
// const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;
// const storage = multer.memoryStorage();

// const s3Config = new AWS.S3({
//   accessKeyId: accessKeyId,
//   secretAccessKey: secretAccessKey,
//   region: region,
// });

// const fileFilter = (req, file, cb) => {
//   if (!file) {
//     cb(new Error("File is required"), false);
//   }
//   if (file.mimetype.split("/")[0] === "image") {
//     cb(null, true);
//   } else {
//     cb(new Error("LIMIT_UNEXPECTED_FILE"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 3 },
// });
// export default upload;

// export const s3CreateObject = async (files, fileName) => {
//   const params = files.map((file) => {
//     return {
//       Bucket: bucketName,
//       Key: fileName ? `${fileName}` : `${uuidv4()}`,
//       Body: file.buffer,
//       ACL: "public-read",
//       CacheControl: "max-age=6400",
//       ContentType: file.mimetype,
//     };
//   });

//   return await Promise.all(
//     params.map((param) => {
//       return s3Config.upload(param).promise();
//     })
//   );
// };

// export const s3DeleteObject = async (file) => {
//   var param = { Bucket: bucketName, Key: file };
//   if (file) {
//     var deletePromise = new Promise(async function (resolve, reject) {
//       await s3Config.deleteObject(param, function (err, data) {
//         if (err) {
//           reject(data);
//         } else {
//           resolve(data);
//         }
//       });
//     });

//     return deletePromise;
//   }
// };
