"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zipper = require("zip-local");
const moment = require("moment");
class ZipFile {
    compresse(sourceFolder = `${!process.env.IS_DEV ? `${process.cwd()}/dist` : `${process.cwd()}`}/api/base/asp`, distination = `${!process.env.IS_DEV ? `${process.cwd()}/dist` : `${process.cwd()}`}/api/public`) {
        const date = moment(new Date()).format('DD-MM-yyyy');
        const fileName = `project_${date}.zip`;
        return new Promise(resolve => {
            zipper.sync.zip(sourceFolder).compress().save(`${distination}/${fileName}`);
            resolve(fileName);
        });
    }
}
exports.ZipFile = ZipFile;
