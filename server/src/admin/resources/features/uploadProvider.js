const { BaseProvider } = require('@admin-bro/upload')
const path = require("path");
const fs = require('fs');
// note: this provider just for development we will use Amazon S3 for production
class UploadProvider extends BaseProvider {
    constructor(bucket = "") {
        super(path.join('/uploads', bucket));
    }

    upload(file, key) {
        const uploadToPath = this.getUploadPath(key);
        this.createUploadDirIfNotExists(uploadToPath);
        fs.copyFileSync(file.path, uploadToPath);
        return true
    }
    createUploadDirIfNotExists(filePath) {
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
    delete(key) {
        // delete old file on update
        const filePathToDelete = this.getUploadPath(key);
        if (fs.existsSync(filePathToDelete)) {
            fs.rmSync(filePathToDelete, { recursive: true });
            this.deleteFileDirIfEmpty(filePathToDelete);
        }
        return true
    }
    deleteFileDirIfEmpty(filePath) {
        const folderToDelete = path.join(filePath, "..");
        const dirIsEmpty = fs.readdirSync(folderToDelete).length == 0;
        if (dirIsEmpty)
            fs.rmdirSync(folderToDelete);
    }
    getUploadPath(key) {
        return path.join(path.join(__dirname, '../../../../public', this.bucket), key)
    }
    path(key) {
        return path.join(this.bucket, key);
    }
}

module.exports = UploadProvider;