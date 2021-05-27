import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

export class ModelsHandler {

    constructor(private helper: HelperFunctions, private configs: IConfigs) { }

    generateTs() {
        const modelsTs = this.configs.modelsTs;
        const publicPath = `${this.configs.pathAbs}/api/public`;



        const user = this.configs.classes.find(e => e.class.includes('user') || e.class.includes('utilisateur'));

        if (user === null) {
            const cls = `
            export class User {
                id = 0;
                email = '';
                password = '';
                isActive = false;
                emailVerified = false;
                codeOfVerification = '';
            }\r\n\r\n
            `;
            let content = fse.readFileSync(`${publicPath}/${modelsTs}`, 'utf8');

            content = cls + content;

            fse.writeFileSync(`${publicPath}/${modelsTs}`, content);
            
            console.log(`>> ${publicPath}/${modelsTs} done`);
        } else { }

        if (this.configs.replaceModels) {
            fse.copySync(`${this.configs.pathAbs}/api/public/${modelsTs}`, `${this.configs.angularAppFolder}/models/${modelsTs}`)
        }
    }

    propertyToCamelCase() {}

}
