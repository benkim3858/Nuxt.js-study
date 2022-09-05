const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { v4: get_uuid } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(path.join(__dirname, '../../uploads'), {recursive: true});
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, `${get_uuid()}.${file.originalname.split('.').pop()}`);
    }
})

const upload = multer({storage});

module.exports = upload.array('files');
