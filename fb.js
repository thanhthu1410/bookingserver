"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToStorage = exports.storage = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const storage_2 = require("firebase/storage");
const firebaseConfig = {
    apiKey: "AIzaSyDGTcKKpzrp3DaGBW1_d_D1yo8hK9-JlIc",
    authDomain: "bookingsalon-7691b.firebaseapp.com",
    projectId: "bookingsalon-7691b",
    storageBucket: "bookingsalon-7691b.appspot.com",
    messagingSenderId: "712981041032",
    appId: "1:712981041032:web:379a1018c425afb266743d",
    measurementId: "G-P8FN8RZS82"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(app);
async function uploadFileToStorage(file, folderName, bufferData = undefined) {
    if (!file) {
        return false;
    }
    let fileRef;
    let metadata;
    if (!bufferData) {
        fileRef = (0, storage_2.ref)(exports.storage, `${folderName}/` + file.originalname);
    }
    else {
        fileRef = (0, storage_2.ref)(exports.storage, `${folderName}/` + file.originalname);
        metadata = {
            contentType: file.mimetype,
        };
    }
    let url;
    if (bufferData) {
        url = await (0, storage_2.uploadBytes)(fileRef, bufferData, metadata).then(async (res) => {
            return await (0, storage_2.getDownloadURL)(res.ref)
                .then(url => url)
                .catch(er => false);
        });
    }
    else {
        url = await (0, storage_2.uploadBytes)(fileRef, file).then(async (res) => {
            return await (0, storage_2.getDownloadURL)(res.ref)
                .then(url => url)
                .catch(er => false);
        });
    }
    return url;
}
exports.uploadFileToStorage = uploadFileToStorage;
//# sourceMappingURL=fb.js.map