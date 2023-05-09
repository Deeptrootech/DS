var taskInput = document.getElementById("new-task"); //new-task
var deadlineInput = document.getElementsByClassName("deadline"); //new-task-deadline
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

//New Task List Item
var createNewTaskElement = function(taskString) {
	//Create List Item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox

	//label
	var label = document.createElement("label");
	//input (text)
	var editInput = document.createElement("input"); // text
	
	//datelabel
	var datelabel = document.createElement("label");
	//input(date)
	var editdate = document.createElement("input"); // date
	
	//button.edit
	var editButton = document.createElement("button");

	//button.delete
	
	var deleteButton = document.createElement("button");

	//Each element needs modifying

	checkBox.type = "checkbox";
	editInput.type = "text";
	editdate.type = "date";

	if (taskString.set_color == true){
		listItem.className = 'urgent_task';
	}
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	datelabel.className = "datelabel"
	editdate.className = "deadline"
	
	label.innerText = taskString.todo;
	datelabel.innerText = taskString.deadline;

	//Each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(datelabel);
	listItem.appendChild(editdate);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
  
	return listItem;
}

//Add a new task (ListView)
data = JSON.parse(localStorage.getItem("data")) || []
if (data !== undefined){
		for (i=0; i<data.length; i++){
			if (data[i].deadline <= today){
				c = createNewTaskElement(data[i].todo ? {"todo" : data[i].todo, "deadline" : data[i].deadline, "set_color": true} : {"todo" : data[i].completed, "deadline" : data[i].deadline})
			}
			else{
				c = createNewTaskElement(data[i].todo ? {"todo" : data[i].todo, "deadline" : data[i].deadline} : {"todo" : data[i].completed, "deadline" : data[i].deadline})
			}
			if (data[i].todo){
				incompleteTasksHolder.appendChild(c);
			}
			else{
				completedTasksHolder.appendChild(c);
			}
		}
}

var addTask = function() {
	console.log("Add task...");
	//Create a new list item with the text from #new-task:
  storeData = localStorage.getItem("data")
  todoArr = storeData ? [...JSON.parse(localStorage.getItem("data"))] : []
	debugger;
  data = {"todo":taskInput.value, "deadline":deadlineInput[0].value}
  todoArr.push(data)
  localStorage.setItem("data", JSON.stringify(todoArr))
  var listItem = createNewTaskElement(data);

	//Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
	deadlineInput[0].value = "";

}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var editdate = listItem.querySelector("input[type=date]");
	var label = listItem.querySelector("label");
	var datelabel = listItem.getElementsByClassName("datelabel");

	var containsClass = listItem.classList.contains("editMode");

	//if the class of the parent is .editMode
	if (containsClass) {
		listItem.querySelector(".edit").innerText = "Edit";

		// get key from local storage and update value
		data = JSON.parse(localStorage.getItem("data")) || []
		if (data !== undefined){
			for (i=0; i<data.length; i++){
				if (data[i]['todo'] == label.innerText){
					data[i]['todo'] = editInput.value;
					data[i]['deadline'] = editdate.value;
					localStorage.removeItem(data);
					localStorage.setItem("data" , JSON.stringify(data))
				}
				else if (data[i]['completed'] == label.innerText){
					data[i]['completed'] = editInput.value;
					data[i]['deadline'] = editdate.value;
					localStorage.removeItem(data);
					localStorage.setItem("data" , JSON.stringify(data))
				}				
			}
		}
				
		// edited date is greater thentoday then remove red background
		(editdate >= today) ? listItem.classList.remove('urgent_task') : listItem.classList.add('urgent_task');
		
		//Switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;
		datelabel[0].innerText = editdate.value;


	} else {
		listItem.querySelector(".edit").innerText = "Save";
		//Switch to .editMode
		//input value becomes the label's text
		
		editInput.value = label.innerText;
		editdate.value = datelabel[0].innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	var label = listItem.querySelector("label");
	// delete from localStorage
	data = JSON.parse(localStorage.getItem("data")) || []
	for (i=0; i<=data.length; i++){
		if (data[i] !== undefined){
			if (data[i]['todo'] == label.innerText){
				data.splice(i,1)
				localStorage.setItem("data" , JSON.stringify(data))
			}
			else if (data[i]['completed'] == label.innerText){
				data.splice(i,1)
				localStorage.setItem("data" , JSON.stringify(data))
			}
		}
	}

	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
	console.log("Task complete...");
	//Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	var label = listItem.querySelector("label");

	// local storage update (todo to complete)
	data = JSON.parse(localStorage.getItem("data")) || []
	if (data !== undefined){
		for (i=0; i<data.length; i++){
			if (data[i]['todo'] == label.innerText){
				data[i]['completed'] = data[i]['todo'];

				// remove class of red background when task completed
				listItem.classList.remove('urgent_task')

				delete data[i]['todo'];
				localStorage.setItem("data" , JSON.stringify(data))
			}
		}
	}

	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);	
	var notifoption = {
		type: 'basic',
		iconUrl: 'icon1.png',
		title: 'Task Completed',
		message: 'Task completed..!!',
	}
	chrome.notifications.create("complete_task",notifoption);

}


//Mark a task as incomplete
var taskIncomplete = function() {
	console.log("Task incomplete...");
	//Append the task list item to the #incomplete-tasks
	var listItem = this.parentNode;
	var label = listItem.querySelector("label");


	// local storage update (complete to todo)
	data = JSON.parse(localStorage.getItem("data")) || []
	if (data !== undefined){
		for (i=0; i<data.length; i++){
			if (data[i].deadline <= today){}
			if (data[i]['completed'] == label.innerText){
				data[i]['todo'] = data[i]['completed'];
				
				// add red background task if date is current or before
				if (data[i].deadline <= today){
					listItem.classList.add('urgent_task')
				}

				delete data[i]['completed'];
				localStorage.setItem("data" , JSON.stringify(data))
			}
		}
	}

	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	//bind editTask to edit button
	editButton.onclick = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;

	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;
}

// var ajaxRequest = function() {
// 	console.log("AJAX request");
// }

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	
	//bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}