// export class User {
//   id = 0;
//   nom = '';
//   prenom = '';
//   email = '';
//   password = '';
//   phone = '';
//   isActive = false;
//   matricule = '';
//   profil = '';
//   imageUrl = '';
// }

// export class User {
//   id = 0;
//   nom = '';
//   email = '';
//   password = '';
//   isActive = false;
//   imageUrl = '';
//   profil = '';

//   idRole = 0;
//   role = new Role();
// }

export class Options {
  modules = {
    settings: ['Role'],
    mymenu: ['User']
  };

  title = 'my super app';
}

export class Quiz {
  id = 0;
  title = '';
  description = '';
  enableTime = true;

  idContext = 0;
  context = new Cours();
  questions: Question[] = [];
}

export class Question {
  id = 0;
  value = '';
  responses = '';
  choices = '';
  isMultiChoises = false;
  time = 0;

  idQuiz = 0;
  Quiz = new Quiz();
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

export class User {
  
}