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

            controller = `package ${this.configs.nameSpace}.controllers;\r\n`+
            `\r\n`+
            `import org.springframework.web.bind.annotation.*;\r\n`+
            `import org.springframework.http.ResponseEntity;\r\n`+
            `import com.github.fge.jsonpatch.JsonPatch;\r\n`+
            `import java.util.*;\r\n`+
            `\r\n`+
            `import ${this.configs.nameSpace}.dto.Roles;\r\n`+
            `import ${this.configs.nameSpace}.models.*;\r\n`+
            `import ${this.configs.nameSpace}.repositories.UowService;\r\n`+
            `import javax.annotation.security.RolesAllowed;\r\n`+
            `\r\n`+
            `@RestController\r\n`+
            `@RequestMapping("api/${this.helper.lowerFirst(classNamePlural)}")\r\n`+
            `public class ${classNamePlural}Controller extends SuperController<${cls}, Long> {\r\n`+
            `\r\n`+
            `\tpublic UowService uow;\r\n`+
            `\r\n`+
            `\tpublic ${classNamePlural}Controller(UowService uow) {\r\n`+
            `\t\tsuper(uow.${this.helper.lowerFirst(classNamePlural)});\r\n`+
            `\t\tthis.uow = uow;\r\n`+
            `\t}\r\n`+
            `\r\n`+
            `\t@RolesAllowed({ Roles.admin, Roles.ga, Roles.ca, Roles.sa })\r\n`+
            `\t@GetMapping("/getAll/{startIndex}/{pageSize}/{sortBy}/{sortDir}")\r\n`+
            `\t@Override\r\n`+
            `\tpublic ResponseEntity<?> GetAll(@PathVariable int startIndex, @PathVariable int pageSize, @PathVariable String sortBy, @PathVariable String sortDir) {\r\n`+
            `\t\treturn super.GetAll(startIndex, pageSize, sortBy, sortDir);\r\n`+
            `\t}\r\n`+
            `\r\n`+
            `\t@RolesAllowed({ Roles.admin, Roles.ga, Roles.ca, Roles.sa })\r\n`+
            `\t@GetMapping("/get")\r\n`+
            `\t@Override\r\n`+
            `\tpublic ResponseEntity<?> get(){\r\n`+
            `\t\treturn super.get();\r\n`+
            `\t}\r\n`+
            `\r\n`+
            `\t@RolesAllowed({ Roles.admin, Roles.ga, Roles.ca, Roles.sa })\r\n`+
            `\t@GetMapping("/getById/{id}")\r\n`+
            `\t@Override\r\n`+
            `\tpublic ResponseEntity<?> getById(@PathVariable Long id){\r\n`+
            `\t\treturn super.getById(id);\r\n`+
            `\t}\r\n`+
            `\r\n`+
            `\t@RolesAllowed({ Roles.admin, Roles.ga, Roles.ca, Roles.sa })\r\n`+
            `\t@PutMapping("/put/{id}")\r\n`+
            `\t@Override\r\n`+
            `\tpublic ResponseEntity<?> put(@PathVariable Long id, @RequestBody ${cls} model){\r\n`+
            `\t\treturn super.put(id, model);\r\n`+
            `\t}\r\n`+
            `\r\n`+
            `\t@RolesAllowed({ Roles.admin, Roles.ga, Roles.ca, Roles.sa })\r\n`+
            `\t@PostMapping("/post")\r\n`+
            `\t@Override\r\n`+
            `\tpublic ResponseEntity<?> post(@RequestBody ${cls} model){\r\n`+
            `\t\treturn super.post(model);\r\n`+
            `\t}\r\n`+
            `\r\n`+
            `\t@RolesAllowed({ Roles.admin, Roles.ga, Roles.ca, Roles.sa })\r\n`+
            `\t@PatchMapping(path = "/patch/{id}", consumes = "application/json-patch+json")\r\n`+
            `\t@Override\r\n`+
            `\tpublic ResponseEntity<?> patch(@PathVariable Long id, @RequestBody JsonPatch patch) {\r\n`+
            `\t\treturn super.patch(id, patch);\r\n`+
            `\t}\r\n`+
            `\r\n`+
            `\t@RolesAllowed({ Roles.admin, Roles.ga, Roles.ca, Roles.sa })\r\n`+
            `\t@DeleteMapping("/delete/{id}")\r\n`+
            `\t@Override\r\n`+
            `\tpublic ResponseEntity<?> delete(@PathVariable Long id){\r\n`+
            `\t\treturn super.delete(id);\r\n`+
            `\t}\r\n`+
            `\r\n`+

            `}`
            ;

            fse.writeFileSync(`${this.configs.aspFolder}/controllers/${classNamePlural}Controller.java`, controller);
        });
        
        this.helper.progress(`>> controllers done`);
    }
}