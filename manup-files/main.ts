import { Glob } from 'glob';
import * as fse from 'fs-extra';

const madragues = [
    'BLUE FARM',
    'ES SAHEL',
    'GHARB',
    'LA GARIFA',
    'MABROUKA',
    'MANSOURIA 2',
    'PUNTA NEGRA',
]


async function main() {
    const pathBaseFiles = `F:\\Etude\\ICCAT2021\\rapports\\R3_week2`;
    const files = await new Promise<string[]>((res, rej) => new Glob(`${pathBaseFiles}/**/*.docx`, (err, files) => err ? rej(err) : res(files)))


    files.forEach(e => {
        console.log(e.replace('001MA0617_', '').replace('_Mohamed MOURABIT_R3_Week2', ''))
        // fse.renameSync(e, e.replace('Week1.docx', 'Week2.docx'));
    })
}

try {
    main();
} catch (error) {
    const e: Error = error;
    console.log('%c' + e.message, 'background: green; font-size: 1.2em')
}