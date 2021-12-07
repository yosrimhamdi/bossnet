const { BaseProvider } = require('@admin-bro/upload')
const path = require("path");
const fs = require('fs');
// note: this provider just for development we will use Amazon S3 for production
class UploadProvider extends BaseProvider {
    constructor(bucket = "") {
        super(path.join('/uploads', bucket));
    }

    async upload(file, key) {
        const uploadToPath = this.getUploadPath(key);
        this.createUploadDirIfNotExists(uploadToPath);
        console.log(uploadToPath);
        fs.copyFileSync(file.path, uploadToPath);
        return true
    }
    createUploadDirIfNotExists(filePath) {
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
    async delete(key) {
        // delete old file on update
        const filePathToDelete = this.path(key);
        if (fs.existsSync(filePathToDelete))
            fs.rmSync(filePathToDelete, { recursive: true });
        return true
    }
    getUploadPath(key) {
        return path.join(path.join(__dirname, '../../../../public', this.bucket), key)
    }
    path(key) {
        return path.join(this.bucket, key);
    }
}

module.exports = UploadProvider;