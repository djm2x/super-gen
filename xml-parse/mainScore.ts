import * as _ from 'lodash';
import * as fse from 'fs-extra';
import { Parser } from 'xml2js';

class NoterGroup {
    'sv.score.NoterGroup': {
        name: string[], // 1
        weight: string[],
        subNoters: {
            entry: {
                'sv.score.NoterGroup': {
                    name: string[], // 2
                    weight: string[],
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

class Indicator {
    name: string[]; // indicator
    scorableClass: string[];
    weight: string[];
    hint: string[];
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
    fse.createWriteStream(`${__dirname}/seedScore/${fileName}`, { flags: 'w' }).write(content);
}

function h(e: string[]): string {
    try {
        return e ? e[0]?.replace(/\"/g, '\'').replace(/\n/g, '') : null;
    } catch (error) {
        return null;
    }
}

async function parseScore() {

    const file = fse.readFileSync(`${__dirname}/scores.json`);

    const r = JSON.parse(file as any) as NoterGroup[];
    let noterGroupString = 'use crs\r\nGO\r\nSET IDENTITY_INSERT noter_groups ON\r\nINSERT INTO noter_groups (id, id_parent ,level ,name ,weight) VALUES\r\n';
    let indicatorString = 'use crs\r\nGO\r\nSET IDENTITY_INSERT indicators ON\r\nINSERT INTO indicators (id, hint ,id_noter_group ,name ,source_type ,type ,wa ,weight, normalizer) VALUES\r\n';
    let rangeNormalizerString = 'use crs\r\nGO\r\nSET IDENTITY_INSERT range_normalizers ON\r\nINSERT INTO range_normalizers (id, r0 ,r1 ,r2 ,r3 ,r4 ,id_indicator) VALUES\r\n';
    let mapNormalizerString = 'use crs\r\nGO\r\nSET IDENTITY_INSERT map_normalizers ON\r\nINSERT INTO map_normalizers (id, _key ,value ,id_indicator) VALUES\r\n';
    let functionNormalizerString = 'use crs\r\nGO\r\nSET IDENTITY_INSERT function_normalizers ON\r\nINSERT INTO function_normalizers (id, _function ,id_indicator) VALUES\r\n';

    // ids
    let noterGroupId = 0;
    // let noterGroupId2 = 0;
    // let noterGroupId3 = 0;
    let indicatorId = 0;
    let rangeNormalizerId = 0;
    let mapNormalizerId = 0;
    let functionNormalizerId = 0;

    r.map(e => e['sv.score.NoterGroup'][0]).forEach((ng1, i) => {
        // noterGroupId3 = 0;
        // noterGroupId = noterGroupId2 !== 0 ? noterGroupId2 + 1 + 1 : 1 + i
        const parentId1 = noterGroupId + 1
        noterGroupString += `(${++noterGroupId}, NULL, 1, '${h(ng1.name)?.replace("'", "`")}', ${h(ng1.weight)}),\r\n`;

        // multi level 2
        ng1.subNoters[0].entry.map(e => e['sv.score.NoterGroup'][0]).forEach((ng2, j) => {
            const parentId2 = noterGroupId + 1
            noterGroupString += `(${++noterGroupId}, ${parentId1}, 2, '${h(ng2.name)?.replace("'", "`")}', ${h(ng2.weight)}),\r\n`;

            ng2.subNoters[0].entry.map(e => e['sv.score.NoterGroup'][0]).forEach((ng3, k) => {
                const parentId3 = noterGroupId + 1
                noterGroupString += `(${++noterGroupId}, ${parentId2}, 3, '${h(ng3.name)?.replace("'", "`")}', NULL),\r\n`;

                ng3.subNoters[0].entry.map(e => e['sv.score.indicators.Indicator'][0]).forEach((ind, j) => {

                    const st = ind.normalizer[0].$.class;
                    const source_type = st.includes('RangeNormalizer') ? 'RangeNormalizer' : (st.includes('MapNormalizer') ? 'MapNormalizer' : 'FunctionNormalizer');

                    const type = h(ind.scorableClass).substring(h(ind.scorableClass).lastIndexOf('.') + 1);

                    
                    let normalizer: RangeNormalizer | MapNormalizer | FunctionNormalizer = {} as any;
                    if (source_type === 'RangeNormalizer') {
                        const n = ind.normalizer[0] as RangeNormalizer;
                        normalizer = n;
                        delete normalizer.$;

                        (normalizer as any).r0 = normalizer?.r0?.length > 0 ? normalizer?.r0[0] : '';
                        (normalizer as any).r1 = normalizer?.r1?.length > 0 ? normalizer?.r1[0] : '';
                        (normalizer as any).r2 = normalizer?.r2?.length > 0 ? normalizer?.r2[0] : '';
                        (normalizer as any).r3 = normalizer?.r3?.length > 0 ? normalizer?.r3[0] : '';
                        (normalizer as any).r4 = normalizer?.r4?.length > 0 ? normalizer?.r4[0] : '';

                        rangeNormalizerString += `(${++rangeNormalizerId}, ${h(n.r0)}, ${h(n.r1)}, ${h(n.r2)}, ${h(n.r3)}, ${h(n.r4)}, ${indicatorId}),\r\n`
                    } else if (source_type === 'MapNormalizer') {
                        const n = ind.normalizer[0] as MapNormalizer;

                        // normalizer = n;
                        // delete normalizer.$;

                        (normalizer as any).mapValue = '';
                        
                        n.map[0].entry.forEach((m, mi) => {
                            (normalizer as any).mapValue += `${h(m.string)}:${h(m.double)}${n.map[0].entry.length > (mi + 1) ? ',' : ''}`;
                            mapNormalizerString += `(${++mapNormalizerId}, '${h(m.string)}', ${h(m.double)}, ${indicatorId}),\r\n`;
                        })

                    } else {
                        const n = ind.normalizer[0] as FunctionNormalizer;

                        // normalizer = n;
                        // delete normalizer.$;

                        (normalizer as any).functionValue = h(n.function);
                        
                        functionNormalizerString += `(${++functionNormalizerId}, '${h(n.function)}', ${indicatorId}),\r\n`
                    }


                    indicatorString += `(${++indicatorId}, ${h(ind.hint) === null ?  'NULL' : "'" + h(ind.hint) + "'" }, ${parentId3}, '${h(ind.name)?.replace("'", "`")}','${source_type}', '${type}', ${h(ind.wa) === 'true' ? 1 : 0}, ${ind.weight}, '${JSON.stringify(normalizer)}'),\r\n`;
                });
            });
        });

    });

    noterGroupString += `\r\nSET IDENTITY_INSERT noter_groups OFF\r\nGO`;
    indicatorString += `\r\nSET IDENTITY_INSERT indicators OFF\r\nGO`;
    rangeNormalizerString += `\r\nSET IDENTITY_INSERT range_normalizers OFF\r\nGO`;
    mapNormalizerString += `\r\nSET IDENTITY_INSERT map_normalizers OFF\r\nGO`;
    functionNormalizerString += `\r\nSET IDENTITY_INSERT function_normalizers OFF\r\nGO`;

    writeFile(`1.noterGroupString.sql`, noterGroupString);
    writeFile(`2.indicatorString.sql`, indicatorString);
    writeFile(`3.rangeNormalizerString.sql`, rangeNormalizerString);
    writeFile(`4.mapNormalizerString.sql`, mapNormalizerString);
    writeFile(`5.functionNormalizerString.sql`, functionNormalizerString);
}


async function main() {
    parseScore();
}
//
main();