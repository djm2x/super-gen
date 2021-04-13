import * as fse from 'fs-extra';
import { Glob } from 'glob';
import { filter } from 'lodash';
import * as translate from '@vitalets/google-translate-api';
// const translate = require('@vitalets/google-translate-api');
import { IOptions, languages } from '@vitalets/google-translate-api';
import { httpsOverHttp } from 'tunnel';


const configs = {
  pathBaseFiles: `${__dirname}/base-files`,
  pathGenerateFiles: `${__dirname}/generated`,
}


async function doReady() {
  // const files = fse.readdirSync(configs.pathBaseFiles);
  // read all html files in base files
  const files = await new Promise<string[]>((res, rej) => new Glob(`${configs.pathBaseFiles}/**/*.html`, (err, files) => err ? rej(err) : res(files)))

  await Promise.all(
    files?.map(async (e, i) => {
      const dist = e.substring(e.indexOf('base-files/')).replace('base-files/', '');
      const fileName = e.substring(e.lastIndexOf('/') + 1);

      let htmlContent = fse.readFileSync(e, 'utf8');

      // do html take text between balise html to array of string
      let listOfText = doHtml(htmlContent);

      const hierarchy = dist.split('/');

      hierarchy.pop();

      // if (hierarchy.includes('passwordreset')) {
      //   console.log(listOfText)
      // }


      // repalce content between balise html with a new string | translate
      listOfText.map(e => {
        htmlContent = htmlContent.replace(e, `{{ '${hierarchy.join('.')}.${e.replace(/\s|'/g, '_')}' | translate }}`)
      })

      fse.ensureDirSync(`${configs.pathGenerateFiles}/${dist}`)

      //write html
      fse.writeFileSync(`${configs.pathGenerateFiles}/${dist}/${fileName}`, htmlContent);

      // console.log(`${configs.pathGenerateFiles}/${dist}/${fileName}\r\n`)

      await createJsonLangFiles(dist, listOfText);
    })
  );
  console.log('doReady done')
}

function timeOut(time = 1000) {
  return new Promise<boolean>((res, _) => setTimeout(() => res(true), time));
}

async function createJsonLangFiles(distination: string, listOfText: string[]) {

  await Promise.all(
    ['en', 'fr', 'ar'].map(async lang => {


      let promise = await Promise.all(
        listOfText.map(async (text, i) => `"${text.replace(/\s|'/g, '_')}":"${await tran(text, lang)}"`)
      );

      let keyValue = promise.join(',');

      const hierarchy = distination.split('/');

      hierarchy.pop();

      let obj = '{_}';
      // let obj = `{"${hierarchy[hierarchy.length - 1]}": {_}}`;

      hierarchy?.forEach(e => {
        obj = obj.replace('_', `"${e}": {_}`)
      });

      obj = obj.replace('_', keyValue)

      // console.log(JSON.stringify(obj, null, '  '));
      fse.ensureDirSync(`${configs.pathGenerateFiles}/${distination}`)

      const jsonLang = JSON.parse(JSON.stringify(obj));
      // write json
      fse.writeFileSync(`${configs.pathGenerateFiles}/${distination}/${lang}.json`, jsonLang);

      // console.log(`${configs.pathGenerateFiles}/${distination}/${lang}.json`);
    })
  );

  // console.log(`\r\n`)
}
async function tran(text: string, lang: string): Promise<string> {
  try {
    // const b = await timeOut();
    const proxy = {
      agent: httpsOverHttp({
        proxy: {
          host: '127.0.0.1',
          proxyAuth: 'me:12345679',
          port: 9000,
          headers: {
            'User-Agent': 'Node'
          }
        }
      })
    }

    if (languages.fr === lang) {
      return text;
    }

    // for the moment we cant acces translate.api
    return text;

    const r = await translate(text, { from: languages.fr, to: lang });

    return r.text;
  } catch (e) {
    console.log('>>>>>>> : ', (e as Error));

    return text
  }
}

function doHtml(content: string) {
  const rePlaceHolder = /(placeholder(\s*)=(\s*)"([^>]+)")/gi;
  const reMatIcon = /(<\/?maticon>)/gi;
  let listOfText = content
    .replace(/<mat-icon>(\s*)<\/mat-icon>/g, "")
    .replace(/(<([^>]+)>)/gi, ";@;")
    .split(';@;')
    .map(e => e.trim())
    .filter(e => e !== '')
    ;

  const listOfPlaceholders = content.match(rePlaceHolder)?.map(e => e.replace(/placeholder(.*)=(.*?)"/gi, '"'))

  listOfPlaceholders?.map(e => listOfText.push(e.replace(/"/g, '')))

  listOfText = listOfText.filter(e => e.includes('{{') !== true)

  return listOfText;
}

async function main() {
  doReady();

  // const MENU = [
  //   "Menu",
  //   "Tableau de bord",
  //   "Commandes",
  //   "Nouveau produit",
  //   "Liste des produits",
  //   "Produits",
  //   "Catégories",
  //   "Suppléments",
  //   "Caractéristiques",
  //   "Promotions",
  //   "CMS",
  //   "Paramétrages",
  //   "Nouvelle catégorie",
  //   "Liste des catégories",
  //   "Nouveau supplément",
  //   "Liste des suppléments",
  //   "Nouvelle caractéristique",
  //   "Liste des caractéristique",
  //   "Nouvelle promotion",
  //   "Liste des promotions",
  //   "Clients",
  //   "Page",
  //   "Article",
  //   "Utilisateurs",
  //   "Compte",
  //   "Général",
  //   "Personnalisation",
  //   "Sous domaine",
  //   "Points de vente",
  //   "Ouverture",
  //   "Livraison",
  //   "Cashback",
  //   "Contact",
  //   "Tickets",
  // ];

  // let frJson = fse.readFileSync(`${__dirname}/test.txt`, 'utf8');

  // MENU.map((e, i) => {
  //   frJson = frJson.replace(`'${e}'`, `'pages.menu.${e}'`)
  // });

  // fse.writeFileSync(`${__dirname}/test2.txt`, frJson);



  return
  const stringTest = `
  <h4 class="mb-0 font-size-18">Tableau de bord </h4>
  <div class="page-title-right">
      <ol class="breadcrumb m-0">
          <li class="breadcrumb-item active">Bienvenue à bord !</li>
      </ol>
  </div>
  <input type="text" placeholder=  "my name is you" type test>
  <mat-icon>icon</mat-icon>
  <h5 class="font-size-15 mb-1">MAD {{order.price}}</h5>
  <app-stat title="Prix moyen" [value]="'MAD '+round(average)" icon="bx bx-stats"></app-stat>
  `;

  // console.log(new RegExp('\\d', 'gi').exec(stringTest))
  const reBalise = /(<([^<|>]+)>)/gi;
  const reVariable = /({{(.*)}})/gi;
  const reMatIcon = /(<\/?maticon>)/gi;
  const rePlaceHolder = /(placeholder(\s*)=(\s*)"([^>]+)")/gi;
  const reTitle = /title(\s*)=(\s*)"([^"]+)"/gi;
  const text = /title(\s*)=(\s*)"([^"]+)"/gi;

  // console.log(stringTest.match(re0))
  console.log(stringTest.match(rePlaceHolder).map(e => e.replace(/placeholder(.*)=(.*?)"/gi, '"')))
}

/**
 * lanche the programme
 */
main();




