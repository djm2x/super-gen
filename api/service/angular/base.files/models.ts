
export class Region {
    id = 0;
    nom = '';
    isAMA = false;
    regionUtilisateurs: Utilisateur[] = [];
    regionProvinces: Province[] = [];
    regionFabriques: Fabrique[] = [];
    regionRealisationProjetPetroliers: RealisationProjetPetrolier[] = [];
    regionEtatStationServices: EtatStationService[] = [];
    regionStockPPLs: StockPPL[] = [];
    regionImportationPPLs: ImportationPPL[] = [];
    regionStockGPLs: StockGPL[] = [];
    regionRaccordementsAutresGazoducs: RaccordementsAutresGazoduc[] = [];
    regionIncidentSurvenusSurGmes: IncidentSurvenusSurGme[] = [];
    regionTraverseesGmeOuvragePublics: TraverseesGmeOuvragePublic[] = [];
    regionPrixCarburantStations: PrixCarburantStation[] = [];
    regionConsommationGPLs: ConsommationGPL[] = [];
    regionImportationGPLs: ImportationGPL[] = [];
    regionAuditsEnergetiquesObligatoires: AuditsEnergetiquesObligatoire[] = [];
    regionSecteurEntreprisesServicesEnergetiques: EntreprisesServicesEnergetique[] = [];
    regionProjetEnrs: ProjetEnr[] = [];
    regionProjetsEEs: ProjetsEE[] = [];
    regionAuditsEnergetiquesObligatoireRealises: AuditsEnergetiquesObligatoireRealise[] = [];
    regionActiviteCentreEmplisseurs: ActiviteCentreEmplisseur[] = [];
    regionSyntheseRegionals: SyntheseRegional[] = [];
    regionEtatTitresMiniers: EtatTitresMinier[] = [];
    regionDecisionsAccordees: DecisionsAccordee[] = [];
    regionProductionMinieres: ProductionMiniere[] = [];
    regionCommercialisationMiniereLocals: CommercialisationMiniereLocal[] = [];
    regionCommercialisationMiniereExports: CommercialisationMiniereExport[] = [];
    regionProjetMiniers: ProjetMinier[] = [];
    regionInvestissementProjetMiniers: InvestissementProjetMinier[] = [];
    regionEffectifsProjetMiniers: EffectifsProjetMinier[] = [];
    regionSiteMiniers: SiteMinier[] = [];
    regionAccidentTravailProjetMiniers: AccidentTravailProjetMinier[] = [];
    regionMaladiesProfessionnelles: MaladiesProfessionnelle[] = [];
    regionProductionVentes: ProductionVente[] = [];
    regionPrincipauxClients: PrincipauxClient[] = [];
    regionEmploiSecteurs: EmploiSecteur[] = [];
    regionSuiviAutorisations: SuiviAutorisation[] = [];
    regionSuiviChantiers: SuiviChantier[] = [];
    regionIndicateurSuivres: IndicateurSuivre[] = [];
    regionAccidentTravailAmas: AccidentTravailAma[] = [];
    regionClimatSocials: ClimatSocial[] = [];
  }
  
  export class Province {
    id = 0;
    nom = '';
    idRegion = 0;
    region = new Region();
    provinceCommunes: Commune[] = [];
    provinceRealisationProjetPetroliers: RealisationProjetPetrolier[] = [];
    provinceEtatStationServices: EtatStationService[] = [];
    provinceStockPPLs: StockPPL[] = [];
    provinceImportationPPLs: ImportationPPL[] = [];
    provinceStockGPLs: StockGPL[] = [];
    provinceRaccordementsAutresGazoducs: RaccordementsAutresGazoduc[] = [];
    provinceIncidentSurvenusSurGmes: IncidentSurvenusSurGme[] = [];
    provinceTraverseesGmeOuvragePublics: TraverseesGmeOuvragePublic[] = [];
    provincePrixCarburantStations: PrixCarburantStation[] = [];
    provinceConsommationGPLs: ConsommationGPL[] = [];
    provinceImportationGPLs: ImportationGPL[] = [];
    provinceAuditsEnergetiquesObligatoires: AuditsEnergetiquesObligatoire[] = [];
    provinceSecteurEntreprisesServicesEnergetiques: EntreprisesServicesEnergetique[] = [];
    provinceProjetEnrs: ProjetEnr[] = [];
    provinceProjetsEEs: ProjetsEE[] = [];
    provinceAuditsEnergetiquesObligatoireRealises: AuditsEnergetiquesObligatoireRealise[] = [];
    provinceActiviteCentreEmplisseurs: ActiviteCentreEmplisseur[] = [];
    provinceEtatTitresMiniers: EtatTitresMinier[] = [];
    provinceDecisionsAccordees: DecisionsAccordee[] = [];
    provinceProductionMiniere: ProductionMiniere[] = [];
    provinceCommercialisationMiniereLocals: CommercialisationMiniereLocal[] = [];
    provinceCommercialisationMiniereExports: CommercialisationMiniereExport[] = [];
    provinceProjetMiniers: ProjetMinier[] = [];
    provinceInvestissementProjetMiniers: InvestissementProjetMinier[] = [];
    provinceEffectifsProjetMiniers: EffectifsProjetMinier[] = [];
    provinceSiteMiniers: SiteMinier[] = [];
    provinceAccidentTravailProjetMiniers: AccidentTravailProjetMinier[] = [];
    provinceMaladiesProfessionnelles: MaladiesProfessionnelle[] = [];
    provinceProductionVentes: ProductionVente[] = [];
    provincePrincipauxClients: PrincipauxClient[] = [];
    provinceEmploiSecteurs: EmploiSecteur[] = [];
    provinceSuiviAutorisations: SuiviAutorisation[] = [];
    provinceSuiviChantiers: SuiviChantier[] = [];
    provinceIndicateurSuivres: IndicateurSuivre[] = [];
    provinceAccidentTravailAma: AccidentTravailAma[] = [];
    provinceClimatSocials: ClimatSocial[] = [];
  }
  
  export class Commune {
    id = 0;
    nom = '';
    idProvince = 0;
    province = new Province();
  
    communeLieus: Lieu[] = [];
    communeRealisationProjetPetroliers: RealisationProjetPetrolier[] = [];
    communeEtatStationServices: EtatStationService[] = [];
    communeStockPPLs: StockPPL[] = [];
    communeDepots: Depot[] = [];
    communeImportationPPLs: ImportationPPL[] = [];
    communeStockGPLs: StockGPL[] = [];
    communeRaccordementsAutresGazoducs: RaccordementsAutresGazoduc[] = [];
    communeIncidentSurvenusSurGmes: IncidentSurvenusSurGme[] = [];
    communeTraverseesGmeOuvragePublics: TraverseesGmeOuvragePublic[] = [];
    communePrixCarburantStations: PrixCarburantStation[] = [];
    communeConsommationGPLs: ConsommationGPL[] = [];
    communeImportationGPLs: ImportationGPL[] = [];
    communeAuditsEnergetiquesObligatoires: AuditsEnergetiquesObligatoire[] = [];
    communeSecteurEntreprisesServicesEnergetiques: EntreprisesServicesEnergetique[] = [];
    communeProjetEnrs: ProjetEnr[] = [];
    communeProjetsEEs: ProjetsEE[] = [];
    communeAuditsEnergetiquesObligatoireRealises: AuditsEnergetiquesObligatoireRealise[] = [];
    communeActiviteCentreEmplisseurs: ActiviteCentreEmplisseur[] = [];
    communeEtatTitresMiniers: EtatTitresMinier[] = [];
    communeDecisionsAccordee: DecisionsAccordee[] = [];
    communeProductionMinieres: ProductionMiniere[] = [];
    communeCommercialisationMiniereLocals: CommercialisationMiniereLocal[] = [];
    communeCommercialisationMiniereExports: CommercialisationMiniereExport[] = [];
    communeProjetMiniers: ProjetMinier[] = [];
  
  }
  
  
  //************** MINES **************/
  export class EtatTitresMinier
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    nbrPermisRecherche = 0;
    nbrLicenceExploitationMines = 0;
    nbrAutorisationsExploitationHaldesTerrils = 0;
    nbrPermisRechercheCavites = 0;
    nbrPermisExploitationCavites  = 0;
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    commune = new Commune();
  }
  
  export class DecisionsAccordee
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    idActionsEffectuee = 0;
    nbr = 0;
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    commune = new Commune();
    ActionsEffectuee = new ActionsEffectuee();
  }
  
  export class ActionsEffectuee
  {
    id = 0;
    nom = '';
    ActionsEffectueeDecisionsAccordees: DecisionsAccordee[] = []
  }
  
  export class ProductionMiniere
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    idSubstance = 0;
  
    ProductionToutVenant = 0;
    ProductionMarchande = 0;
    ProductionTransforme = 0;
    isValide = false;
    dateValidation = new Date();
  
    substance = new Substance();
    region = new Region();
    province = new Province();
    commune = new Commune();
  }
  
  export class CommercialisationMiniereLocal
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
  
    idSubstance = 0;
    idProduitMiniere = 0;
  
    typeProduitMiniere = '';
    quantite = 0;
    Valeur = 0;
  
    isValide = false;
    dateValidation = new Date();
  
    region = new Region();
    province = new Province();
    commune = new Commune();
    substance = new Substance();
    produitMiniere = new ProduitMiniere();
  }
  
  export class CommercialisationMiniereExport
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
  
    idSubstance = 0;
    idProduitMiniere = 0;
  
    typeProduitMiniere = '';
    quantite = 0;
    Valeur = 0;
  
    isValide = false;
    dateValidation = new Date();
  
    region = new Region();
    province = new Province();
    commune = new Commune();
    substance = new Substance();
    produitMiniere = new ProduitMiniere();
  }
  
  export class ProjetMinier
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    idSocieteMiniere = 0;
    nom = '';
    societeMiniere = new SocieteMiniere();
    region = new Region();
    province = new Province();
    commune = new Commune();
    EnveloppeBudgetaire = 0;
    projetMinierSubstanceProjetMiniers: SubstanceProjetMinier[] = [];
  }
  
  export class DetailsProjetMinier
  {
    id = 0;
    idProjetMinier = 0;
    natureProjet = '';
    budgetRealise = 0;
    etatAvancement = '';
    projetMinier = new ProjetMinier();
    detailsProjetMinierSubstanceDetailsProjetMiniers: SubstanceDetailsProjetMinier[] = [];
  }
  
  export class SubstanceDetailsProjetMinier
  {
    id = 0;
    idDetailsProjetMinier = 0;
    idSubstance = 0;
    detailsProjetMinier = new DetailsProjetMinier();
    substance = new Substance();
  }
  
  export class SocieteMiniere
  {
    id = 0;
    nom = '';
    adresse = '';
    tel = '';
    fax = '';
    email = '';
    societeMiniereProjetMiniers: ProjetMinier[] = [];
  }
  
  export class SubstanceProjetMinier
  {
    id = 0;
    idProjetMinier = 0;
    idSubstance = 0;
    projetMinier = new ProjetMinier();
    substance = new Substance();
  }
  
  export class Substance
  {
    id = 0;
    nom = '';
    substanceProductionMinieres: ProductionMiniere[] = [];
    substanceMinierSubstanceProjetMiniers: SubstanceProjetMinier[] = [];
  
    substanceProduitMinieres: ProduitMiniere[] = [];
    substanceSubstanceDetailsProjetMiniers: SubstanceDetailsProjetMinier[] = [];
    substanceCommercialisationMiniereLocals: CommercialisationMiniereLocal[] = [];
    substanceCommercialisationMiniereExports: CommercialisationMiniereExport[] = [];
  
  }
  
  export class ProduitMiniere
  {
    id = 0;
    nom = '';
    idSubstance = 0;
    substance = new Substance();
    produitMiniereCommercialisationMiniereLocals: CommercialisationMiniereLocal[] = [];
    produitMiniereCommercialisationMiniereExports: CommercialisationMiniereExport[] = [];
  }
  
  export class InvestissementProjetMinier
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    valeur = 0;
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    commune = new Commune();
  }
  
  export class EffectifsProjetMinier
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    date = new Date();
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    valeur = 0;
    effectifDirect = 0;
    effectifIndirect = 0;
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    commune = new Commune();
  }
  
  export class AccidentTravailProjetMinier
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    dateIncident = new Date();
    idSiteMinier = 0;
    typeAccident = '';
    idTypeEmployeur = 0;
    idEmployeur = 0;
    cause = '';
    mesure = '';
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    commune = new Commune();
    siteMinier = new SiteMinier();
    typeEmployeur = new TypeEmployeur();
    employeur = new Employeur();
  }
  
  export class SiteMinier
  {
    id = 0;
    nom = '';
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    region = new Region();
    province = new Province();
    commune = new Commune();
    siteMinierAccidentTravailProjetMiniers: AccidentTravailProjetMinier[] = [];
  }
  
  export class Employeur
  {
    id = 0;
    nom = '';
    idTypeEmployeur = '';
    typeEmployeur = new TypeEmployeur();
    employeurAccidentTravailProjetMiniers: AccidentTravailProjetMinier[] = [];
    employeurMaladiesProfessionnelles: MaladiesProfessionnelle[] = [];
  
  }
  
  export class TypeEmployeur
  {
    id = 0;
    nom = '';
    typeEmployeurEmployeurs: Employeur[] = [];
    typeEmployeurAccidentTravailProjetMiniers: AccidentTravailProjetMinier[] = [];
    typeEmployeurMaladiesProfessionnelles: MaladiesProfessionnelle[] = [];
  
  }
  
  export class MaladiesProfessionnelle
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    idCommune = 0;
    idTypeEmployeur = 0;
    idEmployeur = 0;
    maladiesDeclarees = 0;
    maladiesConfirmees = 0;
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    commune = new Commune();
    typeEmployeur = new TypeEmployeur();
    employeur = new Employeur();
  }
  //********************************************/
  
  //*********************AMA********************/
  export class ProductionVente
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    idSubstance = 0;
    volume = 0;
    valeur = 0;
  
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    substanceAma = new SubstanceAma();
  }
  
  export class PrincipauxClient
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    idSubstance = 0;
    tonnage = 0;
    idClient = 0;
  
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    substanceAma = new SubstanceAma();
    client = new Client();
  }
  
  export class EmploiSecteur
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    idSubstance = 0;
    nbrArtisan = 0;
    nbrOuvrier = 0;
  
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
  }
  export class SubstanceAma
  {
    id = 0;
    nom = '';
    substanceAmaProductionVentes: ProductionVente[] = [];
    substanceAmaPrincipauxClients: PrincipauxClient[] = [];
    substanceAmaSuiviChantiers: SuiviChantier[] = [];
  }
  
  export class Client
  {
    id = 0;
    nom = '';
    clientPrincipauxClients: PrincipauxClient[] = [];
  }
  
  export class SuiviAutorisation
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    nbrAutorisation = 0;
    nbrAutorisationRenouvele = 0;
    nbrAutorisationTransfere = 0;
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
  }
  
  export class SuiviChantier
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
  
    idQaidat = 0;
    idChantierMinierArtisanal = 0;
    idSubstanceAma = 0;
    substance = '';
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
  
    qaidat = new Qaidat();
    chantierMinierArtisanal = new ChantierMinierArtisanal();
    substanceAma = new SubstanceAma();
    suiviChantierDetailSuiviChantiers: DetailSuiviChantier[] = [];
  }
  
  export class DetailSuiviChantier
  {
    id = 0;
    etat = '';
    dateEtat = new Date();
    idSuiviChantier = 0;
    suiviChantier = new SuiviChantier();
  
  }
  
  export class Qaidat
  {
    id = 0;
    nom = '';
    qaidatSuiviChantiers: SuiviChantier[] = [];
  }
  
  export class ChantierMinierArtisanal
  {
    id = 0;
    nom = '';
    chantierMinierArtisanalSuiviChantiers: SuiviChantier[] = [];
    chantierMinierArtisanalAccidentTravailAmas: AccidentTravailAma[] = [];
  }
  
  export class IndicateurSuivre
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
  
    chiffreAffaire = 0;
    recettesArtisansMineur = 0;
    coutTransport = 0;
  
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
  }
  
  export class  AccidentTravailAma
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    dateAccident = new Date();
    idChantierMinierArtisanal = 0;
    NumAutorisation = '';
    TypeAccident = '';
    idEmployeurAma = 0;
    cause = '';
    mesure = '';
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    chantierMinierArtisanal = new ChantierMinierArtisanal();
    employeurAma = new EmployeurAma();
  }
  
  export class EmployeurAma
  {
    id = 0;
    nom = '';
    emloyeurAmaAccidentTravailAmas: AccidentTravailAma[] = [];
    employeurAmaClimatSocials: ClimatSocial[] = [];
  }
  
  export class ClimatSocial
  {
    id = 0;
    annee = new Date().getFullYear();
    mois = new Date().getMonth() + 1;
    idRegion = 0;
    idProvince = 0;
    idEmployeurAma = 0;
    nbrJourPerdu = 0;
    effectifParticipantGreve = 0;
    principaleRevendication = '';
    solutionPreconisee = '';
    isValide = false;
    dateValidation = new Date();
    region = new Region();
    province = new Province();
    employeurAma = new EmployeurAma();
    climatSocialClimatSocialSyndicats: ClimatSocialSyndicat[] = [];
  }
  
  export class ClimatSocialSyndicat
  {
    id = 0;
    idClimatSocial = 0;
    idSyndicat = 0;
  
    climatSocial = new ClimatSocial();
    syndicat = new Syndicat();
  }
  
  export class Syndicat
  {
    id = 0;
    nom = '';
    syndicatClimatSocialSyndicats: ClimatSocialSyndicat[] = [];
  }
  //*******************************************/
  