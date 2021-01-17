const readXlsxFile = require('read-excel-file/node');
import * as _ from 'lodash';
import * as fse from 'fs-extra';
import * as moment from 'moment';
import { ConnectionInit } from '../database-scripte/connection';

let i = 0;

// const all = new ConnectionInit();

// const db = all.dbSqlite3(`D:\\MarIT\\mem\\db\\dev.db`);


// const get = (query: string) => new Promise<any[]>((res, rej) => db.all(query, (e, r) => { res(r); if (e) rej(e) }))

async function main() {
    let content = '';

    const Visites = [
        { Id: 1, Visite: 'la Rapporteuse spéciale sur le droit à l’alimentation' },
        { Id: 2, Visite: 'Rapporteuse spéciale sur les formes contemporaines de racisme, de discrimination raciale, de xénophobie et de l’intolérance qui y est associée' },
        { Id: 3, Visite: 'Rapporteur spécial sur la torture et autres peines ou traitements cruels, inhumains ou dégradants' },
        { Id: 4, Visite: 'la Rapporteuse spéciale sur la traite des êtres humains, en particulier les femmes et les enfants' },
        { Id: 5, Visite: 'Rapporteuse spéciale sur les formes contemporaines de racisme, de discrimination raciale, de xénophobie et de l’intolérance qui y est associée' },
        { Id: 6, Visite: 'GT Disc femme 2012' },
        { Id: 7, Visite: 'Recommandations du Groupe de travail sur la détention arbitraire' },
        { Id: 8, Visite: 'l’experte indépendante dans le domaine des droits culturels' },
        { Id: 9, Visite: 'EI solidarité inle' },
        // { Id: 10, Visite: 'EI solidarité inle 2017' },
        // { Id: 11, Visite: 'EI solidarité inle 2018' },
        // { Id: 12, Visite: 'EI solidarité inle 2021' },
        // { Id: 13, Visite: 'EI solidarité inle 2022' },
        // { Id: 14, Visite: 'EI solidarité inle 2023' },
        // { Id: 15, Visite: 'EI solidarité inle 2024' },
        // { Id: 16, Visite: 'EI solidarité inle 2025' }
    ]

    content += '-----------------------------\t\r'

    const path = `${__dirname}/param.xlsx`;

    let schema0 = {
        'Id': { prop: 'Id', type: Number, required: false },
        // 'IdAxe': { prop: 'IdAxe', type: Number, required: false },
        'Nom': { prop: 'Nom', type: String, required: false },
        'NomAr': { prop: 'NomAr', type: String, required: false },
        'CodeRecommendation': { prop: 'CodeRecommendation', type: String, required: false },
        'CodeRecommendationAr': { prop: 'CodeRecommendationAr', type: String, required: false },
        'Mecanisme': { prop: 'Mecanisme', type: String, required: false },
        'IdCycle': { prop: 'IdCycle', type: Number, required: false },
        'IdAxe': { prop: 'IdAxe', type: Number, required: false },
        'IdSousAxe': { prop: 'IdSousAxe', type: Number, required: false },
        'IdOrgane': { prop: 'IdOrgane', type: Number, required: false },
        'IdVisite': { prop: 'IdVisite', type: Number, required: false },
        'IdPays': { prop: 'IdPays', type: Number, required: false },
        'Etat': { prop: 'Etat', type: String, required: false },
        'EtatAvancement': { prop: 'EtatAvancement', type: String, required: false },
        'EtatAvancementChiffre': { prop: 'EtatAvancementChiffre', type: String, required: false },
        'Observation': { prop: 'Observation', type: String, required: false },
        'Complement': { prop: 'Complement', type: String, required: false },
        'PieceJointe': { prop: 'PieceJointe', type: String, required: false },
        'IdOrganisme': { prop: 'IdOrganisme', type: Number, required: false },
    }

    let schema = {
        'Id': { prop: 'Id', type: Number, required: false },
        // 'IdAxe': { prop: 'IdAxe', type: Number, required: false },
        'Recommandation Fr': { prop: 'Nom', type: String, required: false },
        'Recommandation Ar': { prop: 'NomAr', type: String, required: false },
        'N° Recommandation Fr': { prop: 'CodeRecommendation', type: String, required: false },
        'N° recommandation Ar': { prop: 'CodeRecommendationAr', type: String, required: false },
        'Axe': { prop: 'IdAxe', type: Number, required: false },
        'Sous axe': { prop: 'IdSousAxe', type: Number, required: false },
        'Organe': { prop: 'IdOrgane', type: Number, required: false },
        'Visite': { prop: 'IdVisite', type: String, required: false },
        'IdPays': { prop: 'IdPays', type: Number, required: false },
        'IdOrganisme': { prop: 'IdOrganisme', type: Number, required: false },
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
        IdOrganisme: number,
        IdSousAxe: number,
        IdOrgane: number,
        IdVisite: number,
        IdPays: number,
        Etat: string,
        EtatAvancement: string,
        EtatAvancementChiffre: string,
        Observation: string,
        Complement: string,
        PieceJointe: string,
    }


    // const lieux: string[] = [];
    const substances = [];
    const l: IExcel[] = [];
    const createFiles = fse.createWriteStream(`${__dirname}/text.txt`, { flags: 'w' /*flags: 'a' preserved old data*/ })

    const sheets: { name: string }[] = await readXlsxFile(`${__dirname}/organe.xlsx`, { getSheets: true });

    // const list: { rows: IExcel[], errors: any[] } = await readXlsxFile(`${__dirname}/epu.xlsx`, { schema, sheet: 8 });

    // list.rows.forEach((e, i) => {
    //     l.push(e)
    //     // const s2 = `new RecomOrg { IdRecommendation = ${i + 1}, IdOrganisme = "${e.IdOrganisme}", Date = DateTime.Now },\r\n`;
    // });

    // console.log(l.map(e => e.IdVisite))

    const mecanisme = "Organes de traités";
    const etat = "Non réalisé";
    let recomLenght = 0;
    for (const s2 of sheets/*.filter((e, i) => i < 2)*/) {
        const list: { rows: IExcel[], errors: any[] } = await readXlsxFile(`${__dirname}/organe.xlsx`, { schema, sheet: s2.name });

        list.rows.forEach((e, i) => {
            // const v = Visites.find(v => e.IdVisite ? e.IdVisite.toString().includes(v.Visite) : false)
            // e.IdVisite = v ? v.Id : null;
            // e.Id = i + 1;

            // e.IdCycle = 1;
            l.push(e)

            recomLenght++
        })
    }

    console.log(recomLenght)

    // const recUniq: IExcel[] = _.uniqBy(l, e => e.Nom);

    // // console.log(lU[0])
    // const ll: { IdRecommendation: number, IdOrganisme: number }[] = []
    // recUniq.forEach((e, i) => {

    //     // console.log(e.IdVisite)

    //     // const idVisite = Visites.find(v => e.IdVisite.includes(v.Visite)).Id;

    //     // let s = `new Recommendation {Id = ${i + 1}, Nom = "${e.Nom}", NomAr = "${e.NomAr}", CodeRecommendation = "${e.CodeRecommendation}", CodeRecommendationAr = "${e.CodeRecommendationAr}", Mecanisme = "${mecanisme}", IdCycle = 1, IdAxe = ${e.IdAxe}, IdSousAxe = ${e.IdSousAxe}, IdOrgane = ${e.IdOrgane}, IdVisite = ${e.IdVisite}, IdPays = ${e.IdPays}, Etat = "${etat}", EtatAvancement = "", EtatAvancementChiffre = 0, Observation = "", Complement = "", PieceJointe = "" },\r\n`;
    //     // s = s.replace(/undefined/g, null)
    //     // createFiles.write(s);

    //     ll.push({ IdRecommendation: i + 1, IdOrganisme: e.IdOrganisme })

    // });
    // const list: { rows: IExcel[], errors: any[] } = await readXlsxFile(`${__dirname}/param.xlsx`, { schema, sheet: 1 });

    createFiles.write('-----------------------------\r\n');
    // list.rows.forEach(async (e, i) => {
    //     // const s = `new Axe {Id = ${e.Id}, Label = "${e.Label}", LabelAr = "${e.LabelAr}" },\r\n`
    //     // const s = `new SousAxe {Id = ${e.Id}, Label = "${e.Label}", LabelAr = "${e.LabelAr}", IdAxe = ${e.IdAxe} },\r\n`
    //     // const s = `new Organe {Id = ${e.Id}, Label = "${e.Label}", LabelAr = "${e.LabelAr}" },\r\n`
    //     // const s = `new Organisme {Id = ${e.Id}, Label = "${e.Label}", LabelAr = "${e.LabelAr}", Adresse = "", Tel = "" },\r\n`
    //     const s = `new Pays {Id = ${e.Id}, Nom = "${e.Nom}", NomAr = "${e.NomAr}" },\r\n`
    //     createFiles.write(s);
    // });

    // Visites.map((e, i) => {

    //     const s = `new Visite {Id = ${e.Id}, Mandat = "${e.Visite}", MandatAr = "", Discours = "" , Date = "", LienRapport = "", MiseOeuvrePiece = "", LienUpload = "" },\r\n`;
    //     createFiles.write(s);
    // })

    
    // console.log(l)
    
    var result = _(l)
    .groupBy(x => x.Nom)
    .map((value, key) =>
    ({
        nom: key,
        recoms: {
            rc: value,
            or: value.map(e => e.IdOrganisme)
        },
    })
    )
    .value()
    ;
    
    // console.log(l)
    // console.log(result)
    const rd: IExcel[] = []
    result.forEach((rr, i) => {

        rr.recoms.rc.forEach(e => {
            e.Id = i + 1 + 478

            rd.push(e)
        })
        
       
    })

    _.uniqBy(rd, e => e.Id).forEach(e => {
        let s = `new Recommendation {Id = ${e.Id}, Nom = @"${e.Nom?.replace(/"/g, "'")}", NomAr = @"${e.NomAr?.replace(/"/g, "'")}", CodeRecommendation = "${e.CodeRecommendation}", CodeRecommendationAr = "${e.CodeRecommendationAr}", Mecanisme = "${mecanisme}", IdCycle = null, IdAxe = ${e.IdAxe}, IdSousAxe = ${e.IdSousAxe}, IdOrgane = ${e.IdOrgane}, IdVisite = ${e.IdVisite}, IdPays = ${e.IdPays}, Etat = "${etat}", EtatAvancement = "", EtatAvancementChiffre = 0, Observation = "", Complement = "", PieceJointe = "" },\r\n`;
        s = s.replace(/undefined/g, null)
        createFiles.write(s);

    })

    createFiles.write('\r\n\r\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\n\r\n');
    result.forEach((rr, i) => {
        rr.recoms.or.forEach(e => {

            const s = `new RecomOrg { IdRecommendation = ${i + 1 + 478}, IdOrganisme = ${e}, Date = DateTime.Now },\r\n`;

            createFiles.write(s);
        })
    })


    console.log('done');

}

//
main();