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



// get todo list data from chrome storage
var get_todo_data = function(){
	return new Promise((resolve, reject) => {
    chrome.storage.sync.get('data', function(result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
	// return chrome.storage.sync.get('data')
}

// set new data into todo list to chrome storage
var set_new_todo_data = function(new_dict_data){
	chrome.storage.sync.set({"data":new_dict_data})
}

function clear_storage(){chrome.storage.sync.clear(function() {
  console.log('Data cleared successfully');
	});
}


//New Task List Item
var createNewTaskElement = function(taskString) {
	//Create List Item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbrox
	// var checkBox = document.createElement("input"); // checkbox

	//label
	var label = document.createElement("label");
	//input (text)
	var editInput = document.createElement("input"); // text
	
	//datelabel
	var datelabel = document.createElement("label");
	//input(date)
	var editdate = document.createElement("input"); // 

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
	datelabel.className = "datelabel";
	editdate.className = "deadline";
	
	label.innerText = taskString.todo;
	datelabel.innerText = taskString.deadline;

	
	editButton.addEventListener("click", editTask);
	deleteButton.addEventListener("click", deleteTask);
	// checkBox.addEventListener("click", taskIncomplete);
	checkBox.addEventListener("click", taskCompleted);

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
async function listTask() {
	const result = await get_todo_data();
	// promise_data.then((result) => {
		// sort data ascending by deadline
		const data = result.data || [];
		var sorted_data = data.sort((a,b) => (new Date(a.deadline) > new Date(b.deadline)) ? 1 : ((new Date(b.deadline) > new Date(a.deadline)) ? -1 : 0));

		// add dta one by one from sorted_data array
		if (sorted_data !== undefined){
				for (i=0; i<sorted_data.length; i++){
					if (sorted_data[i].deadline <= today){
						c = createNewTaskElement(sorted_data[i].todo ? {"todo" : sorted_data[i].todo, "deadline" : sorted_data[i].deadline, "set_color": true} : {"todo" : sorted_data[i].completed, "deadline" : sorted_data[i].deadline})
						// bindTaskEvents(c, taskIncomplete);
					}
					else{
						c = createNewTaskElement(sorted_data[i].todo ? {"todo" : sorted_data[i].todo, "deadline" : sorted_data[i].deadline} : {"todo" : sorted_data[i].completed, "deadline" : sorted_data[i].deadline})
						// bindTaskEvents(c, taskCompleted);
					}
					if (sorted_data[i].todo){
						console.log("__________________________________)", sorted_data[i], incompleteTasksHolder)
						incompleteTasksHolder.appendChild(c);
					}
					else{
						completedTasksHolder.appendChild(c);
					}
				}
			}
			
	// });
}
listTask();


//Add a new task (CreateView)
async function addTask() {
	console.log("Add task...");
	//Create a new list item with the text from #new-task:
	const result = await get_todo_data()
	storeData = result.data
	todoArr = storeData ? [...storeData] : [] 
	
	if (taskInput.value.trim() !== "" && taskInput !== undefined){
			data = {"todo":taskInput.value.trim(), "deadline":deadlineInput[0].value}
			todoArr.push(data)
			set_new_todo_data(todoArr)
			var listItem = createNewTaskElement(data, taskCompleted);

			//Append listItem to incompleteTasksHolder
			incompleteTasksHolder.appendChild(listItem);
			// bindTaskEvents(listItem, taskCompleted);
			// var checkBox = listItem.querySelector("input[type=checkbox]");
			// console.log("______________________---------------------->",checkBox);
			// checkBox.addEventListener("click", taskCompleted);
		}
		else{
			var notifoption = {
				type: 'basic',
				iconUrl: 'icon1.png',
				title: 'Empty Task',
				message: 'Please, Enter Proper Task name..!!',
			}
			chrome.notifications.create("complete_task",notifoption);
		}

		taskInput.value = "";
		deadlineInput[0].value = "";
}



//Edit an existing task
async function editTask() {
	console.log("Edit task...");
	// promise_data.then((result) => {
		const result = await get_todo_data()
		data = result.data
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

				if (data !== undefined){
					for (i=0; i<data.length; i++){
						if (data[i]['todo'] == label.innerText){
							data[i]['todo'] = editInput.value;
							data[i]['deadline'] = editdate.value;
							clear_storage()
							await set_new_todo_data(data);
						}
						else if (data[i]['completed'] == label.innerText){
							data[i]['completed'] = editInput.value;
							data[i]['deadline'] = editdate.value;
							clear_storage()
							await set_new_todo_data(data);
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
// })
}

//Delete an existing task
async function deleteTask() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	var label = listItem.querySelector("label");
	// delete from localStorage
	// data = JSON.parse(localStorage.getItem("data")) || []
	// var data = get_todo_data()
	const result = await get_todo_data()
	data = result.data
	for (i=0; i<=data.length; i++){
		if (data[i] !== undefined){
			if (data[i]['todo'] == label.innerText){
				data.splice(i,1)
				// localStorage.setItem("data" , JSON.stringify(data))
				clear_storage()
				await set_new_todo_data(data);
				break;
			}
			else if (data[i]['completed'] == label.innerText){
				data.splice(i,1)
				// localStorage.setItem("data" , JSON.stringify(data))
				clear_storage()
				await set_new_todo_data(data);
				break;
			}
		}
	}

	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

//Mark a task as complete
async function taskCompleted() {
	console.log("Task complete...");
	//Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	var label = listItem.querySelector("label");

	// chrome storage update (todo to complete)
	// data = JSON.parse(localStorage.getItem("data")) || []
	const result = await get_todo_data()
	data = result.data
	if (data !== undefined){
		for (i=0; i<data.length; i++){
			if (data[i]['todo'] == label.innerText){
				data[i]['completed'] = data[i]['todo'];

				// remove class of red background when task completed
				listItem.classList.remove('urgent_task')

				delete data[i]['todo'];
				await set_new_todo_data(data)
				// localStorage.setItem("data" , JSON.stringify(data))
			}
		}
	}

	completedTasksHolder.appendChild(listItem);
	await bindTaskEvents(listItem, taskIncomplete);	
	// var checkBox = listItem.querySelector("input[type=checkbox]");
	// checkBox.addEventListener("click", taskIncomplete);
	var notifoption = {
		type: 'basic',
		iconUrl: 'icon1.png',
		title: 'Task Completed',
		message: 'Task completed..!!',
	}
	chrome.notifications.create("complete_task",notifoption);

}


//Mark a task as incomplete
async function taskIncomplete() {
	console.log("Task incomplete...");
	//Append the task list item to the #incomplete-tasks
	var listItem = this.parentNode;
	var label = listItem.querySelector("label");


	// local storage update (complete to todo)
	// data = JSON.parse(localStorage.getItem("data")) || []
	const result = await get_todo_data()
	data = result.data
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
				// localStorage.setItem("data" , JSON.stringify(data))
				await set_new_todo_data(data)
			}
		}
	}

	incompleteTasksHolder.appendChild(listItem);
	await bindTaskEvents(listItem, taskCompleted);
	// var checkBox = listItem.querySelector("input[type=checkbox]");
	// checkBox.addEventListener("click", taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");

	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;
}

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