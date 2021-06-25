import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

export class Repos {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {
        let repo = '';
        // let repos = `package ${this.configs.nameSpace}.components.repositories;\r\n\r\n`+
        // `import javax.transaction.Transactional;\r\n`+
        // `import org.springframework.beans.factory.annotation.Autowired;\r\n`+
        // `import org.springframework.stereotype.Service;\r\n\r\n`+
        // `@Service\r\n`+
        // `@Transactional\r\n`+
        // `public class UowService {\r\n`
        // ;
        
        
        this.configs.classes.forEach(e => {
            const cls = this.helper.Cap(e.class);
            const classNamePlural = cls.endsWith('s') ? cls + 'es' : cls.endsWith('y') ? cls.slice(0, -1) + 'ies' : cls + 's';

            repo = `package ${this.configs.nameSpace}.components.${e.class}.repositories;\r\n\r\n`+
            `import ${this.configs.nameSpace}.components.${e.class}.*;\r\n\r\n`+
            `public interface ${classNamePlural}Repository extends GenericRepository<${cls}, Long> { }\r\n`;

            fse.ensureDirSync(`${this.configs.aspFolder}/components/${e.class}/repositories`);

            fse.writeFileSync(`${this.configs.aspFolder}/components/${e.class}/repositories/${classNamePlural}Repository.java`, repo);
            
            // repos += `\t@Autowired public ${classNamePlural}Repository ${this.helper.lowerFirst(classNamePlural)};\r\n`;
        });
        
        // repos += `}`;
        // fse.writeFileSync(`${this.configs.aspFolder}/components/repositories/UowService.java`, repos);
        
        this.helper.progress(`>> Repos done`);
    }
}