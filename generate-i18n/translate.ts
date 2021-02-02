import * as fse from 'fs-extra';
import * as glob from 'glob';
import { Glob } from 'glob';
import { filter } from 'lodash';


const configs = {
  pathBaseFiles: `${__dirname}/base-files`,
  pathGenerateFiles: `${__dirname}/generated`,
}


async function doReady() {
  // const files = fse.readdirSync(configs.pathBaseFiles);
  const p = new Promise<string[]>((res, rej) => new Glob(`${configs.pathBaseFiles}/**/*.html`, (err, files) => err ? rej(err) : res(files)))

  const files = await p;

  files.forEach((e, i) => {
    const dist = e.substring(e.indexOf('base-files/')).replace('base-files/', '');
    const fileName = e.substring(e.lastIndexOf('/') + 1);

    console.log(__dirname)
    console.log(dist)
    console.log(fileName)

    const hierarchy = dist.split('/')
    hierarchy.pop();

    // let obj = '{_}';
    let obj = `{"${hierarchy[hierarchy.length - 1]}": {_}}`;
    let obj = `{"${hierarchy[hierarchy.length - 1]}": {_}}`;

    // hierarchy.forEach(e => {
    //   obj = obj.replace('_', `"${e}": {_}`)
    // });

    let htmlContent = fse.readFileSync(e, 'utf8');



    let listOfText = doHtml(htmlContent);

    listOfText.map(e => {
      htmlContent = htmlContent.replace(e, `{{ '${e.replace(/\s/g,'_')}' | translate }}`)
    })

    let keyValue = listOfText.map(e => `"${e.replace(/\s/g,'_')}":"${e}"`).join(',');

    // remove last -,-
    // keyValue = keyValue.slice(0, -1);

    obj = obj.replace('_', keyValue)

    // console.log(JSON.stringify(obj, null, '  '));
    fse.ensureDirSync(`${configs.pathGenerateFiles}/${dist}`)

    // write json
    fse.writeFileSync(`${configs.pathGenerateFiles}/${dist}/fr.json`, JSON.parse(JSON.stringify(obj, null, '  ')) );

    //write html
    fse.writeFileSync(`${configs.pathGenerateFiles}/${dist}/${fileName}`, htmlContent);

  })

  // files.filter(e => e.endsWith('.html')).forEach((fileName, i) => {
  //   let htmlContent = fse.readFileSync(`${configs.pathBaseFiles}/${fileName}`, 'utf8');

  //   doHtml(htmlContent)


  //   fse.ensureDirSync(`${configs.pathGenerateFiles}`);

  //   fse.writeFileSync(`${configs.pathGenerateFiles}/${fileName}`, htmlContent);
  // });
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

  const listOfPlaceholders = content.match(rePlaceHolder).map(e => e.replace(/placeholder(.*)=(.*?)"/gi, '"'))

  listOfPlaceholders.map(e => listOfText.push(e.replace(/"/g, '')))

  listOfText = listOfText.filter(e => e.includes('{{') !== true)

  // console.log(listOfPlaceholders);
  // console.log(listOfText);
  // console.log(listOfText.length);

  return listOfText;
}

function main() {
  doReady();
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




