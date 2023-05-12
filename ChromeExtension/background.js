// This exists only to create a link to the console in chrome://extensions/
var contextMenuItem = {
  "id" : "addTODO",
  "title" : "add to TODO list",
  "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);


// for add new task in TODO list from backgroud(service_worker)
chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId == "addTODO" && clickData.selectionText) {
    if (clickData.selectionText.trim() !== ""){
      chrome.storage.sync.get('data', function(result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          storeData = result.data
	        todoArr = storeData ? [...storeData] : [] 
          
          let yourDate = new Date()
			    let today_date_string = yourDate.toISOString().split('T')[0]

          data = {"todo":clickData.selectionText.trim(), "deadline":today_date_string, "bind" : "taskCompleted"}
          todoArr.push(data)
          chrome.storage.sync.set({"data":todoArr}, function(){
            var addnotify = {
              type: 'basic',
              iconUrl: 'icon1.png',
              title: 'Data Added',
              message: 'Data has been added with deadline as current date..!!',
            }
            chrome.notifications.create("AddedData",addnotify);
          })
        }
      });
		}
		else{
			var notifoption = {
				type: 'basic',
				iconUrl: 'icon1.png',
				title: 'Empty Task',
				message: 'Please, Enter Proper Task name..!!',
			}
			chrome.notifications.create("invalid_input",notifoption);
		}
  }
});


// for showing badges of pending today's tasks
chrome.storage.onChanged.addListener(function (changes) {
  chrome.storage.sync.get('data', function(result) {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    } else {
      // debugger;
      var count =0 
      result.data.forEach(element => {
        if (element.todo !== undefined){
          count+=1
        }
      });
      console.log(result.data.length)
      chrome.action.setBadgeText( { "text" : count.toString() } );
      chrome.action.setBadgeBackgroundColor({ color: '#ff7b7b' })
  // chrome.action.setBadgeText({ });
    }
  })
});
