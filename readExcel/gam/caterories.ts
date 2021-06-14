const readXlsxFile = require('read-excel-file/node');
import * as _ from 'lodash';
import * as fse from 'fs-extra';

export class Category {
    id = 0;
    name = '';
    variant = false;
    active = true;
    ddOrder = 0;
    brand = true;
    price = 0;
    nameFee = '';
    imageUrl = '';
    icon = '';
    appliedDiscount = '';

    discountId = null;

    shopId = 11;
    parentId = null;
}
// let i = 0;

// const all = new ConnectionInit();

// const db = all.dbSqlite3(`D:\\MarIT\\mem\\db\\dev.db`);

// const get = (query: string) => new Promise<any[]>((res, rej) => db.all(query, (e, r) => { res(r); if (e) rej(e) }));

async function main() {
    let content = '';

    let categories = [
        { parentId: null, id: 39, name: "Smartphone", },
        { parentId: null, id: 40, name: "Tablette", },
        { parentId: null, id: 41, name: "Objet connectés", },
        { parentId: null, id: 42, name: "Accessoires", },
        { parentId: null, id: 43, name: "Ecran", },
        { parentId: null, id: 44, name: "Routeur", },
        { parentId: null, id: 45, name: "Ordinateur", },
        { parentId: null, id: 46, name: "Speaker", },
        { parentId: null, id: 47, name: "Sumsung", },
        { parentId: null, id: 48, name: "Huawei", },
        { parentId: null, id: 49, name: "Iphone", },
        { parentId: null, id: 50, name: "Oppo", },
        { parentId: null, id: 51, name: "Nokia", },
        { parentId: 39, id: 14, name: "Série HUAWEI nova", },
        { parentId: 39, id: 15, name: "Série Y HUAWEI", },
        { parentId: 39, id: 16, name: "Série P HUAWEI", },
        { parentId: 39, id: 17, name: "Série HUAWEI Mate", },
        { parentId: 41, id: 18, name: "Audio sans fil", },
        { parentId: 41, id: 19, name: "Montres", },
        { parentId: 41, id: 54, name: "Ecouteurs", },
    ]

    let schema = {
        'Type': { prop: 'Type', type: String, required: false },
        'Catégories/sous-catégorie': { prop: 'Category', type: String, required: false },
        'Catégories': { prop: 'Category', type: String, required: false },
        'Brand': { prop: 'Brand', type: String, required: false },
    }

    interface IExcel {
        Category: string,
        Type: string,
        Brand: string,
    }

    const path = `${__dirname}/calogue-gam.xlsx`;

    const l = [
        {id: 70, name:"Wiko",},
        {id: 71, name:"Apple",},
        {id: 72, name:"UnoMass",},
        {id: 73, name:"Tecno",},
        {id: 74, name:"Motorola",},
        {id: 75, name:"JBL",},
        {id: 76, name:"Harman Kardon",},
        {id: 77, name:"Uunique",},
        {id: 78, name:"Telo"},
      ]

    let ss = 'SET IDENTITY_INSERT Categories ON \r\n';

    ss += 'INSERT INTO Categories ( id, name, variant, active, ddOrder, brand, price, nameFee, imageUrl, icon, appliedDiscount, discountId, shopId, AdditionalFeeId, ParentId) values\r\n\r';
    let idToStart = 70
    l.forEach((e, i) => {
        const c = new Category();
        c.name = e.name;
        ss += `(${idToStart++}, '${c.name}', '${c.variant}', '${c.active}', '${c.ddOrder}', '${c.brand}', '${c.price}', '${c.nameFee}', '${c.imageUrl}', '${c.icon}', '${c.appliedDiscount}', null, '${c.shopId}', null, '${c.parentId}')${(l.length - 1 !== i) ? ',' : ';'}\r\n`;

        ss = ss.replace(/undefined/g, null).replace(/\'null\'/g, "''")
    })

    ss+= '\r\nSET IDENTITY_INSERT Categories OFF\r\nGO\r\n-->>>>>>>>>’>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\n\r\n'

    writeFile('insertBarnds.sql', ss);

    return;
    try {
        const sheets: { name: string }[] =  await readXlsxFile(path, { getSheets: true });

        let cats = '';
        let parentcats: any[] = [];
        let childcats: any[] = [];
        for (const sheet of sheets/*.filter((e, i) => i < 2)*/) {

            console.log(sheet.name)
            const list: { rows: IExcel[], errors: any[] } = await readXlsxFile(path, { schema, sheet: sheet.name });

            list.rows.forEach((e, i) => {
                // we accepte just 'simple and variable'
                if (e.Type.toLowerCase() === 'variation'.toLowerCase()) {
                    return;
                }

                if (e.Brand) {
                    // const parentCategory = e.Category.split('>')[0];
                    // const childCategory = e.Category.split('>')[1];

                    parentcats.push(e.Brand)

                    // if (childCategory) {
                    //     childcats.push({ name: childCategory, parent: parentCategory });
                    // }
                }
            });
        }


        writeFile('parentcats.txt', JSON.stringify(parentcats, null, '  '));
        // writeFile('childcats.txt', JSON.stringify(childcats, null, '  '));

        // let parentcats1: string[] = JSON.parse(fse.readFileSync(`${__dirname}/seeds/parentcats.json`) as any);


        // parentcats1 = _.uniqBy(parentcats1, e => e)
        // childcats1 = _.uniqBy(childcats1, e => e.name)


    } catch (er) {
        const e: Error = er;
        console.error(e.name)
        console.error(e.message)
        console.error(e.stack)
    }
}

function writeFile(fileName: string, content: string) {
    fse.createWriteStream(`${__dirname}/seeds/${fileName}`, { flags: 'w' }).write(content);
}
//
main();