const minio = require("minio");
const minioClient = new minio.Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "Q3AM3UQ867SPQQA43P2F",
  secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
});

const bucketName = "binar-hasta";
module.exports = { minioClient, bucketName };