console.log('client is running');

$(document).ready(onReady);

let completedStatus = "No";

function onReady() {
    //click events
    $('#submitButton').on('click', addNewTask);
    $('#newTasks').on('click', '.completeButton', taskCompleted);
    $('#newTasks').on('click', '.deleteButton', deleteTask);

    //getting the tasks on the DOM
    getTasks();
}

//GET request, puts tasks on DOM
function getTasks() {
    console.log('in getTasks');

    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        $('#newTasks').empty();
        console.log(response);
        let tasksToAdd = response
        //append current tasks to DOM
        for (task of tasksToAdd) {
            if (task.completed === "No") {
                $('#newTasks').append(`
                <table id=newTaskTable>
                    <tr data-taskid="${task.id}">
                        <td class="taskData">${task.tasks}</td>
                        <td class="taskData">${task.notes}</td>
                        <td class="taskData">${task.completed}</td>
                        <td><button class="completeButton">Complete</button></td>
                        <td><button class="deleteButton">Delete</button></td>
                    </tr>
                </table>
             `)} else {
                $('#newTasks').append(`
                <table id=newTaskTable>
                    <tr data-taskid="${task.id}">
                        <td class="taskData lineThrough">${task.tasks}</td>
                        <td class="taskData lineThrough">${task.notes}</td>
                        <td class="taskData lineThrough">${task.completed}</td>
                        <td><button class="completeButton">Done!</button></td>
                        <td><button class="deleteButton">Delete</button></td>
                    </tr>
                </table>`
                )}
            
        }
    }
    )}



//adding new task, will be POST request
function addNewTask() {
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
    }).then(function (response) {
        console.log('the response from the server is', response);
        getTasks();
        $('#taskIn').val('');
        $('#notesIn').val('');
    }).catch(function (error) {
        console.log('Error in POST', error);
        alert('Unable to add task at this time. Please try again later.');
    });
}

//PUT request
function taskCompleted() {
    console.log('done clicked');

    //getting the data stored in the table row
    const id = $(this).closest('tr').data('taskid');
    completedStatus = 'Yes!';
    console.log(id);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: { completed: completedStatus }
    }).then(function (response) {
        console.log(response);
        getTasks();
    }).catch(function (error) {
        alert('error updating task, error:', error);
    })
};



//DELETE request
function deleteTask() {
    console.log('delete button clicked');
    const id = $(this).closest('tr').data('taskid');
    console.log('in delete, deleting:', id);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then(function (response) {
        console.log('back in delete', response);
        getTasks();
    }).catch(function (error) {
        alert('error deleting. Try again later!', error)
    });
}