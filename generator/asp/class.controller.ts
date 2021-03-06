import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

const USERSCONTROLLER_CS = 'UsersController.cs';
const SUPERCONTROLLER_CS = 'SuperController.cs';
export class ClassController {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }

    generateTs() {
        let content = fse.readFileSync(`${this.configs.pathBaseFiles}/${USERSCONTROLLER_CS}`, 'utf8');
        // edit content
        this.configs.classes.forEach(e => {
            let whereClause = '';
            let params = '';
            let params2 = '';
            let includes = '';
            let select = `.Select(e => new \r\n${this.helper.spaceTab(4)}{\r\n${this.helper.spaceTab(5)}`;

            e.properties.forEach(p => {
                const isTypePrimitive = this.helper.isTypePrimitive(p.type);
                // for search matter
                const isID = p.name.toLowerCase() === 'id';
                const isDate = p.type === 'Date';
                const isBool = p.type === 'boolean';
                const isImage = p.name.startsWith('image');
                const isDescription = p.name.startsWith('desc');
                const isPassword = p.name.includes('pass');
                const isPropertyNav = p.name.toLowerCase() !== 'id' && p.name.startsWith('id');

                if (isTypePrimitive) {

                    if (!isID && !isDate && !isBool && !isImage && !isDescription && !isPassword) {
                        // special case
                        const name = p.name !== 'action' ? p.name : 'action_';
                        // console.log(name)
                        params += `/{${name}}`;
                        params2 += `${p.type === 'number' ? 'int' : p.type} ${name}, `;

                        if (p.type === 'number') {
                            whereClause += `.Where(e => ${name} == 0 ? true : e.${this.helper.Cap(p.name)} == ${name})\r\n`;
                        } else {
                            whereClause += `.Where(e => ${name} == "*" ? true : e.${this.helper.Cap(p.name)}.ToLower().Contains(${name}.ToLower()))\r\n`;
                        }
                    }

                    if (isPropertyNav) {
                        const { classNav, displayproperty, type } = this.helper.displayPropertyForSelectHtml(this.configs.classes, p.name, e);
                        // includes += `.Include(e => e.${this.helper.Cap(classNav)})`;
                        select += `${classNav} = e.${this.helper.Cap(classNav)}.${this.helper.Cap(displayproperty)},\r\n`;
                        select += `id${this.helper.Cap(classNav)} = e.Id${this.helper.Cap(classNav)},\r\n`;
                    } else {
                        select += `${p.name} = e.${this.helper.Cap(p.name)},\r\n${this.helper.spaceTab(5)}`;
                    }
                }
            });

            select += `\r\n${this.helper.spaceTab(5)}})`

            params2 = params2.substring(0, params2.lastIndexOf(','))
            let newContent = content.replace(/\/\*\{params\}\*\//g, params);
            newContent = newContent.replace(/\/\*\{params2\}\*\//g, params2);
            newContent = newContent.replace(/\/\*\{whereClause\}\*\//g, whereClause);
            newContent = newContent.replace('/*{includes}*/', includes);
            newContent = newContent.replace('/*{select}*/', select);

            newContent = newContent.replace(/UserX/g, this.helper.Cap(e.class));

            fse.ensureDirSync(`${this.configs.aspFolder}/Controllers`);

            fse.writeFileSync(`${this.configs.aspFolder}/Controllers/${this.helper.Cap(e.class)}Controller.cs`, newContent);
            this.helper.progress(`>> ${this.helper.Cap(e.class)}Controller.cs done`);
        });
        
        fse.copySync(`${this.configs.pathBaseFiles}/${SUPERCONTROLLER_CS}`, `${this.configs.aspFolder}/Controllers/${SUPERCONTROLLER_CS}`)
        // }
    }
}