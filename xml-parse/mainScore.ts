import * as _ from 'lodash';
import * as fse from 'fs-extra';
import { Parser } from 'xml2js';

class Score {
    'sv.score.NoterGroup': {
        name: string[], // 1
        subNoters: {
            entry: {
                'sv.score.NoterGroup': {
                    name: string[], // 2
                    subNoters: {
                        entry: {
                            'sv.score.NoterGroup': {
                                name: string[], // 3
                                subNoters: {
                                    entry: {
                                        'sv.score.indicators.Indicator': Indicator[]
                                    }[]
                                }[]
                            }[]
                        }[]
                    }[]
                }[]
            }[]
        }[]
    }[] = []
}

class Indicator{
    name: string[]; // indicator
    scorableClass: string[];
    weight: string[];
    wa: string[];
    normalizer: RangeNormalizer[] | MapNormalizer[] | FunctionNormalizer[];
}

class RangeNormalizer {
    '$': { class: string };
    r0: string[] = [];
    r1: string[] = [];
    r2: string[] = [];
    r3: string[] = [];
    r4: string[] = [];
}

class MapNormalizer {
    '$': { class: string };
    map: {
        entry: {
            string: string[],
            double: string[],
        }[],
    }[]
}

class FunctionNormalizer {
    '$': { class: string };
    function: string[];
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

async function parseScore() {

    const file = fse.readFileSync(`${__dirname}/clubs.json`);

    const r = JSON.parse(file as any) as Score[];
    let scoreString = '';
    let indicatorString = '';
    let rangeNormalizerString = '';
    let mapNormalizerString = '';
    let functionNormalizerString = '';

    // ids
    let scoreId = 0;
    let indicatorId = 0;
    let rangeNormalizerId = 0;
    let mapNormalizerId = 0;
    let functionNormalizerId = 0;

    r.forEach((e, i) => {
        const o = e['sv.entities.Club'][0];
        const clubId = i + 1;
        scoreString += `new Club(${clubId}L, "${h(o.code)}", "${h(o.name)}", "${h(o.description)}", "", "${h(o.highlight)}", "${h(o.company)}", "logos/${h(o.logoPath)}", ${clubChampionShip(o.championship)}, 1L),\r\n`;

        o.reportConfig.forEach((r, j) => {
            reportConfigId = j + 1 + i;
            rangeNormalizerString += `new ReportConfig(${reportConfigId}L, ${h(r.includeRadar)}, ${h(r.includeClubComment)}, ${h(r.includeClubHighlight)}, ${h(r.includeWageAndRevenue)}, ${h(r.includeLossAndRevenue)}, ${h(r.includeOffBalance)}, ${h(r.includeBSPLSummary)}, ${h(r.includeBSPLDetail)}, ${h(r.includeBSPLHistory)}, ${clubId}L),\r\n`


            // const NoterReportConfig0: NoterReportConfig[] = [].concat(...r.themeConfigs.map(e => e.entry.map(x => x['sv.report.NoterReportConfig'])));
            const NoterReportConfig = r.themeConfigs[0]?.entry?.map(x => x['sv.report.NoterReportConfig'][0]);

            NoterReportConfig?.forEach((t, k) => {
                NoterReportConfigId = k + 1;

                mapNormalizerString += `new NoterReportGroup(${NoterReportConfigId}L, ${h(t.includeComment)}, ${h(t.includeRadar)}, false, ${h(t.includeBenchmarkToMedianValue)}, "${h(t.peerGroups)}", "${h(t.comparedTo)}", "${h(t.noterComments)}", "club", "${h(t.indicators)}", ${reportConfigId}L),\r\n`
            });
        });

        o.comments.map(c => c.entry ? c.entry[0] : [] as any).forEach((c, ci) => {
            commentId = ci + clubId;
            functionNormalizerString += `new Comment(${commentId}L, "${h([c.string ? c.string[1] : []])}", "club", ${clubId}L, null),\r\n`
        });

        o.bonuses[0].entry?.forEach((c, ci) => {
            //  bonusId = ci + clubId;
            const ob = c['sv.score.indicators.Bonus'][0]
            indicatorString += `new Bonus(${++bonusId}L, ${h(ob?.bonus)}f, "${h(ob?.comment)}", "${h(c.string)}", ${clubId}L),\r\n`
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

    writeFile(`clubsString.txt`, scoreString);
    writeFile(`reportConfigString.txt`, rangeNormalizerString);
    writeFile(`NoterReportConfigString.txt`, mapNormalizerString);
    writeFile(`commentString.txt`, functionNormalizerString);
    writeFile(`clubIndicatorString.txt`, clubIndicatorString);
    writeFile(`bsplString.txt`, bsplString);
    writeFile(`accountValueString.sql`, accountValueString);
    writeFile(`IndicatorString.txt`, IndicatorString);
    writeFile(`bonusString.txt`, indicatorString);
}


async function main() {
    parseScore();
}
//
main();