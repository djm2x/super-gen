import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

export class Repos {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {
        let repo = '';
        let repos = `package com.sportvalue.crs.repositories;\r\n\r\n`+
        `import javax.transaction.Transactional;\r\n`+
        `import org.springframework.beans.factory.annotation.Autowired;\r\n`+
        `import org.springframework.stereotype.Service;\r\n\r\n`+
        `@Service\r\n`+
        `@Transactional\r\n`+
        `public class UowService {\r\n`
        ;
        
        fse.ensureDirSync(`${this.configs.aspFolder}/Repos`);
        
        this.configs.classes.forEach(e => {
            const cls = this.helper.Cap(e.class);
            const classNamePlural = cls.endsWith('s') ? cls + 'es' : cls.endsWith('y') ? cls.slice(0, -1) + 'ies' : cls + 's';

            repo = `${this.configs.nameSpace}.repositories;\r\n\r\n`+
            `import com.sportvalue.crs.models.*;\r\n\r\n`+
            `public interface ${classNamePlural}Repository extends GenericRepository<${cls}, Long> { }\r\n`;

            fse.writeFileSync(`${this.configs.aspFolder}/Repos/${classNamePlural}Repository.java`, repo);
            
            repos += `\t@Autowired public ${classNamePlural}Repository ${this.helper.lowerFirst(classNamePlural)};\r\n`;
        });
        
        repos += `}`;
        fse.writeFileSync(`${this.configs.aspFolder}/Repos/UowService.java`, repos);
        
        this.helper.progress(`>> Repos done`);
    }
}