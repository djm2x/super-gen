export class Affectation {
  id = 0;
  idArticle = 0;
  article: Article;
  idEmplacement = 0;
  emplacement: Emplacement;
  idCollaborateur = 0;
  collaborateur: Collaborateur;
  dateDebutAffectation = new Date();
  dateFinAffectation = new Date();
  isCurrent = true;
  notes = '';
}

export class Emplacement {
  id = 0;
  idSite = 0;
  site = new Site()
  CodeEmplacement = '';
  Description = '';
  Batiment = '';
  Etage = '';
  Departement = '';
  Service = '';
}

export class Demande {
  id = 0;
  idDemandeur = 0;
  reference = '';
  dateDemande = new Date();
  etatDemande = 0;
  valeur = 0;
  nbrArticle = 0;
  addOn = new Date();
  addBy = '';
  updatedOn = new Date();
  updatedBy = '';
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

  affectations: Affectation[] = [];
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
  actif = true;
  affectations: Affectation[] = [];
}

export class Fonction {
  id = 0;
  nom = '';
  decision = false;
  responsabilite = false;
  affectations: Affectation[] = [];
}

// export class Affectation {
//   id = 0;

//   idCollaborateur = 0;
//   collaborateur = new Collaborateur();

//   idEntite = 0;
//   entite = new Entite();

//   dateEffet = new Date();
//   actif = true;

//   idFonction = 0;
//   fonction = new Fonction();

// }

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
  demandes: Demande[] = [];

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
    ]
  };

  configJson = {
    apptitle: 'GSI',
    appname: 'Gestion System Informatique',
  };
}