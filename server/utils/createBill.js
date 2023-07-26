import fs from 'fs';
import multer from 'multer';
import { Express } from 'express';
import excelToJson from 'convert-excel-to-json';

global.__basedir = __dirname

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, __basedir + '/facturas/')
    },
    filename: (req, res, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage: storage});

app.post('/api/subirArchivo', upload.single('uploadFile'), (req, res) => {
    importExcelData2Mongo(__basedir + '/facturas/' + req.file.filename);
    res.json({
        'Mensaje': 'Se subió el archivo correctamente', 'file': req.file 
    })
});

const importExcelData2Mongo = (filePath) = {
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            name: 'barberBoss',

            // header row -> be Skipped and will not be present at ouru result object
            header: {
                rows: 1
            }
        }]
    })
}