import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

const ADMIN_ROUTING_MODULE_TS = 'admin-routing.module.ts';
const ADMIN_MODULE_TS = 'admin.module.ts';
const ADMIN_COMPONENT_HTML = 'admin.component.html';
const MODELS_TS = 'models.ts';


export class MenuModule {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {

        // if (file === ADMIN_ROUTING_MODULE_TS) {
            // get content
            const adminFolder = `${this.configs.angularAppFolder}/admin`;

            let content = fse.readFileSync(`${this.configs.pathBaseFiles}/${ADMIN_ROUTING_MODULE_TS}`, 'utf8');
            let contentHtml = fse.readFileSync(`${this.configs.pathBaseFiles}/${ADMIN_COMPONENT_HTML}`, 'utf8');
            // let imports = '';
            let routes = '';
            let navs = '';
            let navs2 = '';
            let menus =
                `<mat-list-item [routerLink]="['/${adminFolder}/{class}']" routerLinkActive="router-active">
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
                    navs2 = navs2.replace(/\{Class\}/g, this.helper.Cap(e.class) );
                } else {
                    // console.log(`<<<<<<<<<<<<<<< nav 1 ${e.class} / ${this.helper.propertyPrimitiveLenght(e)}`);
                    navs += menus.replace(/\{class\}/g, e.class);
                    navs = navs.replace(/\{Class\}/g, this.helper.Cap(e.class) );
                }

            });


            content = content.replace('/*{routes}*/', routes);
            contentHtml = contentHtml.replace('{navs}', navs);
            contentHtml = contentHtml.replace('{navs2}', navs2);
            // write content in new location
            fse.ensureDirSync(`${this.configs.angularAppFolder}/${adminFolder}`);
            fse.writeFileSync(`${this.configs.angularAppFolder}/${adminFolder}/${ADMIN_ROUTING_MODULE_TS}`, content);
            fse.writeFileSync(`${this.configs.angularAppFolder}/${adminFolder}/${ADMIN_COMPONENT_HTML}`, contentHtml);

            this.helper.progress(`>> ${ADMIN_ROUTING_MODULE_TS} done`);
            this.helper.progress(`>> ${ADMIN_COMPONENT_HTML} done`);
            
            if (true /*this.configs.initFiles*/) {
                fse.copySync(`${this.configs.angularAppFolder}/${ADMIN_MODULE_TS}`, `${this.configs.angularAppFolder}/${adminFolder}/${ADMIN_MODULE_TS}`);
                this.helper.progress(`>> ${ADMIN_MODULE_TS} done`);
            }

            fse.copySync(`${this.configs.pathAbs}/api/public/${MODELS_TS}`, `${this.configs.angularAppFolder}/models/${MODELS_TS}`);
            this.helper.progress(`>> ${MODELS_TS} done`);
        // }
    }
}