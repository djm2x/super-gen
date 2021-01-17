const readXlsxFile = require('read-excel-file/node');
import * as _ from 'lodash';
import * as fse from 'fs-extra';

let i = 0;

// const all = new ConnectionInit();

// const db = all.dbSqlite3(`D:\\MarIT\\mem\\db\\dev.db`);

// const get = (query: string) => new Promise<any[]>((res, rej) => db.all(query, (e, r) => { res(r); if (e) rej(e) }));


const pc = [
    {id: 9,nameFr: `Groupe de travail sur les disparitions forcées ou involontaires`, nameAr: `لفريق العامل المعني بحالات الاختفاء القسري أو غير الطوعي`},
    {id: 10,nameFr: `Rapporteur spécial sur le droit à l’éducation`, nameAr: `المقرر الخاص المعني بالحق في التعليم`},
    {id: 11,nameFr: `Rapporteuse spéciale sur les droits de l’homme des migrants`, nameAr: `المقرر الخاص المعني بحقوق الإنسان للمهاجرين`},
    {id: 12,nameFr: `Rapporteuse spéciale chargée d'étudier la question de la vente d'enfants, de la prostitution des enfants et de la pornographie impliquant des enfants`, nameAr: `المقرر الخاص المعني بمسألة بيع الأطفال وبغاء الأطفال واستغلال الأطفال في المواد الإباحية`},
];




async function main() {
    let content = '';

    content += '-----------------------------\t\r'
    
    const path = `${__dirname}/ps.xlsx`;
    const createFiles = fse.createWriteStream(`${__dirname}/ps.sql`, { flags: 'w' /*flags: 'a' preserved old data*/ })

    let schema = {
        'Id': { prop: 'Id', type: Number, required: false },
        'IdCycle': { prop: 'IdCycle', type: Number, required: false },
        'Recommandation Fr': { prop: 'Nom', type: String, required: false },
        'Recommandation Ar': { prop: 'NomAr', type: String, required: false },
        'N° Recommandation Fr': { prop: 'CodeRecommendation', type: String, required: false },
        'N° recommandation Ar': { prop: 'CodeRecommendationAr', type: String, required: false },
        'Axe': { prop: 'IdAxe', type: Number, required: false },
        'Sous axe': { prop: 'IdSousAxe', type: Number, required: false },
        'Organe': { prop: 'IdOrgane', type: Number, required: false },
        'Procédure Spéciale': { prop: 'IdVisite', type: String, required: false },
        "Etat d'avancement": { prop: 'Etat', type: String, required: false },
        'id_pays': { prop: 'IdPays', type: Number, required: false },
        'id_departement': { prop: 'IdOrganisme', type: String, required: false },
    }

    interface IExcel {
        Id: number;
        Nom: string,
        NomAr: string,
        CodeRecommendation: string,
        CodeRecommendationAr: string,
        Mecanisme: string,
        IdCycle: number,
        IdAxe: number,
        IdOrganisme: string,
        IdSousAxe: number,
        IdOrgane: number,
        IdVisite: number,
        IdPays: number,
        Etat: string,
        EtatAvancement: string,
        EtatAvancementChiffre: number,
        Observation: string,
        Complement: string,
        PieceJointe: string,
    }
    const rcms: IExcel[] = [];
    const mdl: { IdRecommendation: number, IdOrganisme: number }[] = [];

    // createFiles.write('insert into visites (Id,Mandat,MandatAr,Discours,Date,LienRapport,MiseOeuvrePiece,LienUpload) values');

    // pc.forEach(e => {
    //     let s = `(${e.id}, '${e.nameFr.replace(/\'/g, '"')}', '${e.nameAr.replace(/\'/g, '"')}', '', '2020-12-01', '', '', ''),\r\n`;
    //     createFiles.write(s);
    // })


    console.log('>>>>>>>>>>>>>>>>', path)


    try {
        const sheets: { name: string }[] = await readXlsxFile(path, { getSheets: true });

        // const mecanisme = "Examen périodique universal";
        // const mecanisme = "Organes de Traités";
        const mecanisme = "Procédure spéciale";
        const etat = [
            { abr: 'R', fr: 'Réalisé' },
            { abr: 'ER', fr: 'En cours' },
            { abr: 'NR', fr: 'Non réalisé' }, 
        ];
        let recomLenght = 2500;


        for (const s2 of sheets/*.filter((e, i) => i < 2)*/) {
            const list: { rows: IExcel[], errors: any[] } = await readXlsxFile(path, { schema, sheet: s2.name });

            list.rows.forEach((e, i) => {
                e.Id = recomLenght++;
                e.EtatAvancementChiffre = e.Etat === 'R' ? 100 : e.Etat === 'ER' ? 30 : 0;
                // console.log(e.Id, e.Etat, e.IdCycle)
                e.Etat = etat.find(t => t.abr === e.Etat).fr;
                rcms.push(e)

                // console.log(e )
                //
                if (e.IdOrganisme.toString().includes(';')) {
                    const l = e.IdOrganisme.split(';');
                    l.forEach(o => {
                        mdl.push({ IdRecommendation: e.Id, IdOrganisme: +o })
                    })
                } else {
                    mdl.push({ IdRecommendation: e.Id, IdOrganisme: +e.IdOrganisme })
                }
            })
        }

        console.log(recomLenght)
        console.log(rcms[0])

        createFiles.write('INSERT INTO Recommendations (Id,Nom,NomAr,CodeRecommendation,CodeRecommendationAr,Mecanisme,IdCycle,IdAxe,IdSousAxe,IdOrgane,IdVisite,IdPays,Etat,EtatAvancement,EtatAvancementChiffre,Observation,Complement,PieceJointe,Annee) values\r\n')

        rcms.forEach(e => {
            let s = `(${e.Id}, '${e.Nom?.replace(/\'/g, '’')}', '${e.NomAr?.replace(/\'/g, '’')}', '${e.CodeRecommendation}', '${e.CodeRecommendationAr}', '${mecanisme}', ${e.IdCycle}, ${e.IdAxe}, ${e.IdSousAxe}, ${e.IdOrgane}, ${e.IdVisite}, ${e.IdPays}, '${e.Etat}', '${e.EtatAvancement}', ${e.EtatAvancementChiffre}, '${e.Observation}', '${e.Complement}', '${e.PieceJointe}', 2020),\r\n`;
            s = s.replace(/undefined/g, null).replace(/\'null\'/g, "''")
            createFiles.write(s);

        })

        createFiles.write('\r\n\r\n-->>>>>>>>>’>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\n\r\n');


        createFiles.write('INSERT INTO RecomOrg (IdRecommendation, IdOrganisme, Date) values\r\n\r');
        mdl.forEach(e => {

            const s = `(${e.IdRecommendation}, ${e.IdOrganisme}, '2020-12-01'),\r\n`;

            createFiles.write(s);
        })

        console.log('done');

    } catch (er) {
        const e: Error = er;
        console.error(e.name)
        console.error(e.message)
        console.error(e.stack)
    }
}
//
main();