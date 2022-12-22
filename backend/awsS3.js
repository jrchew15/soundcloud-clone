const AWS = require('aws-sdk');

const NAME_OF_BUCKET = process.env.NAME_OF_BUCKET

const multer = require('multer');

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
        ACL: "public-read",
        ContentType: mimetype
    };
    const result = await s3.upload(uploadParams).promise().catch((e) => {
        throw new Error('File upload failed')
    });

    // save the name of the file in your bucket as the key in your database to retrieve for later
    return result.Location;
};

const multiplePublicFileUpload = async (files) => {
    return await Promise.all(
        files.map((file) => {
            return singlePublicFileUpload(file);
        })
    );
};

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

const singleMulterUpload = (nameOfKey) =>
    multer({ storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
    multer({ storage }).array(nameOfKey);
const fieldsMulterUpload = (fieldsArr) =>
    multer({ storage }).fields(fieldsArr.map(field => ({ name: field, maxCount: 1 })))

async function deleteSinglePublicFile(key) {
    const result = await s3.deleteObject({
        Bucket: NAME_OF_BUCKET,
        Key: key
    }).promise().catch((e) => {
        throw new Error(`Failed to delete ${key}`)
    });

    return { 'message': 'Successfully deleted' }
}

module.exports = {
    s3,
    singlePublicFileUpload,
    singleMulterUpload,
    multiplePublicFileUpload,
    multipleMulterUpload,
    fieldsMulterUpload,
    deleteSinglePublicFile,
    NAME_OF_BUCKET
}
