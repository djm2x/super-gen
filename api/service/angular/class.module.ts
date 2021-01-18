import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

const CLASS_MODULE_TS = 'class.module.ts';

export class ClassModule {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {
        // get content
        const adminFolder = `${this.configs.angularAppFolder}/admin`;

        let classModule = fse.readFileSync(`${this.configs.pathBaseFiles}/${CLASS_MODULE_TS}`, 'utf8');

        this.configs.classes.forEach(e => {
            // write content in new location
            const moduleName = this.helper.moduleName(this.configs.modules, e.class);
            const path = moduleName ? `${adminFolder}/${moduleName}` : adminFolder;
            
            let newClassModule = classModule
                .replace(/User\$/g, this.helper.Cap(e.class))
                .replace(/user/g, e.class);


            fse.ensureDirSync(`${path}/${e.class}`);
            fse.writeFileSync(`${path}/${e.class}/${e.class}.module.ts`, newClassModule);
        });
    }
}