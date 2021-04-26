const readXlsxFile = require('read-excel-file/node');
import * as _ from 'lodash';
import * as fse from 'fs-extra';

async function main() {
    const path = `${__dirname}/excel/ot.xlsx`;
    const createFiles = fse.createWriteStream(`${__dirname}/excel/ot.sql`, { flags: 'w' /*flags: 'a' preserved old data*/ })

    let schema = {
        'Id': { prop: 'Id', type: Number, required: false },
        'IdCycle': { prop: 'IdCycle', type: Number, required: false },

        'Recommandation Fr': { prop: 'Nom', type: String, required: false },
        'Recommendations FR': { prop: 'Nom', type: String, required: false },

        'Recommandation Ar': { prop: 'NomAr', type: String, required: false },
        'Recommendations Ar': { prop: 'NomAr', type: String, required: false },

        'N° Recommandation Fr': { prop: 'CodeRecommendation', type: String, required: false },
        'n° Recommendations Fr': { prop: 'CodeRecommendation', type: String, required: false },

        'N° recommandation Ar': { prop: 'CodeRecommendationAr', type: String, required: false },
        'N° Recommendations Ar': { prop: 'CodeRecommendationAr', type: String, required: false },

        'Axe': { prop: 'Axes', type: String, required: false },
        'Sous axe': { prop: 'SousAxes', type: String, required: false },
        'Organe': { prop: 'IdOrgane', type: Number, required: false },
        'Procédure Spéciale': { prop: 'Visite', type: String, required: false },
        "Etat d'avancement": { prop: 'Etat', type: String, required: false },
        'id_pays': { prop: 'IdPays', type: Number, required: false },
        'id_departement': { prop: 'IdOrganisme', type: String, required: false },
        'id_Departement': { prop: 'IdOrganisme', type: String, required: false },
        'id_departemant': { prop: 'IdOrganisme', type: String, required: false },
        'id_dapartement': { prop: 'IdOrganisme', type: String, required: false },
        
    }

    interface IExcel {
        Id: number;
        Nom: string,
        NomAr: string,
        CodeRecommendation: string,
        CodeRecommendationAr: string,
        Mecanisme: string,
        IdCycle: number,
        Axes: string,
        SousAxes: string,
        IdOrganisme: string,
        IdOrgane: number,
        Visite: string,
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
    let mdl: { IdRecommendation: number, IdOrganisme: number }[] = [];


    console.log('>>>>>>>>>>>>>>>>', path)


    try {
        const mecanisme = "Organes de Traités";
        const etat = [
            { abr: 'R', fr: 'Réalisé' },
            { abr: 'ER', fr: 'En cours' },
            { abr: 'NR', fr: 'Non réalisé' },
            { abr: 'RC', fr: 'Recommendation continue' },
        ];

        const sheets: { name: string }[] = await readXlsxFile(path, { getSheets: true });

        let recomLenght = 600;


        for (const sheet of sheets/*.filter((e, i) => i < 2)*/) {
            const list: { rows: IExcel[], errors: any[] } = await readXlsxFile(path, { schema, sheet: sheet.name });

            list.rows.forEach((e, i) => {
                e.Id = recomLenght++;
                e.EtatAvancementChiffre = e.Etat === 'R' ? 100 : e.Etat === 'ER' ? 30 : 0;
                // console.log(e.Id, e.Etat, e.IdCycle)
                e.Etat = etat.find(t => t.abr === e.Etat).fr;

                e.Axes = JSON.stringify([...new Set(typeof e.Axes == 'number' ? [e.Axes] : e.Axes?.split(';').map(n => +n))]);
                e.SousAxes = JSON.stringify([...new Set(typeof e.SousAxes == 'number' ? [e.SousAxes] : e.SousAxes?.split(';').map(n => +n))]);

                e.Axes = `'${e.Axes}'`;
                e.SousAxes = `'${e.SousAxes}'`;

                rcms.push(e)

                // console.log(e )
                //
                if (e.IdOrganisme?.toString().includes(';')) {
                    const l = e.IdOrganisme.split(';');
                    l.forEach(o => {
                        mdl.push({ IdRecommendation: e.Id, IdOrganisme: +o })
                    })
                } else if (e.IdOrganisme){
                    mdl.push({ IdRecommendation: e.Id, IdOrganisme: +e.IdOrganisme })
                }
            })
        }

        console.log(recomLenght)
        console.log(rcms[0])

        createFiles.write('use db_didh2\r\nGO\r\nSET IDENTITY_INSERT Recommendations ON \r\n');

        createFiles.write('INSERT INTO Recommendations (Id,Nom,NomAr,CodeRecommendation,CodeRecommendationAr,Mecanisme,IdCycle,Axes,SousAxes,IdOrgane,IdVisite,IdPays,Etat,EtatAvancement,EtatAvancementChiffre,Observation,Complement,PieceJointe,Annee) values\r\n')

        rcms.forEach((e, i) => {
            // e.IdCycle = 1;
            let s = `(${e.Id}, N'${e.Nom?.replace(/\'/g, '’')}', N'${e.NomAr?.replace(/\'/g, '’')}', N'${e.CodeRecommendation}', N'${e.CodeRecommendationAr}', N'${mecanisme}', ${e.IdCycle}, ${e.Axes}, ${e.SousAxes}, ${e.IdOrgane}, ${e.IdVisite}, ${e.IdPays}, '${e.Etat}', '${e.EtatAvancement}', ${e.EtatAvancementChiffre}, '${e.Observation}', '${e.Complement}', '${e.PieceJointe}', 2020)${(rcms.length - 1 !== i) ? ',' : ';'}\r\n`;
            s = s.replace(/undefined/g, null).replace(/\'null\'/g, "''")
            createFiles.write(s);

        })

        createFiles.write('\r\nSET IDENTITY_INSERT Recommendations OFF\r\nGO\r\n-->>>>>>>>>’>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\n\r\n');


        createFiles.write('INSERT INTO RecomOrgs (IdRecommendation, IdOrganisme, Date) values\r\n\r');

        mdl = _.uniqWith(mdl, _.isEqual);

        mdl.forEach((e, i) => {

            const s = `(${e.IdRecommendation}, ${e.IdOrganisme}, '2020-12-01')${(mdl.length - 1 !== i) ? ',' : ';'}\r\n`;

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