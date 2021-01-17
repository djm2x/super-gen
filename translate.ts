import * as fse from 'fs-extra';
import { filter } from 'lodash';

function main() {
    let content = fse.readFileSync(`./index.html`, 'utf8');

    // console.log(content);


    const originalString = `
  <div>
    <p>Hey that's <span>somthing</span></p>
  </div>
`;

const strippedString = content.replace(/(<([^>]+)>)/gi, ";@;").split(';@;').map(e => e.trim()).filter(e => e !== '');

console.log(strippedString);

}


main();




