console.log("Where will this appear.")



// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));



//this will send data when I click on an open tab
chrome.tabs.onActivated.addListener((data) => {
  chrome.runtime.sendMessage({
    first: 'butler',
    last: 'raines'
  })
});



//this will send data when i open a new tab or change url
chrome.tabs.onUpdated.addListener(async (tab) => {
  console.log(tab);
  //console.log(chrome.tabs.get(tab.id));
  //console.log(tabInfo);
  chrome.runtime.sendMessage({
    first: 'brea',
    last: 'figura',
    tab: tab.id,
   // url: tab[0].url
  })
  
});




chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "onboarding.html"
    });
  }
});


//
chrome.tabs.onActivated.addListener(moveToFirstPosition);

async function moveToFirstPosition(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, { index: 0 });
    console.log("Success.");
  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}

//callback function as paramamter 
chrome.tabs.onActivated.addListener(redden);

async function redden(activeInfo) {
  try {

    console.log("Test Calll back fucntion");
  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}
chrome.tabs.onActivated.addListener((data) => {

    getCurrentTab = async () => {
      let queryOptions = { active: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      return tab;
    }
  
    function changeBackgroundColor(tab) {
     // document.body.style.backgroundColor = 'red';
     console.log('tab id ' + tab.id)
    }
  
    getCurrentTab().then((tab)=>{
      chrome.scripting.executeScript(
          {
            target: {tabId: tab.id, allFrames: true},
            func : changeBackgroundColor(tab),
          }
        )
       // console.log(`Loading: ${url}`); 
      }
    )})