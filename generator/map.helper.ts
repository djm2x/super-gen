import * as fse from 'fs-extra';
import { ClassReader } from './class-reader';
import { HelperFunctions, Model, IConfig } from './helper.functions';
import { SuperMenu } from './angular/super.menu';
import { UowClass } from './angular/uow.class';
import { ClassComponent } from './angular/class.component';
import { UpdateComponent } from './angular/update.component';
import { DataSeeding } from './asp/data.seeding';
import { MyContext } from './asp/my.context';
import { ClassController } from './asp/class.controller';
import { AccountController } from './asp/account.controller';
// import { ModelsHandler } from './angular/models.handler';
import { ClassModule } from './angular/class.module';
import { MenuModule } from './angular/menu.module';
import { Entities } from './java/entities';

const ADMIN_MODULE_TS = 'admin.module.ts';
const ADMIN_COMPONENT_HTML = 'admin.component.html';

const UOW_SERVICE_TS = 'uow.service.ts';

const MENU_MODULE_TS = 'menu.module.ts';

const CLASS_ROUTING_MODULE_TS = 'class-routing.module.ts';
const CLASS_MODULE_TS = 'class.module.ts';

const CLASS_COMPONENT_HTML = 'class.component.html';
const CLASS_COMPONENT_SCSS = 'class.component.scss';
const CLASS_COMPONENT_TS = 'class.component.ts';

const UPDATE_COMPONENT_HTML = 'update.component.html';
const UPDATE_COMPONENT_SCSS = 'update.component.scss';
const UPDATE_COMPONENT_TS = 'update.component.ts';


const CLASS_SERVICE_TS = 'class.service.ts';
// const MODELS_TS = 'models.ts';


export class MapHelper {
    private pathAbs = this.isDev ? `${process.cwd()}` : `${process.cwd()}/dist`;
    private generatedAppPath0 = `${this.pathAbs}/generated_app`;
    private generatedAppPath = `${this.pathAbs}/test`;
    private helper = new HelperFunctions();
    private modelsTs = `${this.pathAbs}/generator/models.ts`;

    private configs: IConfigs = {
        pathAbs: this.pathAbs,
        modelsTs: this.modelsTs,
        angularAppFolder: `${this.generatedAppPath}/angular/src/app`,
        aspFolder: this.generatedAppPath,
        currentBaseFile: '',
        pathBaseFiles: '',
        replaceModels: true,
        classes: new ClassReader().methode(this.modelsTs) as Model[],
        modules: [],
        configJson: {appname: 'untitled', apptitle: 'untitled'}
    }

    constructor(private isDev: boolean) { }

    onInit() {
        // remove old code generated

        if (this.generatedAppPath.includes('test') && fse.pathExistsSync(this.configs.aspFolder)) {
            fse.removeSync(this.configs.aspFolder)
        }


        const i = this.configs.classes.findIndex(e => e.class.includes('options'.toLowerCase()));

        if (i > -1) {
            try {
                const { Options } = require(this.modelsTs);

                this.configs.classes.splice(i, 1);

                const opt: IOptions = new Options();

                for (const [module, classes] of Object.entries(opt.modules)) {
                    this.configs.modules.push({ module, classes })
                }

                this.configs.configJson = opt.configJson;
            } catch (error) {
                const e: Error = error;

                console.log(e.message)
            }

        }
    }

    mapAngular() {
        // const primitivetypes = ['string', 'boolean', 'Date', 'number'];
        this.configs.pathBaseFiles = `${this.pathAbs}/generator/angular/base.files`;

        const angularBaseFiles = fse.readdirSync(this.configs.pathBaseFiles);


        // will be executer foreach file in folder base
        angularBaseFiles.forEach(file => {

            this.configs.currentBaseFile = file;

            // new ModelsHandler(this.helper, this.configs).generateTs();

            switch (file) {

                case MENU_MODULE_TS: new MenuModule(this.helper, this.configs).generateTs().generateMatMenu(); break;

                case ADMIN_MODULE_TS: new SuperMenu(this.helper, this.configs).generateTs().generateHtml().copyModels(); break;

                case CLASS_ROUTING_MODULE_TS: new ClassModule(this.helper, this.configs); break;
                case CLASS_MODULE_TS: new ClassModule(this.helper, this.configs).generateTs(); break;

                case CLASS_COMPONENT_HTML: new ClassComponent(this.helper, this.configs).generateHTMLCss(); break;
                case CLASS_COMPONENT_TS: new ClassComponent(this.helper, this.configs).generateTs(); break;


                case UPDATE_COMPONENT_HTML: new UpdateComponent(this.helper, this.configs).generateHTMLCss(); break;
                case UPDATE_COMPONENT_TS: new UpdateComponent(this.helper, this.configs).generateTs(); break;

                case UOW_SERVICE_TS: new UowClass(this.helper, this.configs).generateTs().writeConfigs(); break;

                default: break;
            }
        });

        console.log('angular generation done');
    }

    mapAsp() {
        const DATASEEDING_CS = 'DataSeeding.cs';
        const MYCONTEXT_CS = 'MyContext.cs';
        const ACCOUNTSCONTROLLER_CS = 'AccountsController.cs';
        const CLASSCONTROLLER_CS = 'UsersController.cs';

        this.configs.pathBaseFiles = `${this.pathAbs}/generator/asp/base.files`;

        const aspBaseFiles = fse.readdirSync(this.configs.pathBaseFiles);

        aspBaseFiles.forEach(file => {

            switch (file) {
                case DATASEEDING_CS: new DataSeeding(this.helper, this.configs).generateTs(); break;
                case MYCONTEXT_CS: new MyContext(this.helper, this.configs).generateTs(); break;

                case CLASSCONTROLLER_CS: new ClassController(this.helper, this.configs).generateTs(); break;
                case ACCOUNTSCONTROLLER_CS: new AccountController(this.helper, this.configs).generateTs(); break;

                default: break;
            }
        });

        console.log('       asp generation done');
    }

    mapJava() {
        const DATASEEDING_CS = 'DataSeeding.cs';
        const MODEL = 'model.java';
        const ACCOUNTSCONTROLLER_CS = 'AccountsController.cs';
        const CLASSCONTROLLER_CS = 'UsersController.cs';

        this.configs.pathBaseFiles = `${this.pathAbs}/generator/java/base.files`;

        const javaBaseFiles = fse.readdirSync(this.configs.pathBaseFiles);

        javaBaseFiles.forEach(file => {

            switch (file) {
                case MODEL: new Entities(this.helper, this.configs).generateTs(); break;
                // case DATASEEDING_CS: new DataSeeding(this.helper, this.configs).generateTs(); break;

                // case CLASSCONTROLLER_CS: new ClassController(this.helper, this.configs).generateTs(); break;
                // case ACCOUNTSCONTROLLER_CS: new AccountController(this.helper, this.configs).generateTs(); break;

                default: break;
            }
        });

        console.log('       asp generation done');
    }
}


export interface IConfigs {
    pathAbs: string;
    modelsTs: string;
    angularAppFolder: string;
    aspFolder: string;
    currentBaseFile: string;
    pathBaseFiles: string;
    replaceModels: boolean;
    classes: Model[],
    modules: { module: string, classes: string[] }[];
    configJson: {
        apptitle: string;
        appname: string;
    }
}

export interface IOptions {
    modules: {
        settings: string[],
        admin: string[],
        [key: string]: string[],
    };
    configJson: {
        apptitle: string;
        appname: string;
    }
}