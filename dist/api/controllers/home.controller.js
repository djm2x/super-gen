"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const fse = require("fs-extra");
const typedi_1 = require("typedi");
const zip_file_1 = require("../service/zip.file");
const moment = require("moment");
const generate_angular_1 = require("../service/generate.angular");
const generate_asp_1 = require("../service/generate.asp");
const handleUserClass_1 = require("../service/handleUserClass");
let HomeController = class HomeController {
    constructor() {
        this.serviceFront = typedi_1.default.get(generate_angular_1.GenerateAngular);
        this.serviceBack = typedi_1.default.get(generate_asp_1.GenerateAsp);
        this.zipService = typedi_1.default.get(zip_file_1.ZipFile);
        this.config = {
            wholeProject: false,
            generateFolder: false,
            removeAspFolder: false,
            initFiles: false,
            addTabsInListPage: true,
        };
    }
    // @Get('/create')
    create() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pathAbs = !process.env.IS_DEV ? `${process.cwd()}/dist` : `${process.cwd()}`;
            const path = `${pathAbs}/api/public`;
            // add user if not existe in models.ts
            try {
                new handleUserClass_1.HandleUserClass('models.ts', path);
                let asp_folder = `${pathAbs}/api/base/asp`;
                if (this.config.removeAspFolder) {
                    if (fse.pathExistsSync(`${asp_folder}`)) {
                        fse.removeSync(`${asp_folder}`);
                        // console.log('fse.removeSync(`${t}`)')
                        // fse.mkdirSync(`${t}`, {mode: 777});
                    }
                }
                // const r = await new Promise(res => setTimeout(() => res(true), 1000));
                // console.log('promise done', r)
                fse.ensureDirSync(`${asp_folder}`, { mode: 777 });
                // console.log('fse.ensureDirSync(`${t}`, {mode: 777})');
                if (this.config.wholeProject) {
                    fse.copySync(`${process.cwd()}/api/services/app_source`, `${process.cwd()}/api/services/asp`);
                    fse.copySync(`${pathAbs}/api/base/app_source`, `${asp_folder}`);
                }
                this.serviceFront.methode(this.config);
                this.serviceBack.methode(this.config);
                // our test folder project
                asp_folder = `${pathAbs}/generated_app2`;
                fse.pathExistsSync(`${asp_folder}/Controllers`) ? fse.removeSync(`${asp_folder}/Controllers`) : asp_folder = asp_folder;
                fse.pathExistsSync(`${asp_folder}/Migrations`) ? fse.removeSync(`${asp_folder}/Migrations`) : asp_folder = asp_folder;
                fse.pathExistsSync(`${asp_folder}/angular/src`) ? fse.removeSync(`${asp_folder}/angular/src`) : asp_folder = asp_folder;
                fse.pathExistsSync(`${asp_folder}/Models`) ? fse.removeSync(`${asp_folder}/Models`) : asp_folder = asp_folder;
                console.log('delete done');
                if (this.config.generateFolder) {
                    fse.copySync(`${pathAbs}/api/base/asp`, `${pathAbs}/generated_app2`, { overwrite: true });
                }
                console.log('copy done');
                // setTimeout(() => {
                // }
                //   , 1000)
            }
            catch (e) {
                console.log(e);
            }
            return ''; //await this.zipService.compresse();
        });
    }
    test() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const p = new Promise(r => setInterval(() => r({ 'msg': `doen at ${moment(new Date()).format('HH:mm:ss')}` }), 500));
            return yield p;
        });
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
            new handleUserClass_1.HandleUserClass(fileName, path);
            // write file uploaded in public folder
            fse.writeFileSync(`${path}/${fileName}`, files[0].buffer);
            const pathAppGenerated = `${pathAbs}/api/base/asp`;
            if (fse.pathExistsSync(pathAppGenerated)) {
                fse.removeSync(pathAppGenerated);
                fse.ensureDirSync(pathAppGenerated);
            }
            fse.copySync(`${pathAbs}/api/base/app_source`, pathAppGenerated);
            this.serviceFront.methode(this.config);
            this.serviceBack.methode(this.config);
            // fse.copySync('./asp', '../generated_app')
            const url = yield this.zipService.compresse();
            return { message: 'Ok', url };
        });
    }
};
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
