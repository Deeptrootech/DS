// This exists only to create a link to the console in chrome://extensions/
var contextMenuItem = {
  "id" : "addTODO",
  "title" : "add to TODO list",
  "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(e){
  // console.log("Add task from background...",localStorage.getItem("data"));
  console.log(chrome.storage.sync.get("hi"))
	//Create a new list item with the text from #new-task:
  // storeData = localStorage.getItem("data")
  // todoArr = storeData ? [...JSON.parse(localStorage.getItem("data"))] : []
  // data = {"todo":taskInput.value, "deadline":deadlineInput[0].value}
  // todoArr.push(data)
  // localStorage.setItem("data", JSON.stringify(todoArr))
});