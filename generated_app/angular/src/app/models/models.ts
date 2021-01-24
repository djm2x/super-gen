export class Options {
  modules = {
    settings: [
      'Organisme',
      'Site',
      'Entite',
      'Categorie',
      'Collaborateur',
      'User',
      'Role',
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
  }
}

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
  adresse = '';
  ville = '';
  telephone = '';

  entites: Entite[] = []
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

export class Affectation {
  id = 0;

  idCollaborateur = 0;
  collaborateur = new Collaborateur();

  idEntite = 0;
  entite = new Entite();

  dateEffet = new Date();
  actif = true;

  idFonction = 0;
  fonction = new Fonction();

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
  CodeImmobilisation = 0;
  notes = '';

  DetailsReceptions: DetailsReception[] = [];

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
  reception = new Reception();

  idArticle = 0;
  article = new Article();

  idFormatEmballage = 0;
  formatEmballage = new FormatEmballage();

  quantite = 0;
  prixUnitaireHT = 0.00;
  NumeroSerie = '';
  NumeroInventaire = '';
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