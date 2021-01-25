import * as fse from 'fs-extra';
import * as glob from 'glob';
import { Glob } from 'glob';
import { filter } from 'lodash';


const configs = {
  pathBaseFiles: `${process.cwd()}/generate-i18n/base-files`,
  pathGenerateFiles: `${process.cwd()}/generate-i18n/generated`,
}


async function doReady() {
  // const files = fse.readdirSync(configs.pathBaseFiles);
  const p = new Promise<string[]>((res, rej) => new Glob(`${configs.pathBaseFiles}/**/*.html`, (err, files) => err ? rej(err) : res(files)))

  const files = await p;

  files.forEach((e, i) => {
    const index = e.lastIndexOf('/');

    const newFolder = e.substring(0, index).replace(configs.pathBaseFiles, '');
    const file = e.substring(index + 1)
    console.log(newFolder + '>>>>>>>>>>>>>')
    console.log(file)
    console.log(configs.pathBaseFiles)
  })

  // files.filter(e => e.endsWith('.html')).forEach((fileName, i) => {
  //   let htmlContent = fse.readFileSync(`${configs.pathBaseFiles}/${fileName}`, 'utf8');

  //   doHtml(htmlContent)


  //   fse.ensureDirSync(`${configs.pathGenerateFiles}`);

  //   fse.writeFileSync(`${configs.pathGenerateFiles}/${fileName}`, htmlContent);
  // });
}

function doHtml(content: string) {
  const list = content.replace(/(<([^>]+)>)/gi, ";@;").split(';@;').map(e => e.trim()).filter(e => e !== '');



  console.log(list);
}

function main() {
  doReady();

  // const stringTest = `
  // <h4 class="mb-0 font-size-18">Tableau de bord </h4>
  // <div class="page-title-right">
  //     <ol class="breadcrumb m-0">
  //         <li class="breadcrumb-item active">Bienvenue à bord !</li>
  //     </ol>
  // </div>
  // <input type="text" placeholder=  "my name is you">
  // <mat-icon>icon</mat-icon>
  // <h5 class="font-size-15 mb-1">MAD {{order.price}}</h5>
  // <app-stat title="Prix moyen" [value]="'MAD '+round(average)" icon="bx bx-stats"></app-stat>
  // `;

  // // console.log(new RegExp('\\d', 'gi').exec(stringTest))
  // const reBalise = /(<([^<|>]+)>)/gi;
  // const reVariable = /({{(.*)}})/gi;
  // const reMatIcon = /(<\/?maticon>)/gi;
  // const rePlaceHolder = /(placeholder(\s*)=(\s*)"([^]+)")/gi;
  // const reTitle = /title(\s*)=(\s*)"([^"]+)"/gi;
  // const text = /title(\s*)=(\s*)"([^"]+)"/gi;

  // console.log(stringTest.match(re0))
  // console.log(stringTest.match(rePlaceHolder).map(e => e.replace(/placeholder(.*)=(.*?)"/gi, '"')))
}

/**
 * lanche the programme
 */
main();




