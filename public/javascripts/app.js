let itemPerPage = 10;
let currentPage = 1;
let usersList = {};
let tempDataRow = '';
let timeout;
let temp = {};


window.onload = () => ini();
window.onhashchange = () => ini();

function ini(){
    if(window.location.hash.slice(1))
        route.render(window.location.hash.slice(1))
    else
    route.render("home")
}

const route = {
    routes : [],
    set: (url, render, callbacks = ()=>{} )=>{
        let exist = route.routes.find((r) => r.url == url);
        if(exist){
            route.routes[exist.index] = {
                index: exist.index,
                url : url,
                render : render,
                callbacks : callbacks
            }
        }
        route.routes.push({
            index: route.routes.length,
            url : url,
            render : render,
            callbacks : callbacks
        })
    }, 
    get: (splitURL) => {
        let found = true;
        let foundRoute = false;
        let spliRoutetURL
        let paramKey = []
        let paramVal = []
        route.routes.forEach((r) => {
            found = true
            spliRoutetURL = r.url.split('/')

            if(splitURL.length == spliRoutetURL.length){
                for (let i=0; i<spliRoutetURL.length; i++) {
                    if(spliRoutetURL[i].indexOf('['))
                    globalRegex = new RegExp(spliRoutetURL[i].slice(spliRoutetURL[i].indexOf('[')), 'g');

                    if(spliRoutetURL[i][0] == ':' && globalRegex.test(splitURL[i])){
                        paramKey.push(spliRoutetURL[i].slice(1, spliRoutetURL[i].indexOf('[')))
                        paramVal.push(splitURL[i])
                        continue;
                    }

                    if(spliRoutetURL[i] != splitURL[i]){
                        found = false
                        break;
                    }
                }
                if(found)
                foundRoute = r
            }
        });

        if(foundRoute)
        paramKey.forEach(function(key,index) {
            temp[key] = paramVal[index];
        });
        return foundRoute
    },
    render: (url) => {
        let pageContent ="<div class='container my-3 p-3 bg-white rounded box-shadow'>ERROR 404</div>";
        let splitURL = url.split('/')

        let get = route.get(splitURL);
        if(get){
            app.innerHTML = get.render;
            get.callbacks();
            return
        }
        app.innerHTML = pageContent;
    }
}


const home = "\
<nav aria-label='breadcrumb'>\
    <ol class='breadcrumb bg-white box-shadow' id='breadcrumb'>\
        <li class='breadcrumb-item active' aria-current='page'>Home</li>\
    </ol>\
</nav>\
<div class='container starter-template bg-white  p-3 box-shadow'>\
    <h1>Home Page</h1>\
    <p class='lead'>Home page.</p>\
</div>";

const users = "\
<nav aria-label='breadcrumb'>\
    <ol class='breadcrumb bg-white box-shadow' id='breadcrumb'>\
        <li class='breadcrumb-item'><a href='/'>Home</a></li>\
        <li class='breadcrumb-item'><a href='#users'>Users</a></li>\
        <li class='breadcrumb-item active' aria-current='page'>ALL</li>\
    </ol>\
</nav>\
<div class='container my-3 p-3 bg-white rounded box-shadow'>\
    <div><a href='#users/add' type='button' class='btn btn-success mb-2'>Create New</a></div>\
    <div class='message'></div>\
    <table class='table table-striped'>\
        <thead class='thead-dark'>\
            <tr>\
                <th scope='col'>id</th>\
                <th scope='col'>Username</th>\
                <th scope='col'>Email</th>\
                <th scope='col'>Role</th>\
                <th scope='col'>Password</th>\
                <th scope='col' width='30%'>Action</th>\
            </tr>\
        </thead>\
        <tbody id='userlist'></tbody>\
    </table>\
    <nav aria-label=''><ul class='pagination justify-content-center' id='pagination'></ul></nav>\
</div>";

const userById = "\
<nav aria-label='breadcrumb'>\
    <ol class='breadcrumb bg-white box-shadow' id='breadcrumb'>\
    <li class='breadcrumb-item'><a href='/'>Home</a></li>\
    <li class='breadcrumb-item'><a href='#users'>Users</a></li>\
    <li class='breadcrumb-item active' aria-current='page'>Info</li>\
    </ol>\
</nav>\
<div class='container starter-template bg-white  p-3 box-shadow' id='userInfo'></div>";

const userAdd = "\
<nav aria-label='breadcrumb'>\
    <ol class='breadcrumb bg-white box-shadow' id='breadcrumb'>\
    <li class='breadcrumb-item'><a href='/'>Home</a></li>\
    <li class='breadcrumb-item'><a href='#users'>Users</a></li>\
    <li class='breadcrumb-item active' aria-current='page'>Add</li>\
    </ol>\
</nav>\
<div class='container starter-template bg-white  p-3 box-shadow' id='userAdd'>\
<div class='message'></div>\
<p class='lead '><strong>Username : </strong><input type='text'  class='form-control username' ></p>\
<p class='lead '><strong>Email : </strong><input type='text' class='form-control email' ></p>\
<p class='lead '><strong>Role : </strong><input type='text' class='form-control role' ></p>\
<p class='lead '><strong>Password : </strong><input type='text' class='form-control password' ></p>\
<p class='lead'><a href='#users' type='button' class='btn btn-danger'>Back</a> <button type='button' onclick='save()' class='btn btn-success'>Save</button></p>\
</div>";

route.set('home', home);
route.set('users', users, ()=>getUsers(currentPage, itemPerPage));
route.set('users/:id[0-9]', userById, ()=>getUser(temp.id));
route.set('users/add', userAdd);

function getUsers(page, limit){
    let totalePage;
    let offset = (page-1) * limit;
    userlist.innerHTML = "";
    pagination.innerHTML = "";
    currentPage = page;

    fetch('/users?limit='+limit+'&offset='+offset)
    .then(users => users.json())
    .then(data => {
    usersList = data.rows;
    totalePages = Math.ceil(data.count/itemPerPage);
    usersList.forEach((user, index) => {
        userlist.innerHTML += '<tr id="'+user.id+'"><td>'+user.id+'</td><td>'+user.username+'</td><td>'+user.email+'</td><td>'+user.role+'</td><td>'+user.password+'</td><td><a href="#users/'+user.id+'" type="button" class="btn btn-warning">info</a> <button type="button" class="btn btn-primary" onclick="editUser('+ user.id +')"> Modifier </button> <button type="button" class="btn btn-danger" onclick="removeUser('+ user.id +')"> Suprimer </button></td></tr>';          
    })
    
    if(currentPage==1)
    pagination.innerHTML += '<li class="page-item disabled"> <button class="page-link" tabindex="-1">Previous</button> </li>';
    else
    pagination.innerHTML += '<li class="page-item"> <button class="page-link" onclick="getUsers('+ (currentPage-1) +', '+itemPerPage+')">Previous</button> </li>';

    for (i = 1; i <= totalePages; i++) {
        if(page != i)
        pagination.innerHTML += '<li class="page-item"><button class="page-link" onclick="getUsers('+i+', '+itemPerPage+')">'+ i +'</button></li>';
        else
        pagination.innerHTML += '<li class="page-item active"> <span class="page-link"> '+ i +' <span class="sr-only">(current)</span> </span> </li>';
    }

    if(currentPage==totalePages)
    pagination.innerHTML += '<li class="page-item disabled"> <button class="page-link" tabindex="-1">Next</button> </li>';
    else
    pagination.innerHTML += '<li class="page-item"> <button class="page-link" onclick="getUsers('+ (currentPage+1) +', '+itemPerPage+')">Next</button> </li>';

    });
}

function getUser(id){

    fetch('/users/'+id)
    .then(users => users.json())
    .then(user => {
        userInfo.innerHTML = '<p class="lead"><a href="#users" type="button" class="btn btn-danger">Back</a></p>';
        userInfo.innerHTML += '<p class="lead"><strong>Username : </strong>'+user.username+'</p>';
        userInfo.innerHTML += '<p class="lead"><strong>Email : </strong>'+user.email+'</p>';
        userInfo.innerHTML += '<p class="lead"><strong>Role : </strong>'+user.role+'</p>';
        userInfo.innerHTML += '<p class="lead"><strong>Password : </strong>'+user.password+'</p>';
        userInfo.innerHTML += '<p class="lead"><strong>Created at : </strong>'+new Date(user.createdAt).toUTCString()+'</p>';
    })

}

function editUser(idUser){
    const editUser = usersList.filter(user => user.id == idUser)[0];
    tempDataRow = document.getElementById(editUser.id).innerHTML;
    document.getElementById(editUser.id).innerHTML = '<td>'+editUser.id+'</td><td><input class="form-control username" type="text" value="'+editUser.username+'"></td><td><input class="form-control email" type="text" value="'+editUser.email+'"></td><td><input class="form-control role" type="text" value="'+editUser.role+'"></td><td><input class="form-control password" type="text" value="'+editUser.password+'"></td><td><button type="button" class="btn btn-success" onclick="saveEditUser('+ editUser.id +')"> Sauvegarder </button> <button type="button" class="btn btn-warning" onclick="cancelEditUser('+ editUser.id +')"> Annuler </button></td>';
}

function cancelEditUser(idUser){
    const editUser = usersList.filter(user => user.id == idUser)[0];
    document.getElementById(editUser.id).innerHTML = tempDataRow;
}

function save(){
    let text = "";
    let username = document.getElementsByClassName('username')[0].value;
    let email = document.getElementsByClassName('email')[0].value;
    let role = document.getElementsByClassName('role')[0].value;
    let password = document.getElementsByClassName('password')[0].value;
    
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username : username,
            email : email,
            role : role,
            password : password
        })
    })
    .then(users => users.json())
    .then((e) => {
        text = '<div class="alert alert-success" role="alert">l\'enregistrement a été effectué avec succès</div>';
        window.location.hash = '#users';
    })
    .catch(() =>{
    text = '<div class="alert alert-danger" role="alert">Erreur d\'enregistrement</div>';
    })
    .finally(() => {
    let messgContainer = document.getElementsByClassName("message")[0];
    messgContainer.innerHTML = text;
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
        messgContainer.innerHTML = "";
    }, 5000);
    })

}
function saveEditUser(idUser){
    let text = "";
    let id = document.getElementById(idUser);
    let username = id.getElementsByClassName('username')[0].value;
    let email = id.getElementsByClassName('email')[0].value;
    let role = id.getElementsByClassName('role')[0].value;
    let password = id.getElementsByClassName('password')[0].value;
    
    
    fetch('/users', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id : idUser,
        username : username,
        email : email,
        role : role,
        password : password
    })
    })
    .then(() => {
        text = '<div class="alert alert-success" role="alert">l\'enregistrement a été effectué avec succès</div>';
        getUsers(currentPage, itemPerPage);
    })
    .catch(() =>{
    text = '<div class="alert alert-danger" role="alert">Erreur d\'enregistrement</div>';
    })
    .finally(() => {
    let messgContainer = document.getElementsByClassName("message")[0];
    messgContainer.innerHTML += text;
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
        messgContainer.innerHTML = "";
    }, 5000);
    })
}

function removeUser(idUser){
    fetch('/users/'+ idUser, { method: 'DELETE' })
    .then(() => {
        text = '<div class="alert alert-success" role="alert">la suppression a été effectué avec succès</div>';
        getUsers(currentPage, itemPerPage);
    })
    .catch(() =>{
    text = '<div class="alert alert-danger" role="alert">Erreur de suppression</div>';
    })
    .finally(() => {
    let messgContainer = document.getElementsByClassName("message")[0];
    messgContainer.innerHTML += text;
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
        messgContainer.innerHTML = "";
    }, 5000);
    })
}

function f(data){
    console.log(data);
}