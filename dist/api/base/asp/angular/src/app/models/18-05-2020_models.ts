export class User {
    id = 0;
    name = '';
    email = '';
    password = '';
    date = new Date();
    isActive = false;
    idRole = 0;
    role = new Role();
    blogs: Blog[] = [];
}

export class Role {
    id = 0;
    name = '';
    users: User[] = [];
}

export class Blog {
    id = 0;
    title = '';
    description = '';
    imageUrl = '';
    date = new Date();
    idUser = 0;
    idCategory = 0;
    user = new User();
    category = new Category();
}

export class Category {
    id = 0;
    name = '';
    blogs: Blog[] = [];
}