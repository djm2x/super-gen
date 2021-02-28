export class User {
  id = 0;
  nom = '';
  prenom = '';
  tel1 = '00';
  tel2 = '00';
  email = '';
  password = '';
  isActive = false;
  date = new Date();
  adresse = 'temara';
  imageUrl = '';
  cin = '';
  role = '';
  idVille = 1;

  ville = new Ville();
  detailUserActivites: DetailUserActivite[] = [];
  contactUs: ContactUs[] = [];
  discussions: Discussion[] = [];
  otherUserDiscussions: Discussion[] = [];
  messages: Message[] = [];
  otherUserMessages: Message[] = [];
  eventProfs: EventProf[] = [];
  profs: Prof[] = [];
  students: Student[] = [];
}

export class Discussion {
  id = 0;
  unReaded = 0;
  date = new Date();

  idMe = 0;
  idOtherUser = 0;
  me = new User();
  otherUser = new User();
  messages: Message[] = [];
}

export class Message {
  id = 0;
  object = 'Lorem ipsum dolor sit amet.';
  message = 'Lorem ipsum dolor sit amet.';
  vu = false;
  date = new Date();
  idCours = 0;
  otherUserName = '';
  otherUserImage = '';

  idMe = 0;
  idOtherUser = 0;
  idDiscussion = 0;

  me = new User();
  otherUser = new User();
  discussion = new Discussion();
}

export class EventProf {
  id = 0;
  title = '';
  start = new Date();
  end = new Date();
  color = '';
  draggable = true;
  resizable = '';
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  idUser = 0;
  user = new User();
}

export class Ville {
  id = 0;
  nom = '';
  nomAr = '';

  users: User[] = [];
}

export class DetailUserActivite {
  id = 0;
  date = new Date();
  idUser = 0;
  idActivite = 0;

  user = new User();
  activite = new Activite();
}

export class TypeActivite {
  id = 0;
  nom = '';
  nomAr = '';
  imageUrl = '';
  active = false;

  activites: Activite[] = [];
}

export class Activite {
  id = 0;
  nom = '';
  nomAr = '';
  imageUrl = '';
  idTypeActivite = 0;

  typeActivite = new TypeActivite();
  detailUserActivites: DetailUserActivite[] = [];
}

export class Prof {
  id = 0;
  lien = '';
  description = '';
  experience = '';
  approche = '';
  intro = '';
  videoUrl = '';
  cvUrl = '';
  note = 0;

  prixHrWeb = 0;
  prixHrHome = 0;
  prixHrWebGroupe = 0;
  prixHrHomeGroupe = 0;

  idsTypeActivites = '';
  idsActivites = '';
  idsTypeCours = '';
  idsLieuCours = '';
  idsNiveauScolaires = '';

  idUser = 0;
  user = new User();
}

export class Student {
  id = 0;
  ecole = 'ecole';
  niveau = 1;
  branche = 1;
  nomParent = 'nomParent';
  prenomParent = 'prenomParent';
  tel1Parent = 'tel1Parent';
  tel2Parent = 'tel2Parent';

  idUser = 0;
  idActivite = 0;
  user = new User();
  activite = new Activite();
}

export class TypeCours {
  id = 0;
  nom = '';
  nomAr = '';
  offreProfes: OffreProf[] = [];
}

export class LieuCours {
  id = 0;
  nom = '';
  nomAr = '';
}

export class NiveauScolaire {
  id = 0;
  nom = '';
  nomAr = '';
  idCycle = 0;
  coursLigneGroupe = 0;
  coursLigneIndividuel = 0;
  coursDomicileGroupe = 0;
  coursDomicileIndividuel = 0;

  branches: Branche[] = [];
  courses: Cours[] = [];
}

export class Branche {
  id = 0;
  nom = '';
  nomAr = '';
  idNiveauScolaire = 0;
  niveauScolaire = new NiveauScolaire();
  courses: Cours[] = [];
}

export class Cours {
  id = 0;
  nom = '';
  nomAr = '';
  filesUrl = '';
  videosUrl = '';
  semester = 1;
  idBranche = 0;
  branche = new Branche();
  idNiveauScolaire = 0;
  niveauScolaire = new NiveauScolaire();

  quizzes: Quiz[] = [];
}



export class ContactUs {
  id = 0;
  object = '';
  msg = '';
  date = new Date();
  idUser = 0;
  user = new User();
}

export class Video {
  id = 0;
  title = 'ffff';
  order = 0;
  description = '';
  date = new Date();
  urlVideo = '';
}

export class OffreProf {
  id = 0;
  interval = '';
  value = 0;
  idTypeCours = 0;
  typeCours = new TypeCours();
}

export class Quiz {
  id = 0;
  title = '';
  description = '';
  enableTime = true;
  date = new Date();
  isActive = true;

  idContext = 0;
  context = new Cours();
  questions: Question[] = [];
}

export class Question {
  id = 0;
  value = '';
  responsesString = '';
  choices = '';
  isMultiChoises = false;
  time = 60;

  idQuiz = 0;
  Quiz = new Quiz();
  responses: Response[] = [];
}

export class Response {
  id = 0;
  trueResponse = '';
  userResponse = '';
  date = new Date();
  note = 0;

  idQuestion = 0;
  question = new Question();

  idUser = 0;
  user = new User();
}
