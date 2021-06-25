import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

export class Seeds {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }

    generateTs() {
        let seeds = '';


        

        seeds = `package ${this.configs.nameSpace}.models.seed;\r\n\r\n` +
            `import org.springframework.beans.factory.annotation.Autowired;\r\n` +
            `import org.springframework.boot.context.event.ApplicationReadyEvent;\r\n` +
            `import org.springframework.context.event.EventListener;\r\n` +
            `import org.springframework.stereotype.Component;\r\n\r\n` +

            `import java.util.*;\r\n\r\n` +

            `import com.github.javafaker.Faker;\r\n` +
            `import com.transport.logisticsrepository.models.*;\r\n` +
            `import com.transport.logisticsrepository.repositories.UowService;\r\n` +

            `@Component\r\n` +
            `public class DatabaseSeeder {\r\n\r\n` +

            `\t@Autowired private UowService uow;\r\n\r\n` +

            `\tprivate final Faker faker = new Faker(new Locale("fr"));\r\n\r\n` +

            `\tprivate final Long length = 10L;\r\n\r\n` +

            `\t@EventListener\r\n` +
            `\tpublic void seed(ApplicationReadyEvent event) {\r\n`;

        this.configs.classes.forEach(e => {
            const cls = this.helper.Cap(e.class);
            const classNamePlural = cls.endsWith('s') ? cls + 'es' : cls.endsWith('y') ? cls.slice(0, -1) + 'ies' : cls + 's';
            seeds += `\t\tAdd${classNamePlural}();\r\n`;
        })

        seeds += `\t}\r\n\r\n`;

        this.configs.classes.forEach(e => {
            const cls = this.helper.Cap(e.class);
            const classNamePlural = cls.endsWith('s') ? cls + 'es' : cls.endsWith('y') ? cls.slice(0, -1) + 'ies' : cls + 's';



            seeds += `\tpublic DatabaseSeeder Add${classNamePlural}() {\r\n` +
                `\t\tList<${cls}> list = new ArrayList<${cls}>();\r\n` +
                `\t\tfor (Long i = 1L; i <= length; i++) {\r\n` +
                `\t\t\t${cls} e = new ${cls}(\r\n` +
                `\t\t\t\ti,\r\n`;

            e.properties.forEach(p => {
                const isTypePrimitive = this.helper.isTypePrimitive(p.type);

                if (isTypePrimitive && p.name.toLowerCase() !== 'id') {
                    const isDate = p.type === 'Date';
                    const isIdParent = p.name.toLowerCase().includes('parent');
                    const isInt = p.type === 'number' && p.name.toLowerCase().includes('parent') === false;
                    const isBoolean = p.type === 'boolean';
                    const isEmail = p.name.toLowerCase().includes('email');
                    const isImage = p.name.toLowerCase().includes('image');
                    const isPassword = p.name.toLowerCase().includes('pass');
                    seeds += `\t\t\t\t`;
                    switch (true) {
                        case isDate: seeds += `faker.date().birthday(),\r\n`; break;
                        case isInt: seeds += `faker.number().numberBetween(1L, 10L),\r\n`; break;
                        case isBoolean: seeds += `faker.bool().bool(),\r\n`; break;
                        case isEmail: seeds += `i == 1 ? "sa@angular.io" : faker.internet().emailAddress(),\r\n`; break;
                        case isImage: seeds += `faker.internet().image(),\r\n`; break;
                        case isPassword: seeds += `"123",\r\n`; break;
                        // case isIdParent: seeds += `.RuleFor(o => o.${this.helper.Cap(p.name)}, f => id - 1 == 1 ? null : id - 2)\r\n`; break;
                        default: seeds += `faker.lorem().sentence(),\r\n`; break;
                    }
                }

            });
            seeds = seeds.substring(0, seeds.length - 3);

            seeds += `\r\n\t\t\t);\r\n\r\n`;

            seeds += `\t\t\tlist.add(e);\r\n`;
            seeds += `\t\t}\r\n\r\n`;

            // seeds += `\t\tuow.${this.helper.lowerFirst(classNamePlural)}.deleteAll();\r\n`;
            seeds += `\t\tuow.${this.helper.lowerFirst(classNamePlural)}.saveAll(list);\r\n`;
            seeds += `\t\treturn this;\r\n`;
            seeds += `\t}\r\n\r\n`;
        });

        seeds += `}\r\n`;

        fse.ensureDirSync(`${this.configs.aspFolder}/shared/seeds`);

        fse.writeFileSync(`${this.configs.aspFolder}/shared/seeds/DatabaseSeeder.java`, seeds);

        this.helper.progress(`>> DatabaseSeeder done`);
    }
}