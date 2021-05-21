import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

export class Controllers {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {
        let controller = '';
        
        fse.ensureDirSync(`${this.configs.aspFolder}/controllers`);
        
        this.configs.classes.forEach(e => {
            const cls = this.helper.Cap(e.class);
            const classNamePlural = cls.endsWith('s') ? cls + 'es' : cls.endsWith('y') ? cls.slice(0, -1) + 'ies' : cls + 's';

            controller = `package ${this.configs.nameSpace}.controllers;\r\n\r\n`+
            `import org.springframework.web.bind.annotation.*;\r\n`+
            `import ${this.configs.nameSpace}.models.*;\r\n`+
            `import ${this.configs.nameSpace}.repositories.UowService;\r\n`+
            `import javax.annotation.security.RolesAllowed;\r\n\r\n`+
            `@RolesAllowed({ "admin", "user" })\r\n`+
            `@RestController\r\n`+
            `@RequestMapping("api/${this.helper.lowerFirst(classNamePlural)}")\r\n`+
            `public class ${classNamePlural}Controller extends SuperController<${cls}, Long> {\r\n\r\n`+
            `\tpublic UowService uow;\r\n\r\n`+
            `\tpublic ${classNamePlural}Controller(UowService uow) {\r\n`+
            `\tsuper(uow.${this.helper.lowerFirst(classNamePlural)});\r\n`+
            `\tthis.uow = uow;\r\n`+
            `\t}\r\n`+
            `}`
            ;

            fse.writeFileSync(`${this.configs.aspFolder}/controllers/${classNamePlural}Controller.java`, controller);
        });
        
        this.helper.progress(`>> controllers done`);
    }
}