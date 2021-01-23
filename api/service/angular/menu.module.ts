import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

const MENU_MODULE_TS = 'menu.module.ts';
const MY_MENU_COMPONENT_TS = 'my.menu.module.ts';


export class MenuModule {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {
        let menuModule = fse.readFileSync(`${this.configs.pathBaseFiles}/${MENU_MODULE_TS}`, 'utf8');
        
        let routes = `{ path: 'childLower$', loadChildren: () => import('./childLower$/childLower$.module').then(m => m.childCap$Module) },\r\n`;
        
        const adminFolder = `${this.configs.angularAppFolder}/admin`;

        this.configs.modules.map((e, i) => {

            let route = '';

            e.classes.map(c => {
                route = routes.replace(/childLower\$/g, this.helper.lowerFirst(c));
                route = route.replace(/childCap\$/g, this.helper.Cap(c));
            });

            let newMenuModule = menuModule
                .replace(/firstRoute\$/g, this.helper.lowerFirst(e.classes[0]))
                .replace(/\/\/generate/g, route)
                .replace(/menuCap\$/g, this.helper.Cap(e.module))
                .replace(/menuLow\$/g, this.helper.lowerFirst(e.module))
                ;

            fse.ensureDirSync(`${adminFolder}/${e.module}`);

            fse.writeFileSync(`${adminFolder}/${e.module}/${e.module}.module.ts`, newMenuModule);
        });

        return this;
    }

    generateMatMenu() {
        let myMenu = fse.readFileSync(`${this.configs.pathBaseFiles}/${MY_MENU_COMPONENT_TS}`, 'utf8');

        const modules = this.configs.modules;

        const items: IItems = modules.map(e => {
            return {
                name: e.module,
                items: e.classes.map(c => ({name: c, route: `/admin/${e.module}/${this.helper.lowerFirst(c)}`, items: []}))
            }
        });

        myMenu = myMenu.replace('//=valueItems', JSON.stringify(items, null, '  ').replace(/\"/g, `'`));

        fse.ensureDirSync(`${this.configs.angularAppFolder}/modules/menu`);

        fse.writeFileSync(`${this.configs.angularAppFolder}/modules/menu/${MY_MENU_COMPONENT_TS}`, myMenu);

    }
}


export interface IItems extends Array<{ name: string, route?: string, items: IItems }> {

}
