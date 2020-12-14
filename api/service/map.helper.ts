import * as fse from 'fs-extra';
import { ClassReader } from './class-reader';
import { HelperFunctions, Model, IConfig } from './helper.functions';
import Container from 'typedi';
import { MenuModule } from './angular/menu.module';
import { UowClass } from './angular/uow.class';
import { ClassComponent } from './angular/class.component';
import { UpdateComponent } from './angular/update.component';
import { DataSeeding } from './asp/data.seeding';
import { MyContext } from './asp/my.context';
import { ClassController } from './asp/class.controller';
import { AccountController } from './asp/account.controller';
import { ModelsHandler } from './angular/models.handler';

const ADMIN_ROUTING_MODULE_TS = 'admin-routing.module.ts';
const ADMIN_MODULE_TS = 'admin.module.ts';
const ADMIN_COMPONENT_HTML = 'admin.component.html';
const UOW_SERVICE_TS = 'uow.service.ts';

const USER_ROUTING_MODULE_TS = 'class-routing.module.ts';
const USER_MODULE_TS = 'class.module.ts';

const USER_COMPONENT_HTML = 'class.component.html';
const USER_COMPONENT_SCSS = 'class.component.scss';
const USER_COMPONENT_TS = 'class.component.ts';

const UPDATE_COMPONENT_HTML = 'update.component.html';
const UPDATE_COMPONENT_SCSS = 'update.component.scss';
const UPDATE_COMPONENT_TS = 'update.component.ts';


const USER_SERVICE_TS = 'class.service.ts';
const MODELS_TS = 'models.ts';

export interface IConfigs {
    pathAbs: string;
    angularAppFolder: string;
    aspFolder: string;
    currentBaseFile: string;
    pathBaseFiles: string;
    replaceModels: boolean;
    classes: Model[]
}

export class MapHelper {
    private pathAbs = !process.env.IS_DEV ? `${process.cwd()}/dist` : `${process.cwd()}`;
    private generatedAppPath = `${this.pathAbs}/generated_app`;
    private helper: HelperFunctions = Container.get(HelperFunctions);

    private configs = {
        pathAbs: this.pathAbs,
        angularAppFolder: `${this.generatedAppPath}/angular/src/app`,
        aspFolder: this.generatedAppPath,
        currentBaseFile: '',
        pathBaseFiles: '',
        replaceModels: true,
        classes: new ClassReader().methode(MODELS_TS),
    }

    constructor() { }

    mapAngular() {
        // const primitivetypes = ['string', 'boolean', 'Date', 'number'];
        this.configs.pathBaseFiles = `${this.pathAbs}/api/service/angular/base.files`;

        const angularBaseFiles = fse.readdirSync(this.configs.pathBaseFiles);

        angularBaseFiles.forEach(file => {

            this.configs.currentBaseFile = file;

            new ModelsHandler(this.helper, this.configs).generateTs();

            switch (file) {
                // case ADMIN_ROUTING_MODULE_TS: new MenuModule(this.helper, configs).generateTs(); break;
                // case USER_ROUTING_MODULE_TS: new MenuModule(this.helper, configs); break;
                // case USER_MODULE_TS: new MenuModule(this.helper, configs); break;
                
                case USER_COMPONENT_HTML: new ClassComponent(this.helper, this.configs).generateHTMLCss(); break;
                case USER_COMPONENT_TS: new ClassComponent(this.helper, this.configs).generateTs(); break;
                
                case UPDATE_COMPONENT_HTML: new UpdateComponent(this.helper, this.configs).generateHTMLCss(); break;
                case UPDATE_COMPONENT_TS: new UpdateComponent(this.helper, this.configs).generateTs(); break;
                
                case UOW_SERVICE_TS: new UowClass(this.helper, this.configs).generateTs(); break;
            
                default: break;
            }
        });

        console.log('       angular generation done');
    }

    mapAsp() {
        const DATASEEDING_CS = 'DataSeeding.cs';
        const MYCONTEXT_CS = 'MyContext.cs';
        const ACCOUNTSCONTROLLER_CS = 'AccountsController.cs';
        const CLASSCONTROLLER_CS = 'UsersController.cs';

        // const primitivetypes = ['string', 'boolean', 'Date', 'number'];

        this.configs.pathBaseFiles = `${this.pathAbs}/api/service/asp/base.files`;

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
}


// launch programme
 
const m = new MapHelper();

m.mapAngular();

m.mapAsp();