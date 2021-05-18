import * as _ from 'lodash';
import * as fse from 'fs-extra';
import { Parser } from 'xml2js';

class ClubJson {
    string:string[] = [];
    'sv.entities.Club': {
        comments: any[],
        bonuses: any[],
        values: any[],
        category: any[],
        code:string[],
        history: any[],
        name:string[],
        peerGroups: any[],
        bspls: any[],
        reportConfig: any[],
        championship: {$: {reference: string}}[],
        description:string[],
        highlight:string[],
        logoPath:string[],
        company:string[],
    }[] = [];
}

class Championship {
    string:string[] = [];
    'sv.entities.Championship': {
        comments:any[],
        bonuses:any[],
        values: value[],
        category:any[],
        code:string[],
        history:any[],
        name:string[],
        country: {$: {reference: string}}[],
    }[] = [];
}

class Country {
    string:string[] = [];
    'sv.entities.Country': {
        comments: any[],
        bonuses:any [],
        values: value[],
        code:string[],
        name:string[],
    }[] = [];
}

class value {
    entry: {
        string: string[], 
        'sv.score.indicators.Value': {value0: string}[]
    }[] = []
}

async function parseXml() {
    const createFiles = fse.createWriteStream(`${__dirname}/result.json`, { flags: 'w' /*flags: 'a' preserved old data*/ })

    
    const file = fse.readFileSync(`${__dirname}/sv.xml`);
    
    const parser = new Parser();
    
    const r: string = await parser.parseStringPromise(file);
    
    createFiles.write(JSON.stringify(r, null, '  '));
}

async function parseJsonToClass() {
    const createFiles = fse.createWriteStream(`${__dirname}/result.json`, { flags: 'w' /*flags: 'a' preserved old data*/ })

    
    const file = fse.readFileSync(`${__dirname}/clubs.json`);

    const r = JSON.parse(file as any) as ClubJson[];
    r.forEach(e => {
        const rs = {
            name = r.
        }
    })
    
    createFiles.write(JSON.stringify(r, null, '  '));
}


async function main() {

    
}
//
main();