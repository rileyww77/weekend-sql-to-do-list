console.log('client is running');

$(document).ready(onReady);

let completedStatus = "N";

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
    let tasksToAdd = response
    //append current tasks to DOM
    for (task of tasksToAdd){
        $('#newTasks').append(`
        <tr>
            <td>${task.tasks}</td>
            <td>${task.notes}</td>
            <td>${task.completed}</td>
        
        </tr>
        `)
    }
})
    
}


//adding new task, will be POST request
function addNewTask(){
    console.log('clicked');
    let taskObject = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        completed: completedStatus
    }

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskObject
    }).then(function (response){
        console.log('the response from the server is', response);
        getTasks();
    }).catch (function (error) {
        console.log('Error in POST', error);
      alert('Unable to add task at this time. Please try again later.');
    });
}