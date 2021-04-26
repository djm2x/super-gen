import * as fse from 'fs-extra';
import { HelperFunctions } from '../helper.functions';
import { IConfigs } from '../map.helper';

export class Entities {
    constructor(private helper: HelperFunctions, private configs: IConfigs) { }


    generateTs() {
        const MODEL = 'model.java';
        // else if (file === MYCONTEXT_CS) {
        let content = fse.readFileSync(`${this.configs.pathBaseFiles}/${MODEL}`, 'utf8');
        let models = '';
        
        
        fse.ensureDirSync(`${this.configs.aspFolder}/Models`);
        
        this.configs.classes.forEach(e => {
            const cls = this.helper.Cap(e.class);
            const classNamePlural = cls.endsWith('s') ? cls + 'es' : cls.endsWith('y') ? cls.slice(0, -1) + 'ies' : cls + 's';

            models = `package com.sportvalue.crs.models;\r\nimport java.util.Set;\r\nimport java.util.Date;\r\nimport javax.persistence.*;\r\nimport com.fasterxml.jackson.annotation.JsonFormat;\r\nimport com.fasterxml.jackson.annotation.JsonIgnore;\r\n@Entity\r\n@Table(name="${classNamePlural}")\r\npublic class ${this.helper.Cap(e.class)} extends AbstractEntity {\r\n`;

            e.properties.forEach(p => {
                const isTypePrimitive = this.helper.isTypePrimitive(p.type);

                if (isTypePrimitive) {
                    if (p.name.toLowerCase() === 'id') {
                        models += `@Id\r\n@GeneratedValue(strategy = GenerationType.IDENTITY)\r\nprivate Long ${p.name};\r\n\r\n`;

                    } else if (p.name.toLowerCase() === 'email') {
                        models += `@Column(unique = true)\r\nprivate String ${p.name};\r\n\r\n`;
                    } else if (p.name.toLowerCase().includes('parent')) {
                        // modelBuilderEntity += `entity.Property(e => e.${p.name});\r\n`; // .IsRequired(false)
                        // models += `public int? ${p.name} { get; set; }\r\n`;
                    } else {
                        const type = p.type === 'number' ? 'Long' : p.type === 'string' ? 'String' : p.type;

                        if (type === 'Date') {
                            models += `@Column\r\n@JsonFormat(pattern="dd/MM/yyyy'T'HH:mmZ")\r\nprivate ${type} ${p.name};\r\n\r\n`;
                        } else {
                            models += `@Column\r\n private ${type} ${p.name};\r\n\r\n`;
                        }
                    }
                } else {
                    if (p.type.includes('[]')) {

                        if (p.name.toLowerCase() === 'childs') {
                            // modelBuilderEntity += `entity.HasMany(e => e.${this.helper.Cap(p.name)}).WithOne(p => p.Parent).HasForeignKey(e => e.IdParent).OnDelete(DeleteBehavior.Cascade);\r\n`;
                        } 

                        const cls = p.type.replace('[]', '');

                        models += `@OneToMany(cascade = CascadeType.ALL)\r\n@JoinColumn(name = "id${this.helper.Cap(e.class)}")\r\n@JsonIgnore\r\nprivate Set<${cls}> ${p.name};\r\n\r\n`;

                    } else {
                        if (p.name.toLowerCase() === 'parent') {
                            // modelBuilderEntity += `entity.HasOne(e => e.${this.helper.Cap(p.name)}).WithMany(e => e.Childs).HasForeignKey(e => e.Id${this.helper.Cap(p.name)});\r\n`;
                        } 

                        models += `@ManyToOne(cascade = CascadeType.ALL)\r\n@JoinColumn(name = "id${this.helper.Cap(p.name)}")\r\n@JsonIgnore\r\nprivate ${this.helper.Cap(p.type !== 'any' ? p.type : p.name)} ${p.name};\r\n\r\n`;
                    }
                }
            });

            e.properties.forEach(p => {
                const isTypePrimitive = this.helper.isTypePrimitive(p.type);

                if (isTypePrimitive) {
                    if (p.name.toLowerCase() === 'id') {
                        models += `public Long getId() {\r\n\treturn id;\r\n}\r\n\r\n`;

                    } else {
                        const type = p.type === 'number' ? 'Long' : p.type === 'string' ? 'String' : p.type;

                        models += `public ${type} get${this.helper.Cap(p.name)}() {\r\n\treturn ${p.name};\r\n}\r\n\r\n`;

                        models += `public void set${this.helper.Cap(p.name)}(${type} ${p.name}) {\r\nthis.${p.name} = ${p.name};\r\n}\r\n\r\n`;
                    }
                } else {
                    if (p.type.includes('[]')) {

                    } else {

                        const type = this.helper.Cap(p.type !== 'any' ? p.type : p.name);

                        models += `public ${type} get${this.helper.Cap(p.name)}() {\r\n\treturn ${p.name};\r\n}\r\n\r\n`;

                        models += `public void set${this.helper.Cap(p.name)}(${type} ${p.name}) {\r\nthis.${p.name} = ${p.name};\r\n}\r\n\r\n`;
                    }
                }
            });

            models += '}\r\n';

            // for reooder things
            // const containeForeignKey = e.properties.findIndex(o => o.name.toLowerCase() !== 'id' && o.name.startsWith('id')) !== -1;
            // containeForeignKey ? seedClass += `.${this.helper.Cap(e.class)}s()\r\n` : seedClass = `.${this.helper.Cap(e.class)}s()\r\n` + seedClass;

            fse.writeFileSync(`${this.configs.aspFolder}/models/${this.helper.Cap(e.class)}.java`, models);
        });
        
        this.helper.progress(`>> ${MODEL} done`);
    }
}