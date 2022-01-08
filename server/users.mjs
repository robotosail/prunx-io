const users = [];

function userJoin(id, gameCode){
    const user = {id, gameCode};
    users.push(user);
}

//get current user
function getcurrentuser(id){
    return users.find(user => user.id === id);
}

export{
    userJoin,
    getcurrentuser
}