var taskInput = document.getElementById("new-task"); //new-task
var deadlineInput = document.getElementById("deadline"); //new-task-deadline
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

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
	//button.edit
	var editButton = document.createElement("button");
	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	//Each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
  
	return listItem;
}

//Add a new task (ListView)
data = JSON.parse(localStorage.getItem("data")) || []
if (data !== undefined){
	for (i=0; i<data.length; i++){
		c = createNewTaskElement(data[i].todo ? data[i].todo: data[i].completed)
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
  data = {"todo":taskInput.value, "deadline":deadlineInput.value}
  todoArr.push(data)
  localStorage.setItem("data", JSON.stringify(todoArr))
  var listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
	deadlineInput.value = "";

}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text");
	var label = listItem.querySelector("label");

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
					localStorage.removeItem(data);
					localStorage.setItem("data" , JSON.stringify(data))
				}
				else if (data[i]['completed'] == label.innerText){
					data[i]['completed'] = editInput.value;
					localStorage.removeItem(data);
					localStorage.setItem("data" , JSON.stringify(data))
				}
			}
		}
		//Switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;


	} else {
		listItem.querySelector(".edit").innerText = "Save";
		//Switch to .editMode
		//input value becomes the label's text
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
	debugger;
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
			if (data[i]['completed'] == label.innerText){
				data[i]['todo'] = data[i]['completed'];
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