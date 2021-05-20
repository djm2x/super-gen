import * as _ from 'lodash';
import * as fse from 'fs-extra';
import { Parser } from 'xml2js';

class ClubJson {
    string: string[] = [];
    'sv.entities.Club': {
        comments: Comment[],
        bonuses: Bonuse[],
        values: value[],
        category: Category[],
        code: string[],
        history: History[],
        name: string[],
        peerGroups: string[],
        bspls: Bspl[],
        reportConfig: ReportConfig[],
        championship: { $: { reference: string } }[],
        description: string[],
        highlight: string[],
        logoPath: string[],
        company: string[],
    }[] = [];
}

class Comment {
    entry: { string: string[] }[] = []
}

class Category {
    '$': {class: string, reference: string}
}

class Bonuse {
    entry: {
        string: string[],
        'sv.score.indicators.Bonus': { bonus: string[] }[]
    }[]
}

class ReportConfig {
    includeRadar: string[] = [];
    includeClubComment: string[] = [];
    includeClubHighlight: string[] = [];
    includeWageAndRevenue: string[] = [];
    includeLossAndRevenue: string[] = [];
    includeOffBalance: string[] = [];
    includeBSPLSummary: string[] = [];
    includeBSPLDetail: string[] = [];
    includeBSPLHistory: string[] = [];
    themeConfigs: {
        entry: {
            string: string[],
            'sv.report.NoterReportConfig': NoterReportConfig[]
        } []
    }[]
}

class NoterReportConfig {
    includeComment :string[] = [];
    includeRadar :string[] = [];
    includeAggregateSuthemes :string[] = [];
    includeBenchmarkToMedianValue :string[] = [];
    noterComments :string[] = [];
    indicators :string[] = [];
    peerGroups :string[] = [];
    comparedTo :string[] = [];
}

class Bspl {
    year: string[] = [];
    accounts: { entry: {string: string, int: string}[] }[];
    previous: Bspl[];
}

class History {
    histo: {
        'sv.entities.History_-Event': {
            date: string[],
            label: string[],
            userEmail: string[],
        }[]
    }[]
}

class Championship {
    string: string[] = [];
    'sv.entities.Championship': {
        comments: Comment[],
        bonuses: Bonuse[],
        values: value[],
        category: Category[],
        code: string[],
        history: History[],
        name: string[],
        country: { $: { reference: string } }[],
    }[] = [];
}

class Country {
    string: string[] = [];
    'sv.entities.Country': {
        comments: Comment[],
        bonuses: Bonuse[],
        values: value[],
        code: string[],
        name: string[],
    }[] = [];
}

class User {
    string: string[] = [];
    'sv.entities.User': {
        email: string[],
        firstName: string[],
        lastName: string[],
        hashedPassword: string[],
        admin: string[],
    }[] = [];
}

class value {
    entry: {
        string: string[],
        'sv.score.indicators.Value': { 
            value0: string,
            value1: string,
            value2: string,
            value3: string,
        }[]
    }[] = []
}

async function parseXml() {
    const createFiles = fse.createWriteStream(`${__dirname}/result.json`, { flags: 'w' /*flags: 'a' preserved old data*/ })


    const file = fse.readFileSync(`${__dirname}/sv.xml`);

    const parser = new Parser();

    const r: string = await parser.parseStringPromise(file);

    createFiles.write(JSON.stringify(r, null, '  '));
}

function writeFile(fileName: string, content: string) {
    fse.createWriteStream(`${__dirname}/${fileName}`, { flags: 'w' }).write(content);
}

function h(e: string[]): string {
    return e ? e[0].replace(/\"/g, '\'').replace(/\n/g, '') : '';
}

function clubChampionShip(e: { $: { reference: string } }[]): string {
    try {
        const o = e[0].$.reference;
        const i = o.replace('../../../../championships/entry[', '')
            .replace(']/sv.entities.Championship', '')
            ;
        return isNaN(+i) ? null : i + 'L';
    } catch (error) {
        return null;
    }
}

function championShipCountry(e: { $: { reference: string } }[]): string {
    try {
        const o = e[0].$.reference;

        const i = o.replace('../../../../countries/entry[', '')
            .replace(']/sv.entities.Country', '')
            ;

        return isNaN(+i) ? null : i + 'L';
    } catch (error) {
        return null;
    }
}

async function parseClub() {

    const file = fse.readFileSync(`${__dirname}/clubs.json`);

    const r = JSON.parse(file as any) as ClubJson[];
    let s = '';

    r.forEach((e, i) => {
        const o = e['sv.entities.Club'][0];
        s += `new Club(${i + 1}L, "${h(o.code)}", "${h(o.name)}", "${h(o.description)}", "", "${h(o.highlight)}", "${h(o.company)}", "${h(o.logoPath)}", ${clubChampionShip(o.championship)}, 1L),\r\n`;
    })

    writeFile(`clusSeed.txt`, s);
}

async function parseCountry() {

    const file = fse.readFileSync(`${__dirname}/countries.json`);

    const r = JSON.parse(file as any) as Country[];
    let s = '';

    r.forEach((e, i) => {
        const o = e['sv.entities.Country'][0];
        s += `new Country(${i + 1}L, "${h(o.code)}", "${h(o.name)}"),\r\n`;
    })

    writeFile(`countrySeed.txt`, s);
}

async function parseChamioship() {

    const file = fse.readFileSync(`${__dirname}/championships.json`);

    const r = JSON.parse(file as any) as Championship[];
    let s = '';

    r.forEach((e, i) => {
        const o = e['sv.entities.Championship'][0];
        s += `new Championship(${i + 1}L, "${h(o.code)}", "${h(o.name)}", ${championShipCountry(o.country)}),\r\n`;
    })

    writeFile(`ChampionshipSeed.txt`, s);
}

async function parseUsers() {

    const file = fse.readFileSync(`${__dirname}/users.json`);

    const r = JSON.parse(file as any) as User[];
    let s = '';

    r.forEach((e, i) => {
        const o = e['sv.entities.User'][0];
        s += `new User(${i + 1}L, "${h(o.firstName)}", "${h(o.lastName)}", "${h(o.email)}","123", true,"${h(o.admin) === "true" ? 'admin' : 'user'}"),\r\n`;
    })

    writeFile(`userSeed.txt`, s);
}


async function main() {
    // parseCountry();
    parseChamioship();
    parseClub();
    // parseUsers();
}
//
main();