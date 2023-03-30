const { response, request } = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const File = require('../models/tools/file.model')
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { app = "", codeProject = "" } = req.query;
        const uploadPath = path.join('uploads', 'files');
        fs.ensureDirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const storageMul = multer.diskStorage({
    destination: (req, file, cb) => {
        const { app = "", codeProject = "" } = req.query;
        const uploadPath = path.join('uploads', app, codeProject);
        fs.ensureDirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');
const uploads = multer({ storage: storageMul }).array('files');

function uploadFile(req = request, res = response, next) {
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        const file = new File(req.file);
        const fileSaved = await file.save()
        return res.status(200).send(fileSaved)
    })
}

async function uploadFiles(req = request, res = response, next) {
    uploads(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        const files = req.files;
        const filesSaved = [];
        Promise.all(
                files.map(async(file) => {
                    let newFile = new File(file);
                    const fileSaved = await newFile.save();
                    filesSaved.push(fileSaved);
                })
            )
            .then(() => {
                return res.status(200).send(filesSaved);
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    });
}
module.exports = {
    uploadFile,
    uploadFiles
}