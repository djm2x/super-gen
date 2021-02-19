export class Affectation {
  id = 0;
  dateDebutAffectation = new Date();
  dateFinAffectation = new Date();
  isCurrent = true;
  notes = '';

  idDetailsReception = 0;
  detailsReception: DetailsReception;

  idEmplacement = 0;
  emplacement: Emplacement;

  idCollaborateur = 0;
  collaborateur: Collaborateur;
}

export class Emplacement {
  id = 0;
  idSite = 0;
  site = new Site()
  codeEmplacement = '';
  description = '';
  batiment = '';
  etage = '';
  departement = '';
  service = '';

  affectations: Affectation[] = [];
}

export class Demande {
  id = 0;
  demandeur = 0;
  reference = '';
  dateDemande = new Date();
  etatDemande = 0;
  valeur = 0;
  nbrArticle = 0;
  addOn = new Date();
  addBy = '';
  updatedOn = new Date();
  updatedBy = '';

  DetailsDemandes: DetailsDemande[] = [];
}

export class DetailsDemande {
  id = 0;
  idDemande = 0;
  demande: Demande;
  idArticle = 0;
  article: Article;
  description = '';
  qteDemande = 0;
  qteLivree = 0;
}
 

//

export class Organisme {
  id = 0;
  nom = '';
  adresse = '';
  telephone = '';
  email = '';
  ice = '';
  sites: Site[] = [];
}

export class Site {
  id = 0;
  idOrganisme = 0;
  organisme = new Organisme();
  nom = '';
  adresse = '';
  ville = '';
  telephone = '';

  entites: Entite[] = [];
  emplacements: Emplacement[] = [];
}

export class Entite {
  id = 0;
  nom = '';
  idSite = 0;
  site = new Site();

  idCategorie = 0;
  categorie = new Categorie();

  idParent = 0;
  parent = new Entite();
  childs: Entite[] = [];

  rattachements: Rattachement[] = [];
}

export class Rattachement {
  id = 0;
  dateEffet = new Date();
  actif = false;

  idCollaborateur = 0;
  collaborateur: Collaborateur;

  idEntite = 0;
  entite = new Entite();

  idFonction = 0;
  fonction: Fonction;
}

export class Categorie {
  id = 0;
  nom = 'Direction' || 'Dépertement' || 'Dévision' || 'Service';
  poids = 0;
  entites: Entite[] = [];
}

export class User {
  id = 0;
  nom = '';
  email = '';
  password = '';
  isActive = false;
  imageUrl = '';
  profil = '';
}


export class Collaborateur {
  id = 0;
  nom = '';
  prenom = '';
  email = '';
  matricule = '';
  imageUrl = '';
  isActif = true;
  affectations: Affectation[] = [];
  rattachements: Rattachement[] = [];
}

export class Fonction {
  id = 0;
  nom = '';
  decision = false;
  responsabilite = false;
  rattachements: Rattachement[] = [];
}

export class Constructeur {
  id = 0;
  nom = '';
  representant = '';
  articles: Article[] = [];
}

export class Famille {
  id = 0;
  nom = '';
  comptagePar = 'Lot' || 'Unité';
  idParent = 0;
  parent = new Famille();
  childs: Famille[] = [];
  articles: Article[] = [];
}


export class Article {
  id = 0;
  idFamille = 0;
  famille = new Famille();

  idConstructeur = 0;
  constructeur = new Constructeur()

  model = '';
  reference = '';
  uniteMesure = '';
  qteEnStock = 0;

  tauxAmortissement = 0;
  codeImmobilisation = 0;
  notes = '';

  detailsReceptions: DetailsReception[] = [];
  DetailsDemandes: DetailsDemande[] = [];

}

export class Fournisseur {
  id = 0;
  nom = '';
  ice = '';
  patente = '';
  rc = '';
  rib = '';
  telephone = '';
  adresse = '';
  email = '';
  receptions: Reception[] = [];
}

export class Reception {
  id = 0;

  idFournisseur = 0;
  fournisseur = new Fournisseur();

  dateReception = new Date();
  reference = '';
  nature = '';
  montantTotal = 0.00;
  DetailsReceptions: DetailsReception[] = [];

}

export class DetailsReception {
  id = 0;
  idReception = 0;
  reception: Reception;

  idArticle = 0;
  article: Article;

  idFormatEmballage = 0;
  formatEmballage: FormatEmballage;

  quantite = 0;
  prixUnitaireHT = 0.00;
  numeroSerie = '';
  numeroInventaire = '';
  dateMiseEnService = new Date();
  notes = '';
  statut = '';
  mobilite = '';

  // Hicham 18-02-21
  QuantiteUnitaireTotale = 0 ; // Stocker le nombre totale après le calcul (qte * valeur format Emballage)
  QuantiteConsomme = 0 ; // ça va servir pour les consommables


  affectations: Affectation[] = [];
}

export class FormatEmballage {
  id = 0;
  nom = '';
  valeur = 0;

  detailsReceptions: DetailsReception[] = [];
}



export class Options {
  modules = {
    settings: [
      'Organisme',
      'Site',
      'Entite',
      'Categorie',
      'Collaborateur',
      'User',
      'Fonction',
      'Affectation',
      
    ],
    domaine: [
      'Constructeur',
      'Famille',
      'Article',
      'Fournisseur',
      'Reception',
      'DetailsReception',
      'FormatEmballage',
    ],
    sortie: [
      'Demande',
      'DetailsDemande',
      'Rattachement',
      'Emplacement',
    ]
  };

  configJson = {
    apptitle: 'GSI',
    appname: 'Gestion System Informatique',
  };
}