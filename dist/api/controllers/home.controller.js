"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const generate_1 = require("../service/generate");
const fse = require("fs-extra");
const typedi_1 = require("typedi");
const zip_file_1 = require("../service/zip.file");
const moment = require("moment");
let HomeController = class HomeController {
    constructor() {
        this.service = typedi_1.default.get(generate_1.Generate);
        this.zipService = typedi_1.default.get(zip_file_1.ZipFile);
    }
    create() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // fse.copySync(`${process.cwd()}/api/services/app_source`, `${process.cwd()}/api/services/asp`);
            console.log('dsdsds1');
            this.service.methode();
            console.log('dsdsds4');
            // fse.copySync('./asp', '../generated_app')
            return yield this.zipService.compresse();
        });
    }
    test() {
        return ['me', 'you'];
    }
    uploadFiles(folder, files, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // if (!allowedMimeTypes.includes(file.mimetype)) {
            //     throw new BadRequestError(`${file.mimetype} is not a supported file type!`);
            // }
            if (files.length === 0) {
                return res.status(500).send('File null');
            }
            const pathAbs = !process.env.IS_DEV ? `${process.cwd()}/dist` : `${process.cwd()}`;
            const path = `${pathAbs}/api/public`;
            fse.ensureDirSync(`${path}`);
            const date = moment(new Date()).format('DD-MM-yyyy');
            const fileName = `${date}_${files[0].originalname}`;
            fse.writeFileSync(`${path}/${fileName}`, files[0].buffer);
            fse.copySync(`${pathAbs}/api/base/app_source`, `${pathAbs}/api/base/asp`);
            this.service.methode(fileName);
            // fse.copySync('./asp', '../generated_app')
            const url = yield this.zipService.compresse();
            return { message: 'Ok', url };
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/create')
], HomeController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/test')
], HomeController.prototype, "test", null);
tslib_1.__decorate([
    routing_controllers_1.Post("/uploadFiles/:folder"),
    tslib_1.__param(0, routing_controllers_1.Param('folder')), tslib_1.__param(1, routing_controllers_1.UploadedFiles("files")), tslib_1.__param(2, routing_controllers_1.Res())
], HomeController.prototype, "uploadFiles", null);
HomeController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/home')
], HomeController);
exports.HomeController = HomeController;
