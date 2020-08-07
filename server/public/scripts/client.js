console.log('client is running');

$(document).ready(onReady);

function onReady(){
    //click events
    $('#submitButton').on('click', addNewTask);

    //getting the tasks on the DOM
    getTasks();
}

//GET request, puts tasks on DOM
function getTasks(){
console.log('in getTasks');

$.ajax({
    type: 'GET',
    url: '/tasks'
}).then(function (response){
    $('#newTasks').empty();
    console.log(response);
})
    
}


//adding new task, will be PUT request
function addNewTask(){
    console.log('clicked');
}