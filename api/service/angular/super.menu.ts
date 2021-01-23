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
            .replace(/firstRoute\$/g, this.helper.lowerFirst(modules[0].module))
            .replace(/\/\/generate/g, route)
            ;

        fse.ensureDirSync(`${adminFolder}`);

        fse.writeFileSync(`${adminFolder}/admin.module.ts`, adminModule);

        return this;
    }


    generateHtml() {
        const modules = this.configs.modules;

        let adminHtml = fse.readFileSync(`${this.configs.pathBaseFiles}/${ADMIN_COMPONENT_HTML}`, 'utf8');
        let matExpansionPanel = '';
        const menu = `
        <mat-list-item [routerLink]="['/admin/{parent}/{class}']" routerLinkActive="router-active">
            <span>{Class}s</span>
            <mat-divider></mat-divider>
        </mat-list-item>\r\n`;

        const expansionPanel = `
        <mat-expansion-panel [expanded]="actuelRoute.includes('{parent}')"
        [ngClass]="{'router-link-active': actuelRoute.includes('{parent}') }" (opened)="panelOpenState = true" (closed)="panelOpenState = false">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    {parent}
                </mat-panel-title>
            </mat-expansion-panel-header>
            <mat-divider></mat-divider>
            {navs}
        </mat-expansion-panel>\r\n`;

        this.configs.modules.map(e => {

            matExpansionPanel += expansionPanel.replace(/\{parent\}/g, e.module);

            let navs = '';

            e.classes.map(c => {
                navs += menu
                    .replace(/\{parent\}/g, e.module)
                    .replace(/\{class\}/g, this.helper.lowerFirst(c))
                    .replace(/\{Class\}/g, this.helper.Cap(c))
                    ;
            });

            matExpansionPanel = matExpansionPanel.replace(/\{navs\}/g, navs);
        })

        adminHtml = adminHtml.replace('{mat-expansion-panel}', matExpansionPanel)

        fse.ensureDirSync(`${this.configs.angularAppFolder}/admin`);

        fse.writeFileSync(`${this.configs.angularAppFolder}/admin/${ADMIN_COMPONENT_HTML}`, adminHtml);

        this.helper.progress(`>> ${ADMIN_COMPONENT_HTML} done`);

        return this;
    }

    copyModels() {
        fse.copySync(`${this.configs.pathAbs}/api/public/${MODELS_TS}`, `${this.configs.angularAppFolder}/models/${MODELS_TS}`);
    }
}