"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const class_reader_1 = require("./class-reader");
const ADMIN_ROUTING_MODULE_TS = 'admin-routing.module.ts';
const ADMIN_MODULE_TS = 'admin.module.ts';
const ADMIN_COMPONENT_HTML = 'admin.component.html';
const DATASEEDING_CS = 'DataSeeding.cs';
// const MODELS_TS = 'models.ts';
const MYCONTEXT_CS = 'MyContext.cs';
const SUPER_SERVICE_TS = 'super.service.ts';
const SUPERCONTROLLER_CS = 'SuperController.cs';
const STATIC = 'static';
const UOW_SERVICE_TS = 'uow.service.ts';
const ACCOUNT_SERVICE_TS = 'account.service.ts';
const UPDATE_COMPONENT_HTML = 'update.component.html';
const UPDATE_COMPONENT_SCSS = 'update.component.scss';
const UPDATE_COMPONENT_TS = 'update.component.ts';
const USER_ROUTING_MODULE_TS = 'user-routing.module.ts';
const USER_MODULE_TS = 'user.module.ts';
const USER_COMPONENT_HTML = 'user.component.html';
const USER_COMPONENT_SCSS = 'user.component.scss';
const USER_COMPONENT_TS = 'user.component.ts';
const USER_CS = 'User.cs';
const USER_SERVICE_TS = 'user.service.ts';
const USERSCONTROLLER_CS = 'UsersController.cs';
class Generate {
    constructor() { }
    methode(MODELS_TS = 'models.ts') {
        const pathAbs = !process.env.IS_DEV ? `${process.cwd()}/dist` : `${process.cwd()}`;
        const primitivetypes = ['string', 'boolean', 'Date', 'number'];
        const source = `${pathAbs}/api/base/source`;
        const asp = `${pathAbs}/api/base/asp`;
        const admin_folder = 'admin';
        const angular_app = `${asp}/angular/src/app`;
        const files = fse.readdirSync(`${source}`);
        console.log('dsdsds2');
        const classes = new class_reader_1.ClassReader().methode(MODELS_TS);
        console.log('dsdsds3');
        // return;
        files.forEach(file => {
            if (file === ADMIN_ROUTING_MODULE_TS) {
                // get content
                let content = fse.readFileSync(`${source}/${ADMIN_ROUTING_MODULE_TS}`, 'utf8');
                let contentHtml = fse.readFileSync(`${source}/${ADMIN_COMPONENT_HTML}`, 'utf8');
                // let imports = '';
                let routes = '';
                let navs = '';
                let navs2 = '';
                let menus = `<mat-list-item [routerLink]="['/${admin_folder}/{class}']" routerLinkActive="router-link-active">
                        <mat-icon>home</mat-icon>&nbsp;<span>{class}</span>
                        <mat-divider></mat-divider>
                    </mat-list-item>\r\n`;
                // edit content
                classes.forEach(e => {
                    // for ADMIN_ROUTING_MODULE_TS
                    routes += `{ path: '${e.class}', loadChildren: () => import('./${e.class}/${e.class}.module').then(m => m.${this.Cap(e.class)}Module), data: {animation: '${e.class}'} },\r\n`;
                    // for ADMIN_COMPONENT_HTML
                    if (e.class.includes('user') || e.properties.length < 4) {
                        navs2 += menus.replace(/\{class\}/g, e.class);
                    }
                    else {
                        navs += menus.replace(/\{class\}/g, e.class);
                    }
                });
                content = content.replace('/*{routes}*/', routes);
                contentHtml = contentHtml.replace('{navs}', navs);
                contentHtml = contentHtml.replace('{navs2}', navs2);
                // write content in new location
                fse.ensureDirSync(`${angular_app}/${admin_folder}`);
                fse.writeFileSync(`${angular_app}/${admin_folder}/${ADMIN_ROUTING_MODULE_TS}`, content);
                fse.writeFileSync(`${angular_app}/${admin_folder}/${ADMIN_COMPONENT_HTML}`, contentHtml);
                this.progress(`>> ${ADMIN_ROUTING_MODULE_TS} done`);
                this.progress(`>> ${ADMIN_COMPONENT_HTML} done`);
                fse.copySync(`${source}/${ADMIN_MODULE_TS}`, `${angular_app}/${admin_folder}/${ADMIN_MODULE_TS}`);
                this.progress(`>> ${ADMIN_MODULE_TS} done`);
                fse.copySync(`${pathAbs}/api/public/${MODELS_TS}`, `${angular_app}/models/${MODELS_TS}`);
                this.progress(`>> ${MODELS_TS} done`);
            }
            else if (file === DATASEEDING_CS) {
                // get content
                const distination = `${asp}/angular/src/app/${admin_folder}`;
                let content = fse.readFileSync(`${source}/${DATASEEDING_CS}`, 'utf8');
                let dataSeed = '';
                // edit content
                classes.forEach(e => {
                    let seed = `public static ModelBuilder ${this.Cap(e.class)}s(this ModelBuilder modelBuilder)
                        {
                        int id = 1;
                        var faker = new Faker<${this.Cap(e.class)}>(DataSeeding.lang)
                            .CustomInstantiator(f => new ${this.Cap(e.class)} { Id = id++ })\r\n`;
                    e.properties.forEach(p => {
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive && p.name.toLowerCase() !== 'id') {
                            const isDate = p.type === 'Date';
                            const isInt = p.type === 'number';
                            const isBoolean = p.type === 'boolean';
                            const isEmail = p.name.toLowerCase().includes('email');
                            const isImage = p.name.toLowerCase().includes('image');
                            // const isString = p.type === 'string';
                            switch (true) {
                                case isDate:
                                    seed += `.RuleFor(o => o.${this.Cap(p.name)}, f => f.Date.Past())\r\n`;
                                    break;
                                case isInt:
                                    seed += `.RuleFor(o => o.${this.Cap(p.name)}, f => f.Random.Number(1, 10))\r\n`;
                                    break;
                                case isBoolean:
                                    seed += `.RuleFor(o => o.${this.Cap(p.name)}, f => f.Random.Bool())\r\n`;
                                    break;
                                case isEmail:
                                    seed += `.RuleFor(o => o.${this.Cap(p.name)}, f => f.Internet.Email())\r\n`;
                                    break;
                                case isImage:
                                    seed += `.RuleFor(o => o.${this.Cap(p.name)}, f => "")\r\n`;
                                    break;
                                // case isString: seed += `.RuleFor(o => o.${this.Cap(p.name)}, f => f.Lorem.Word())`;break;
                                default:
                                    seed += `.RuleFor(o => o.${this.Cap(p.name)}, f => f.Lorem.Word())\r\n`;
                                    break;
                            }
                        }
                    });
                    seed += `;\r\nmodelBuilder.Entity<${this.Cap(e.class)}>().HasData(faker.Generate(10));\r\nreturn modelBuilder;\r\n}\r\n\r\n`;
                    const containeForeignKey = e.properties.findIndex(o => o.name.toLowerCase() !== 'id' && o.name.startsWith('id')) !== -1;
                    containeForeignKey ? dataSeed += seed : dataSeed = seed + dataSeed;
                });
                let newContent = content.replace('/*{dataSeed}*/', dataSeed);
                // write content in new location
                fse.ensureDirSync(`${asp}/Models`);
                fse.writeFileSync(`${asp}/Models/${DATASEEDING_CS}`, newContent);
                this.progress(`>> Models/${DATASEEDING_CS} done`);
            }
            else if (file === MYCONTEXT_CS) {
                let content = fse.readFileSync(`${source}/${MYCONTEXT_CS}`, 'utf8');
                let entities = '';
                let models = '';
                let dbSets = '';
                let seedClass = '';
                fse.ensureDirSync(`${asp}/Models`);
                classes.forEach(e => {
                    dbSets += `public virtual DbSet<${this.Cap(e.class)}> ${this.Cap(e.class)}s { get; set; } \r\n`;
                    entities += `modelBuilder.Entity<${this.Cap(e.class)}>(entity => \r\n{`;
                    models = `using System;\r\nusing System.Collections.Generic;\r\nnamespace Models\r\n{\r\npublic partial class ${this.Cap(e.class)} \r\n{`;
                    e.properties.forEach(p => {
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive) {
                            if (p.name.toLowerCase() === 'id') {
                                entities += `entity.HasKey(e => e.${this.Cap(p.name)});\r\n`;
                                entities += `entity.Property(e => e.${this.Cap(p.name)}).ValueGeneratedOnAdd();\r\n`;
                                models += `public int ${this.Cap(p.name)} { get; set; }\r\n`;
                            }
                            else if (p.name.toLowerCase().includes('email')) {
                                entities += `entity.HasIndex(e => e.${this.Cap(p.name)}).IsUnique();\r\n`; // .IsRequired(false)
                                models += `public string ${this.Cap(p.name)} { get; set; }\r\n`;
                            }
                            else {
                                entities += `entity.Property(e => e.${this.Cap(p.name)});\r\n`; // .IsRequired(false)
                                const type = p.type === 'Date' ? 'DateTime' : (p.type === 'number' ? 'int' : (p.type === 'boolean' ? 'bool' : p.type));
                                models += `public ${type} ${this.Cap(p.name)} { get; set; }\r\n`;
                            }
                        }
                        else {
                            if (p.type.includes('[]')) {
                                const cls = p.type.replace('[]', '').toLowerCase();
                                entities += `entity.HasMany(d => d.${this.Cap(cls)}s).WithOne(p => p.${this.Cap(e.class)}).HasForeignKey(d => d.Id${this.Cap(e.class)}).OnDelete(DeleteBehavior.NoAction);\r\n`;
                                models += `public virtual ICollection<${this.Cap(cls)}> ${this.Cap(cls)}s { get; set; }\r\n`;
                            }
                            else {
                                entities += `entity.HasOne(d => d.${this.Cap(p.type)}).WithMany(p => p.${this.Cap(e.class)}s).HasForeignKey(d => d.Id${this.Cap(p.type)});\r\n`;
                                models += `public virtual ${this.Cap(p.type)} ${this.Cap(p.type)} { get; set; }\r\n`;
                            }
                        }
                    });
                    entities += '});\r\n\r\n';
                    models += '}\r\n}\r\n';
                    // for reooder things
                    const containeForeignKey = e.properties.findIndex(o => o.name.toLowerCase() !== 'id' && o.name.startsWith('id')) !== -1;
                    containeForeignKey ? seedClass += `.${this.Cap(e.class)}s()\r\n` : seedClass = `.${this.Cap(e.class)}s()\r\n` + seedClass;
                    fse.writeFileSync(`${asp}/Models/${this.Cap(e.class)}.cs`, models);
                });
                // content = content.replace('/*{imports}*/', imports);
                content = content.replace('/*{entities}*/', entities);
                content = content.replace('/*{dbSets}*/', dbSets);
                content = content.replace('/*{seedClass}*/', seedClass);
                // write content in new location
                fse.writeFileSync(`${asp}/Models/${MYCONTEXT_CS}`, content);
                this.progress(`>> ${MYCONTEXT_CS} done`);
                // create models
            }
            else if (file === USERSCONTROLLER_CS) {
                let content = fse.readFileSync(`${source}/${USERSCONTROLLER_CS}`, 'utf8');
                // edit content
                classes.forEach(e => {
                    let whereClause = '';
                    let params = '';
                    let params2 = '';
                    let includes = '';
                    e.properties.forEach(p => {
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        // for search matter
                        if (isTypePrimitive && p.name.toLowerCase() !== 'id' && p.type !== 'Date' && p.type !== 'boolean'
                            && !p.name.startsWith('image') && !p.name.startsWith('desc') && !p.name.includes('pass')) {
                            params += `/{${p.name}}`;
                            params2 += `, ${p.type === 'number' ? 'int' : p.type} ${p.name}`;
                            if (p.type === 'number') {
                                whereClause += `.Where(e => ${p.name} == 0 ? true : e.${this.Cap(p.name)} == ${p.name})\r\n`;
                            }
                            else {
                                whereClause += `.Where(e => ${p.name} == "*" ? true : e.${this.Cap(p.name)}.ToLower().Contains(${p.name}.ToLower()))\r\n`;
                            }
                            const isPropertyNav = p.name.startsWith('id');
                            if (isPropertyNav) {
                                const { classNav, property } = this.displayPropertyForSelectHtml(classes, p.name);
                                includes += `.Include(e => e.${this.Cap(classNav)})`;
                            }
                        }
                    });
                    // content = content.replace('/*{imports}*/', imports);
                    let newContent = content.replace('/*{params}*/', params);
                    newContent = newContent.replace('/*{params2}*/', params2);
                    newContent = newContent.replace('/*{whereClause}*/', whereClause);
                    newContent = newContent.replace('/*{includes}*/', includes);
                    newContent = newContent.replace(/UserX/g, this.Cap(e.class));
                    // write content in new location
                    fse.ensureDirSync(`${asp}/Controllers`);
                    fse.writeFileSync(`${asp}/Controllers/${this.Cap(e.class)}Controller.cs`, newContent);
                    this.progress(`>> ${this.Cap(e.class)}Controller.cs done`);
                });
                const distination = `${asp}/Controllers`;
                fse.ensureDirSync(distination);
                fse.copySync(`${source}/${SUPERCONTROLLER_CS}`, `${distination}/${SUPERCONTROLLER_CS}`);
            }
            else if (file === UOW_SERVICE_TS) { // and services
                const distination = `${asp}/angular/src/app/services`;
                fse.ensureDirSync(distination);
                fse.copySync(`${source}/${SUPER_SERVICE_TS}`, `${distination}/${SUPER_SERVICE_TS}`);
                fse.copySync(`${source}/${ACCOUNT_SERVICE_TS}`, `${distination}/${ACCOUNT_SERVICE_TS}`);
                let content = fse.readFileSync(`${source}/${UOW_SERVICE_TS}`, 'utf8');
                let contentService = fse.readFileSync(`${source}/${USER_SERVICE_TS}`, 'utf8');
                let imports = '';
                let services = '';
                // edit content
                classes.forEach(e => {
                    let params = '';
                    let params2 = '';
                    imports += `import { ${this.Cap(e.class)}Service } from './${e.class}.service';\r\n`;
                    services += `${e.class}s = new ${this.Cap(e.class)}Service();\r\n`;
                    e.properties.forEach(p => {
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive && p.name.toLowerCase() !== 'id' && p.type !== 'Date' && p.type !== 'boolean'
                            && !p.name.startsWith('image') && !p.name.startsWith('desc') && !p.name.includes('pass')) {
                            params += `, ${p.name}`;
                            params2 += `/\${${p.name}}`;
                        }
                    });
                    // content = content.replace('/*{imports}*/', imports);
                    let newContentService = contentService.replace('/*{params}*/', params);
                    newContentService = newContentService.replace('/*{params2}*/', params2);
                    newContentService = newContentService.replace(/User\$/g, this.Cap(e.class));
                    newContentService = newContentService.replace(`('users')`, `('${e.class}s')`);
                    // write content in new location
                    fse.writeFileSync(`${distination}/${e.class}.service.ts`, newContentService);
                    this.progress(`>> ${e.class}.service.ts done`);
                });
                content = content.replace('/*{imports}*/', imports);
                content = content.replace('/*{services}*/', services);
                // write content in new location
                fse.writeFileSync(`${distination}/${UOW_SERVICE_TS}`, content);
                this.progress(`>> ${UOW_SERVICE_TS} done`);
            }
            // angular
            else if (file === USER_COMPONENT_HTML) {
                const distination = `${asp}/angular/src/app/${admin_folder}`;
                let content = fse.readFileSync(`${source}/${USER_COMPONENT_HTML}`, 'utf8');
                let inputHtml = `<mat-form-field appearance="fill" class="col-md-6">
                    <mat-label>{propertie}</mat-label>
                    <input matInput [formControl]="{propertie}" required>
                </mat-form-field>`;
                let selectHtml = `<mat-form-field appearance="fill" class="col-md-6">
                    <mat-label>{classNav}s</mat-label>
                    <mat-select [formControl]="{propertie}" readonly>
                        <mat-option *ngFor="let e of {classNav}s | async" [value]="e.id">{{ e.{name} }}</mat-option>
                    </mat-select>
                </mat-form-field>`;
                let tableRow = `<ng-container matColumnDef="{propertieTitle}">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{propertieTitle}</th>
                    <td mat-cell *matCellDef="let row">{{row.{propertie}{pipe}}}</td>
                </ng-container>`;
                let tableRowImage = `<ng-container matColumnDef="{propertieTitle}">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{propertieTitle}</th>
                    <td mat-cell *matCellDef="let row">
                        <img #img (error)="imgError(img)" [src]="displayImage(row.{propertie})" alt="" srcset="">
                    </td>
                </ng-container>`;
                // edit content
                classes.forEach(e => {
                    fse.ensureDirSync(`${distination}/${e.class}`);
                    let search = '';
                    let rows = '';
                    e.properties.forEach(p => {
                        //* for section of search
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive && p.name.toLowerCase() !== 'id' && p.type !== 'Date' && p.type !== 'boolean'
                            && !p.name.startsWith('image') && !p.name.startsWith('desc') && !p.name.includes('pass')) {
                            const isSelect = p.name.startsWith('id');
                            if (isSelect) { // generate select
                                const { classNav, property } = this.displayPropertyForSelectHtml(classes, p.name);
                                search += selectHtml.replace(/\{classNav\}/g, classNav);
                                search = search.replace('{propertie}', p.name);
                                search = search.replace('{name}', property);
                            }
                            else { // inputs of text
                                search += inputHtml.replace(/\{propertie\}/g, p.name);
                            }
                        }
                        //* for section of table
                        if (isTypePrimitive && !p.name.startsWith('desc') && !p.name.includes('pass') && p.name !== 'id' && !p.type.includes('[]')) {
                            const isPropertyNav = p.name.startsWith('id');
                            const isImage = p.name.includes('image');
                            if (isPropertyNav) {
                                const { classNav, property } = this.displayPropertyForSelectHtml(classes, p.name);
                                rows += tableRow.replace(/\{propertieTitle\}/g, classNav);
                                rows = rows.replace(/\{propertie\}/g, `${classNav}.${property}`);
                                rows = rows.replace('{pipe}', '');
                            }
                            else if (isImage) {
                                rows += tableRowImage.replace(/\{propertieTitle\}/g, p.name);
                                rows = rows.replace(/\{propertie\}/g, p.name);
                            }
                            else {
                                const pipe = p.type === 'Date' ? ' | date : "dd/MM/yyyy"'
                                    : (p.type === 'boolean' ? ` ? 'Oui' : 'Non'` : '');
                                rows += tableRow.replace(/\{propertieTitle\}/g, p.name);
                                rows = rows.replace(/\{propertie\}/g, p.name);
                                rows = rows.replace('{pipe}', pipe);
                            }
                        }
                    });
                    // content = content.replace('/*{imports}*/', imports);
                    let newContent = content.replace(/\{model\}/g, this.Cap(e.class));
                    newContent = newContent.replace('{search}', search);
                    newContent = newContent.replace('{tableRows}', rows);
                    // write content in new location
                    fse.ensureDirSync(`${distination}/${e.class}`);
                    fse.writeFileSync(`${distination}/${e.class}/${e.class}.component.html`, newContent);
                    this.progress(`>> ${e.class}.component.html done`);
                    fse.copySync(`${source}/${USER_COMPONENT_SCSS}`, `${distination}/${e.class}/${e.class}.component.scss`);
                    this.progress(`>> ${e.class}.component.scss done`);
                });
            }
            else if (file === UPDATE_COMPONENT_TS) {
                const distination = `${asp}/angular/src/app/${admin_folder}`;
                let content = fse.readFileSync(`${source}/${UPDATE_COMPONENT_TS}`, 'utf8');
                // edit content
                classes.forEach(e => {
                    let selections = '';
                    let myFormfields = '';
                    let imagesInit = '';
                    let imagesFrom = '';
                    let imagesTo = '';
                    e.properties.forEach(p => {
                        // for section of search
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive) {
                            const isSelect = p.name.toLowerCase() !== 'id' && p.name.startsWith('id');
                            const isEmail = p.name.includes('email');
                            const isImage = p.name.includes('image');
                            myFormfields += `${p.name}: [this.o.${p.name}, [Validators.required, ${isEmail ? 'Validators.email' : ''}]],\r\n`;
                            if (isSelect) {
                                const classNav = p.name.replace('id', '').toLowerCase();
                                selections += `${classNav}s = this.uow.${classNav}s.get();\r\n`;
                            }
                            if (isImage) {
                                imagesInit += `${p.name}To = new Subject();\r\n${p.name}From = new Subject();\r\n\r\n`;
                                imagesFrom += `this.${p.name}From.subscribe(r => this.myForm.get('${p.name}').setValue(r));\r\n`;
                                imagesTo += `this.${p.name}To.next(this.o.${p.name});;\r\n`;
                            }
                        }
                    });
                    // content = content.replace('/*{imports}*/', imports);
                    let newContent = content.replace(/User\$/g, this.Cap(e.class));
                    newContent = newContent.replace(/user/g, e.class);
                    newContent = newContent.replace('/*{myFormfields}*/', myFormfields);
                    newContent = newContent.replace('/*{selections}*/', selections);
                    newContent = newContent.replace('/*{imagesInit}*/', imagesInit);
                    newContent = newContent.replace('/*{imagesFrom}*/', imagesFrom);
                    newContent = newContent.replace('/*{imagesTo}*/', imagesTo);
                    // write content in new location
                    fse.ensureDirSync(`${distination}/${e.class}/update`);
                    fse.writeFileSync(`${distination}/${e.class}/update/update.component.ts`, newContent);
                    this.progress(`>> ${e.class}/update.component.ts done`);
                });
            }
            else if (file === UPDATE_COMPONENT_HTML) {
                const distination = `${asp}/angular/src/app/${admin_folder}`;
                let content = fse.readFileSync(`${source}/${UPDATE_COMPONENT_HTML}`, 'utf8');
                let inputHtml = `<mat-form-field appearance="fill" class="col-md-6">
                    <mat-label>{propertie}</mat-label>
                    <input matInput formControlName="{propertie}" required>
                </mat-form-field>`;
                let textAreaHtml = `<mat-form-field appearance="fill" class="col-md-12">
                    <mat-label>{propertie}</mat-label>
                    <textarea matInput rows="6" formControlName="{propertie}" required></textarea>
                </mat-form-field>`;
                let imageHtml = `<div class="col-md-12">
                    <app-upload-image nameBtn="Image" [folderToSaveInServer]="folderToSaveInServer" [propertyOfParent]="{propertie}To"
                        [eventSubmitToParent]="{propertie}From" [eventSubmitFromParent]="eventSubmitFromParent">
                    </app-upload-image>
                </div>`;
                let selectHtml = `<mat-form-field appearance="fill" class="col-md-6">
                    <mat-label>{classNav}s</mat-label>
                    <mat-select formControlName="{propertie}" readonly>
                        <mat-option *ngFor="let e of {classNav}s | async" [value]="e.id">{{ e.{name} }}</mat-option>
                    </mat-select>
                </mat-form-field>`;
                let checkBoxHtml = `<mat-checkbox class="col-md-6" formControlName="{propertie}"  labelPosition="before" >
                    Activer
                </mat-checkbox>`;
                let dateHtml = `<mat-form-field appearance="fill" class="col-md-6">
                    <mat-label>{propertie}</mat-label>
                    <input matInput [matDatepicker]="picker{i}" formControlName="{propertie}">
                    <mat-datepicker-toggle matSuffix [for]="picker{i}"></mat-datepicker-toggle>
                    <mat-datepicker #picker{i}></mat-datepicker>
                </mat-form-field>`;
                // edit content
                classes.forEach(e => {
                    fse.ensureDirSync(`${distination}/${e.class}`);
                    let formFields = '';
                    let images = '';
                    e.properties.forEach((p, i) => {
                        // for section of search
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive && p.name.toLowerCase() !== 'id') {
                            const isDate = p.type === 'Date';
                            const isSelect = p.name.toLowerCase() !== 'id' && p.name.startsWith('id');
                            const isCheckBox = p.type === 'boolean';
                            const isImage = p.name.includes('image');
                            const isDescription = p.name.toLowerCase().startsWith('desc');
                            if (isDate) {
                                formFields += dateHtml.replace(/\{propertie\}/g, p.name) + '\r\n\r\n';
                                formFields = formFields.replace(/\{i\}/g, `${i}`);
                            }
                            else if (isSelect) {
                                const { classNav, property } = this.displayPropertyForSelectHtml(classes, p.name);
                                formFields += selectHtml.replace(/\{classNav\}/g, classNav) + '\r\n\r\n';
                                formFields = formFields.replace(/\{propertie\}/g, p.name);
                                formFields = formFields.replace(/\{name\}/g, property);
                            }
                            else if (isCheckBox) {
                                formFields += checkBoxHtml.replace(/\{propertie\}/g, p.name) + '\r\n\r\n';
                            }
                            else if (isImage) {
                                images += imageHtml.replace(/\{propertie\}/g, p.name) + '\r\n\r\n';
                            }
                            else if (isDescription) {
                                formFields += textAreaHtml.replace(/\{propertie\}/g, p.name) + '\r\n\r\n';
                            }
                            else {
                                formFields += inputHtml.replace(/\{propertie\}/g, p.name) + '\r\n\r\n';
                            }
                        }
                    });
                    formFields += images;
                    let newContent = content.replace('{formFields}', formFields);
                    // write content in new location
                    fse.ensureDirSync(`${distination}/${e.class}/update`);
                    fse.writeFileSync(`${distination}/${e.class}/update/update.component.html`, newContent);
                    this.progress(`>> ${e.class}/update.component.html done`);
                    fse.copySync(`${source}/${UPDATE_COMPONENT_SCSS}`, `${distination}/${e.class}/update/${UPDATE_COMPONENT_SCSS}`);
                    this.progress(`>> ${e.class}/update.component.scss done`);
                });
            }
            else if (file === USER_COMPONENT_TS) {
                const distination = `${asp}/angular/src/app/${admin_folder}`;
                let content = fse.readFileSync(`${source}/${USER_COMPONENT_TS}`, 'utf8');
                // edit content
                classes.forEach(e => {
                    fse.ensureDirSync(`${distination}/${e.class}`);
                    let columnDefs = '';
                    let formControlInit = '';
                    let formControlReset = '';
                    let selections = '';
                    let params = '';
                    let params2 = '';
                    e.properties.forEach(p => {
                        // for section of search
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive && p.name.toLowerCase() !== 'id' && p.type !== 'Date' && p.type !== 'boolean'
                            && !p.name.startsWith('image') && !p.name.startsWith('desc') && !p.name.includes('pass')) {
                            const value = p.type === 'string' ? '' : 0;
                            formControlInit += `${p.name} = new FormControl(${value === 0 ? 0 : "''"});\r\n`;
                            formControlReset += `this.${p.name}.setValue(${value === 0 ? 0 : "''"});\r\n`;
                            params += `this.${p.name}.value === ${value === 0 ? 0 : "''"} ? ${value === 0 ? 0 : "'*'"} : this.${p.name}.value,\r\n`;
                            params2 += ` ${p.name},`;
                            const isSelect = /*p.name.toLowerCase() !== 'id' &&*/ p.name.startsWith('id');
                            if (isSelect) {
                                const classNav = p.name.replace('id', '').toLowerCase();
                                selections += `${classNav}s = this.uow.${classNav}s.get();\r\n`;
                            }
                        }
                        // for section displayedColumns for table
                        if (isTypePrimitive && !p.name.startsWith('desc') && !p.name.includes('pass') && p.name !== 'id' && !p.type.includes('[]')) {
                            if (p.name.startsWith('id')) {
                                const classNav = p.name.replace('id', '').toLowerCase();
                                columnDefs += ` '${classNav}',`;
                            }
                            else {
                                const isImage = p.name.includes('image');
                                if (isImage) {
                                    columnDefs = ` '${p.name}',` + columnDefs;
                                }
                                else {
                                    columnDefs += ` '${p.name}',`;
                                }
                            }
                        }
                    });
                    // content = content.replace('/*{imports}*/', imports);
                    let newContent = content.replace(/User\$/g, this.Cap(e.class));
                    newContent = newContent.replace(/user/g, e.class);
                    newContent = newContent.replace('/*{columnDefs}*/', columnDefs);
                    newContent = newContent.replace('/*{formControlInit}*/', formControlInit);
                    newContent = newContent.replace('/*{formControlReset}*/', formControlReset);
                    newContent = newContent.replace('/*{params}*/', params);
                    newContent = newContent.replace('/*{params2}*/', params2);
                    newContent = newContent.replace('/*{params3}*/', params2);
                    newContent = newContent.replace('/*{selections}*/', selections);
                    // write content in new location
                    fse.ensureDirSync(`${distination}/${e.class}`);
                    fse.writeFileSync(`${distination}/${e.class}/${e.class}.component.ts`, newContent);
                    this.progress(`>> ${e.class}.component.ts done`);
                });
            }
            else if (file === USER_ROUTING_MODULE_TS) {
                // get content
                const distination = `${asp}/angular/src/app/${admin_folder}`;
                let content = fse.readFileSync(`${source}/${USER_ROUTING_MODULE_TS}`, 'utf8');
                // edit content
                classes.forEach(e => {
                    let newContent = content.replace(/User\$/g, this.Cap(e.class));
                    newContent = newContent.replace(/user/g, e.class);
                    // write content in new location
                    fse.ensureDirSync(`${distination}/${e.class}`);
                    fse.writeFileSync(`${distination}/${e.class}/${e.class}-routing.module.ts`, newContent);
                    this.progress(`>> ${e.class}-routing.module.ts done`);
                });
            }
            else if (file === USER_MODULE_TS) {
                // get content
                const distination = `${asp}/angular/src/app/${admin_folder}`;
                let content = fse.readFileSync(`${source}/${USER_MODULE_TS}`, 'utf8');
                // edit content
                classes.forEach(e => {
                    let newContent = content.replace(/User\$/g, this.Cap(e.class));
                    newContent = newContent.replace(/user/g, e.class);
                    // write content in new location
                    fse.ensureDirSync(`${distination}/${e.class}`);
                    fse.writeFileSync(`${distination}/${e.class}/${e.class}.module.ts`, newContent);
                    this.progress(`>> ${e.class}.module.ts done`);
                });
            }
        });
    }
    Cap(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    displayPropertyForSelectHtml(classes, propertyName) {
        const classNav = propertyName.replace('id', '').toLowerCase();
        const obj = classes.find(c => c.class.toLowerCase() === classNav);
        // console.log('>>>>>>>>>>>>>>>>', obj) 
        if (obj) {
            return { classNav, property: obj.properties[1].name };
        }
        return { classNav, property: 'name' };
    }
    progress(info) {
        console.log(info);
    }
}
exports.Generate = Generate;
