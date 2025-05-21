
var loaderScript = document.createElement('script');
loaderScript.src = chrome.runtime.getURL('monaco-editor-0.52.2/package/min/vs/loader.js') ;
loaderScript.onload = function() {
    var initScript = document.createElement('script');
    initScript.src = chrome.runtime.getURL('editorInitiator.js') ; 
    document.body.appendChild(initScript);
};

document.head.appendChild(loaderScript);
var pElement = document.createElement('p');
pElement.id = "editorLocationId123";
pElement.textContent = chrome.runtime.getURL('monaco-editor-0.52.2/package/min/vs') ;
pElement.style.display = 'none';  
document.body.appendChild(pElement);