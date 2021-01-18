import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

const ADMIN_ROUTING_MODULE_TS = 'admin-routing.module.ts';
const ADMIN_MODULE_TS = 'admin.module.ts';
const ADMIN_COMPONENT_HTML = 'admin.component.html';
const MODELS_TS = 'models.ts';


export class SuperMenu {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }

    generateTs() {
        let adminModule = fse.readFileSync(`${this.configs.pathBaseFiles}/${ADMIN_MODULE_TS}`, 'utf8');

        let routes = `{ path: 'childLower$', loadChildren: () => import('./childLower$/childLower$.module').then(m => m.childCap$Module) },\r\n`;

        const adminFolder = `${this.configs.angularAppFolder}/admin`;

        let route = '';

        const modules = this.configs.modules;

        modules.map((e, i) => {

            route += routes
                .replace(/childLower\$/g, this.helper.lowerFirst(e.module))
                .replace(/childCap\$/g, this.helper.Cap(e.module))
                ;
        });

        adminModule = adminModule
            .replace(/firstRoute\$/g, modules[0].module)
            .replace(/\/\/generate/g, route)
            ;

        fse.ensureDirSync(`${adminFolder}`);

        fse.writeFileSync(`${adminFolder}/admin.module.ts`, adminModule);

        return this;
    }


    generateHtml() {
        // get content
        const adminFolder = `${this.configs.angularAppFolder}/admin`;

        const modules = this.configs.modules;

        let adminHtml = fse.readFileSync(`${this.configs.pathBaseFiles}/${ADMIN_COMPONENT_HTML}`, 'utf8');
        // let imports = '';
        let routes = '';
        let navs = '';
        let navs2 = '';
        const menus = `
        <mat-list-item [routerLink]="['/${adminFolder}/{class}']" routerLinkActive="router-active">
            <span>{Class}s</span>
            <mat-divider></mat-divider>
        </mat-list-item>\r\n`;
        // edit content
        this.configs.classes.forEach(e => {

            // for ADMIN_ROUTING_MODULE_TS
            routes += `{ path: '${e.class}', loadChildren: () => import('./${e.class}/${e.class}.module').then(m => m.${this.helper.Cap(e.class)}Module), data: {animation: '${e.class}'} },\r\n`;

            // for ADMIN_COMPONENT_HTML
            if (e.class.includes('user') || this.helper.propertyPrimitiveLenght(e) <= 4) {
                // console.log(`>>>>>>>>>>>>>>nav 2 ${e.class} / ${this.helper.propertyPrimitiveLenght(e)}`);
                navs2 += menus.replace(/\{class\}/g, e.class);
                navs2 = navs2.replace(/\{Class\}/g, this.helper.Cap(e.class));
            } else {
                // console.log(`<<<<<<<<<<<<<<< nav 1 ${e.class} / ${this.helper.propertyPrimitiveLenght(e)}`);
                navs += menus.replace(/\{class\}/g, e.class);
                navs = navs.replace(/\{Class\}/g, this.helper.Cap(e.class));
            }

        });

        fse.copySync(`${this.configs.pathAbs}/api/public/${MODELS_TS}`, `${this.configs.angularAppFolder}/models/${MODELS_TS}`);
        this.helper.progress(`>> ${MODELS_TS} done`);

        return this;
    }
}