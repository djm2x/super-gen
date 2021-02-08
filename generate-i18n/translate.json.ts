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
  path: `${__dirname}/i18n`,
}


async function doReady() {
  // const files = fse.readdirSync(configs.pathBaseFiles);



  let htmlContent = fse.readFileSync(`${configs.path}/fr.json`, 'utf8');

  let listOfText = doHtml(htmlContent);


  const createFiles = fse.createWriteStream(`${configs.path}/fr.txt`, { flags: 'w' /*flags: 'a' preserved old data*/ })

  listOfText.map(e => createFiles.write(e + '\r\n'))
  // console.log(listOfText)

  // fse.ensureDirSync(`${configs.pathGenerateFiles}/${dist}`)

  // //write html
  // fse.writeFileSync(`${configs.pathGenerateFiles}/${dist}/${fileName}`, htmlContent);

  // // console.log(`${configs.pathGenerateFiles}/${dist}/${fileName}\r\n`)

  // await createJsonFiles(dist, listOfText);

  console.log('done')
}

async function readTextTranslated() {
  let ar = fse.readFileSync(`${configs.path}/ar.txt`, 'utf8').split('\r\n');
  let fr = fse.readFileSync(`${configs.path}/fr.txt`, 'utf8').split('\r\n');

  let frJson = fse.readFileSync(`${configs.path}/fr.json`, 'utf8');

  let newContent = '';

  fr.forEach((e, i)=> {
    frJson = frJson.replace(e, ar[i]);
  });

  fse.writeFileSync(`${configs.path}/en.json`, frJson);

}

function timeOut(time = 1000) {
  return new Promise<boolean>((res, _) => setTimeout(() => res(true), time));
}
function doHtml(content: string) {
  const rePlaceHolder = /: ".*"/gi;

  const listOfPlaceholders = content.match(rePlaceHolder)

  return listOfPlaceholders;
}

async function main() {
  // doReady();

  readTextTranslated()
}

/**
 * lanche the programme
 */
main();




