const readXlsxFile = require('read-excel-file/node');
import * as _ from 'lodash';
import * as fse from 'fs-extra';

export class Product {
    id = 0;
    name = '';
    description = '';
    stockDate = new Date();
    price = 0;
    available = true;
    stock = 0;
    suggestOnly = false;
    ddOrder = 0;
    displayInSoldOut = true;
    parentProductId = 0;
    frontLine = false;
    slug = '';
    metaTitle = '';
    metaDescription = '';
    saleCount = 0;
    package = false;
    packageProducts = '';
    creationDate = new Date();
    publishedDate = new Date();
    published = true;
    publisher = 0;
    externalId = 0;
    discountPrice = 0;
    appliedDiscount = '';
    discountId = null;
    shopId = 1;
}

export class Category {
    id = 0;
    name= '';
    variant = false;
    active = true;
    ddOrder = 0;
    brand = false;
    price = 0;
    nameFee = '';
    imageUrl = '';
    icon = '';
    appliedDiscount = '';
  
    discountId = null;
  
    shopId = 1;
  }
// let i = 0;

// const all = new ConnectionInit();

// const db = all.dbSqlite3(`D:\\MarIT\\mem\\db\\dev.db`);

// const get = (query: string) => new Promise<any[]>((res, rej) => db.all(query, (e, r) => { res(r); if (e) rej(e) }));

async function main() {
    let content = '';

    let categories = [
        { id: 1, name: "Smartphone", },
        { id: 2, name: "Tablette", },
        { id: 3, name: "Objet connectés", },
        { id: 4, name: "Accessoires", },
        { id: 5, name: "Ecran", },
        { id: 6, name: "Routeur", },
        { id: 7, name: "Ordinateur", },
        { id: 8, name: "Speaker", },
        { id: 9, name: "Sumsung", },
        { id: 10, name: "Huawei", },
        { id: 11, name: "Iphone", },
        { id: 12, name: "Oppo", },
        { id: 13, name: "Nokia", },
    ]

    content += '-----------------------------\t\r'

    const path = `${__dirname}/excel/calogue-gam.xlsx`;
    const createFiles = fse.createWriteStream(`${__dirname}/excel/calogue-gam.sql`, { flags: 'w' /*flags: 'a' preserved old data*/ })

    let schema = {
        'Type': { prop: 'Type', type: String, required: false },
        'Id': { prop: 'Id', type: Number, required: false },
        'Nom': { prop: 'Name', type: String, required: false },

        'Description': { prop: 'Description', type: String, required: false },
        'Description courte': { prop: 'DescriptionCourte', type: String, required: false },

        'Stock': { prop: 'Stock', type: Number, required: false },

        'Autoriser les commandes de produits en rupture ?': { prop: 'DisplayInSoldOut', type: Boolean, required: false },
        'Tarif promo': { prop: 'DiscountPrice', type: Number, required: false },

        'Catégories': { prop: 'Category', type: String, required: false },
        'Étiquettes': { prop: 'Tag', type: String, required: false },

        'Brand': { prop: 'Brand', type: String, required: false },

    }

    interface IExcel {
        Type: string,
        Id: number;
        Name: string,
        Description: string,
        DescriptionCourte: string,
        Stock: number,
        DisplayInSoldOut: boolean,
        DiscountPrice: number,
        Category: string,
        Tag: string,
        Brand: string,
    }

    console.log('>>>>>>>>>>>>>>>>', path)

    try {
        const sheets: { name: string }[] = await readXlsxFile(path, { getSheets: true });

        let idToStart = 200;

        let newCat = [];
        let productCategory = [];
        let productTag = [];
        let index = 14;
        let products = [];
        let tags = [];


        for (const sheet of sheets/*.filter((e, i) => i < 2)*/) {

            if (categories.map(e => e.name).includes(sheet.name)) {
                const cat = new Category();
                cat.id = index++;
                cat.name = sheet.name
                newCat.push(cat)
            }

            const list: { rows: IExcel[], errors: any[] } = await readXlsxFile(path, { schema, sheet: sheet.name });

            list.rows.forEach((e, i) => {
                if (e.Type.toLowerCase() === 'variation'.toLowerCase()) {
                    return;
                }
                const p = new Product();
                p.id = idToStart++;
                p.name = e.Name;
                p.description = e.Description ? e.Description : e.DescriptionCourte;
                p.stock = e.Stock === 0 ? _.random(2000, 10000) : e.Stock;
                p.displayInSoldOut = e.DisplayInSoldOut;
                p.discountPrice = e.DiscountPrice;

                products.push(p)

                if (e.Brand) {
                    const cat = newCat.find(c => c.name.toLowerCase() === e.Brand.toLowerCase())

                    if (cat) {
                        productCategory.push({ productId: idToStart, categoryId: cat.id })
                    }
                }

                if (e.Category) {
                    const cat = newCat.find(c => c.name.toLowerCase() === e.Category.toLowerCase())
                    if (cat) {
                        productCategory.push({ productId: idToStart, categoryId: cat.id })
                    }
                    
                }

                tags.push(e.Tag);

                productTag.push({tagId: _.random(1, 5), productId: idToStart - 1});
                productTag.push({tagId: _.random(6, 10), productId: idToStart - 1});
                productTag.push({tagId: _.random(11, 16), productId: idToStart - 1});

            });



            // console.log(list.rows[0])
        }

        createFiles.write('SET IDENTITY_INSERT Categories ON \r\n');
        
        createFiles.write('INSERT INTO Categories ( id, name, variant, active, ddOrder, brand, price, nameFee, imageUrl, icon, appliedDiscount, discountId, shopId) values\r\n\r');
    

        newCat.forEach((e, i) => {

            let s = `(${e.id}, '${e.name}', '${e.variant}', '${e.active}', '${e.ddOrder}', '${e.brand}', '${e.price}', '${e.nameFee}', '${e.imageUrl}', '${e.icon}', '${e.appliedDiscount}', null, '${e.shopId}')${(newCat.length - 1 !== i) ? ',' : ';'}\r\n`;

            s = s.replace(/undefined/g, null).replace(/\'null\'/g, "''")

            createFiles.write(s);
        })

        createFiles.write('\r\nSET IDENTITY_INSERT Categories OFF\r\nGO\r\n-->>>>>>>>>’>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\n\r\n');

        // console.log(recomLenght)
        // console.log(rcms[0])

        createFiles.write('use gam\r\nGO\r\nSET IDENTITY_INSERT Products ON \r\n');

        createFiles.write('INSERT INTO Products (id, name, description, stockDate, price, available, stock, suggestOnly, ddOrder, displayInSoldOut, parentProductId, frontLine, slug, metaTitle, metaDescription, saleCount, package, packageProducts, creationDate, publishedDate, published, publisher, externalId, discountPrice, appliedDiscount, discountId, shopId) values\r\n')

        products.forEach((e, i) => {
            e.IdCycle = 1;
            let s = `( '${e.id}', '${e.name}', N'${e.description.replace(/\'/g, '`').replace(/\\t/g,'').replace(/\\r/g,'')}', '2021-03-13', '${e.price}', '${e.available}', '${e.stock}', '${e.suggestOnly}', '${e.ddOrder}', '${e.displayInSoldOut}', null, '${e.frontLine}', '${e.slug}', '${e.metaTitle}', '${e.metaDescription}', '${e.saleCount}', '${e.package}', '${e.packageProducts}', '2021-03-13', '2021-03-13', '${e.published}', '${e.publisher}', 1, '${e.discountPrice}', '${e.appliedDiscount}', null, '${e.shopId}')${(products.length - 1 !== i) ? ',' : ';'}\r\n`;
            s = s.replace(/undefined/g, null).replace(/\'null\'/g, "''")
            createFiles.write(s);
        })

        createFiles.write('\r\nSET IDENTITY_INSERT Products OFF\r\nGO\r\n-->>>>>>>>>’>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\n\r\n');

        
        createFiles.write('SET IDENTITY_INSERT Tags ON \r\n');
        
        createFiles.write('INSERT INTO Tags (id ,name ,color ,type ,actif ,shopId) values\r\n\r');
        tags = _.uniqWith(tags, _.isEqual);

        tags.forEach((e, i) => {

            let s = `(${i + 20}, '${e}', 'green', 'tag', 1, 1)${(tags.length - 1 !== i) ? ',' : ';'}\r\n`;

            s = s.replace(/undefined/g, null).replace(/\'null\'/g, "''")

            createFiles.write(s);
        })

        createFiles.write('\r\nSET IDENTITY_INSERT Tags OFF\r\nGO\r\n-->>>>>>>>>’>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\n\r\n');

        
        createFiles.write('INSERT INTO TagProducts (tagId ,productId) values\r\n\r');

        productTag.forEach((e, i) => {

            const s = `(${e.tagId}, ${e.productId})${(productTag.length - 1 !== i) ? ',' : ';'}\r\n`;

            createFiles.write(s);
        })

        //

        

        
        createFiles.write('INSERT INTO TagProducts (tagId ,productId) values\r\n\r');

        productTag.forEach((e, i) => {

            const s = `(${e.tagId}, ${e.productId})${(productTag.length - 1 !== i) ? ',' : ';'}\r\n`;

            createFiles.write(s);
        })


        console.log('done');

    } catch (er) {
        const e: Error = er;
        console.error(e.name)
        console.error(e.message)
        console.error(e.stack)
    }
}
//
main();