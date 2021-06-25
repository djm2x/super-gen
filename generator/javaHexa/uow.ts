import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

export class UowHexa {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {
        let importModels = '';
        let repos = `package ${this.configs.nameSpace}.shared.repositories;\r\n\r\n`+
        `import javax.transaction.Transactional;\r\n`+
        `importModels\r\n` +
        `import org.springframework.beans.factory.annotation.Autowired;\r\n`+
        `import org.springframework.stereotype.Service;\r\n\r\n`+
        `@Service\r\n`+
        `@Transactional\r\n`+
        `public class UowService {\r\n`
        ;
        
        
        this.configs.classes.forEach(e => {
            const cls = this.helper.Cap(e.class);
            const classNamePlural = cls.endsWith('s') ? cls + 'es' : cls.endsWith('y') ? cls.slice(0, -1) + 'ies' : cls + 's';

            importModels += `import ${this.configs.nameSpace}.components.${e.class}.repositories.*;\r\n`;

            `public interface ${classNamePlural}Repository extends GenericRepository<${cls}, Long> { }\r\n`;
            
            
            repos += `\t@Autowired public ${classNamePlural}Repository ${this.helper.lowerFirst(classNamePlural)};\r\n`;
        });
        
        repos = repos.replace('importModels', importModels);
        
        repos += `}`;

        fse.ensureDirSync(`${this.configs.aspFolder}/shared/repositories`);
        fse.writeFileSync(`${this.configs.aspFolder}/shared/repositories/UowService.java`, repos);
        
        this.helper.progress(`>> Repos done`);
    }
}