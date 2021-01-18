import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

const MENU_MODULE_TS = 'menu.module.ts';


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
                .replace(/firstRoute\$/g, e.classes[0])
                .replace(/\/\/generate/g, route)
                .replace(/menuCap\$/g, this.helper.Cap(e.module))
                ;

            fse.ensureDirSync(`${adminFolder}/${e.module}`);

            fse.writeFileSync(`${adminFolder}/${e.module}/${e.module}.module.ts`, newMenuModule);
        })
    }
}