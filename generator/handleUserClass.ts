import { ClassReader } from './class-reader';
import * as fse from 'fs-extra';


export class HandleUserClass {


    constructor(modelsTs: string, publicPath: string) {
        const classes: Model[] = new ClassReader().methode(modelsTs);


        const user = classes.find(e => e.class.includes('user') || e.class.includes('utilisateur'));

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

    }

    propertyToCamelCase() {}

}

interface Model {
    class: string;
    properties: { name: string; type: string; }[];
}