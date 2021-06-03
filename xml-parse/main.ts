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
        bspls: {
            'sv.accounting.Bspl': Bspl[]
        }[],
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
    '$': { class: string, reference: string }
}

class Bonuse {
    entry: {
        string: string[],
        'sv.score.indicators.Bonus': {
            bonus: string[],
            comment: string[],
        }[]
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
        }[]
    }[]
}

class NoterReportConfig {
    includeComment: string[] = [];
    includeRadar: string[] = [];
    includeAggregateSuthemes: string[] = [];
    includeBenchmarkToMedianValue: string[] = [];
    noterComments: string[] = [];
    indicators: string[] = [];
    peerGroups: string[] = [];
    comparedTo: string[] = [];
}

class Bspl {
    year: string[];
    accounts: { entry: { string: string, int: string }[] }[];
    previous: Bspl[];
    currency: string[];
    xRate: string[];
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
    fse.createWriteStream(`${__dirname}/seeds/${fileName}`, { flags: 'w' }).write(content);
}

function h(e: string[]): string {
    try {
        return e ? e[0]?.replace(/\"/g, '\'').replace(/\n/g, '') : null;
    } catch (error) {
        return null;
    }
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
    let clubsString = '';
    let bonusString = '';
    let reportConfigString = '';
    let NoterReportConfigString = '';
    let commentString = '';
    let clubIndicatorString = '';
    let IndicatorString = '';
    let bsplString = '';
    let accountValueString = '';

    // ids
    let bonusId = 0;
    let clubIndicatorId = 0;
    let IndicatorId = 0;
    let bsplId = 0;
    let accountValueId = 0;
    let reportConfigId = 0;
    let commentId = 0;
    let NoterReportConfigId = 0;
    r.forEach((e, i) => {
        const o = e['sv.entities.Club'][0];
        const clubId = i + 1;
        clubsString += `new Club(${clubId}L, "${h(o.code)}", "${h(o.name)}", "${h(o.description)}", "", "${h(o.highlight)}", "${h(o.company)}", "logos/${h(o.logoPath)}", ${clubChampionShip(o.championship)}, 1L),\r\n`;

        o.reportConfig.forEach((r, j) => {
            reportConfigId = j + 1 + i;
            reportConfigString += `new ReportConfig(${reportConfigId}L, ${h(r.includeRadar)}, ${h(r.includeClubComment)}, ${h(r.includeClubHighlight)}, ${h(r.includeWageAndRevenue)}, ${h(r.includeLossAndRevenue)}, ${h(r.includeOffBalance)}, ${h(r.includeBSPLSummary)}, ${h(r.includeBSPLDetail)}, ${h(r.includeBSPLHistory)}, ${clubId}L),\r\n`


            // const NoterReportConfig0: NoterReportConfig[] = [].concat(...r.themeConfigs.map(e => e.entry.map(x => x['sv.report.NoterReportConfig'])));
            const NoterReportConfig = r.themeConfigs[0]?.entry?.map(x => x['sv.report.NoterReportConfig'][0]);

            NoterReportConfig?.forEach((t, k) => {
                NoterReportConfigId = k + 1;

                NoterReportConfigString += `new NoterReportGroup(${NoterReportConfigId}L, ${h(t.includeComment)}, ${h(t.includeRadar)}, false, ${h(t.includeBenchmarkToMedianValue)}, "${h(t.peerGroups)}", "${h(t.comparedTo)}", "${h(t.noterComments)}", "club", "${h(t.indicators)}", ${reportConfigId}L),\r\n`
            });
        });

        o.comments.map(c => c.entry ? c.entry[0] : [] as any).forEach((c, ci) => {
            commentId = ci + clubId;
            commentString += `new Comment(${commentId}L, "${h([c.string ? c.string[1] : []])}", "club", ${clubId}L, null),\r\n`
        });

        o.bonuses[0].entry?.forEach((c, ci) => {
            //  bonusId = ci + clubId;
            const ob = c['sv.score.indicators.Bonus'][0]
            bonusString += `new Bonus(${++bonusId}L, ${h(ob?.bonus)}f, "${h(ob?.comment)}", "${h(c.string)}", ${clubId}L),\r\n`
        });


        o.values.map(c => c.entry ? c.entry[0] : [] as any).forEach((c, ci) => {
            IndicatorId = ci + clubId;
            IndicatorString += `new Indicator(${IndicatorId}L, "${h(c.string)}", 4L, "${h(c.string)}", false, null, "club", null),\r\n`;

            c['sv.score.indicators.Value']?.forEach((cl, cli) => {
                clubIndicatorId = cli + clubId;

                clubIndicatorString += `new ClubIndicator(${clubIndicatorId}L, 0L, null, null, "${cl.value0 || '0'}", "${cl.value1 || '0'}", "${cl.value2 || '0'}", "${cl.value3 || '0'}", ${clubId}L, ${IndicatorId}L),\r\n`;
            })
        });

        let bspls: Bspl[] = [];

        try {
            bspls = o.bspls[0]['sv.accounting.Bspl']
        } catch { }

        // bsplId = clubId;


        (function fn(bs: Bspl[]) {
            const b = bs ? bs[0] : null;

            if (!b) {
                return;
            }


            bsplString += `new Bspl(${++bsplId}L, "", "", "", "", false, false, ${b.xRate}f, "${b.currency}", ${bsplId > 1 ? bsplId - 1 + 'L' : null}),\r\n`;

            b.accounts[0].entry?.forEach((ac, acIndex) => {
                accountValueId += 1;
                accountValueString += `INSERT INTO account_values (value, year , id_club, id_bspl) values ('${ac.int}', ${h(b.year)}, ${clubId}, ${bsplId});\r\n`;
            })


            if (b) {
                fn(b.previous);
            }
        })(bspls);



    });

    writeFile(`clubsString.txt`, clubsString);
    //     writeFile(`reportConfigString.txt`, reportConfigString);
    //     writeFile(`NoterReportConfigString.txt`, NoterReportConfigString);
    //     writeFile(`commentString.txt`, commentString);
    //     writeFile(`clubIndicatorString.txt`, clubIndicatorString);
    //     writeFile(`bsplString.txt`, bsplString);
    //     writeFile(`accountValueString.sql`, accountValueString);
    //     writeFile(`IndicatorString.txt`, IndicatorString);
    //     writeFile(`bonusString.txt`, bonusString);
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
    // parseChamioship();
    parseClub();
    // parseUsers();
}
//
main();