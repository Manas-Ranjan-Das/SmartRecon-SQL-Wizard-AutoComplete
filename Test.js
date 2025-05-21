function fun () {
    // Ensure Monaco is not already injected
    if (document.getElementById('monaco-editor')) {
        return;
    }


    
    console.log("Hello1");

    // Dynamically load Monaco Editor from the extension's local resources
    let monacoScript = document.createElement('script');
    // Use chrome.runtime.getURL() to load Monaco from the extension's local directory
    monacoScript.src = chrome.runtime.getURL('monaco-editor-0.52.2/package/min/vs/loader.js'); // Local path
    monacoScript.onload = function () {
        console.log("Hello2");

        // Wait for Monaco to load
        require.config({ paths: { 'vs': chrome.runtime.getURL('monaco-editor-0.52.2/package/min/vs') } });
        require(['vs/editor/editor.main'], function () {
            // Find the first <textarea> or <div> you want to replace with Monaco
            let targetElement = document.querySelector('#htmlText');

            if (targetElement) {
                // Replace the element with Monaco Editor
                targetElement.style.height = '500px'; // Adjust height
                targetElement.style.width = '100%'; // Adjust width

                // Create a container div to hold the Monaco Editor
                let editorDiv = document.createElement('div');
                editorDiv.id = targetElement.id;
                editorDiv.style.width = '100%';
                editorDiv.style.height = '200px';
                targetElement.parentNode.replaceChild(editorDiv, targetElement);

                console.log("Hello3");

                // Initialize Monaco Editor
                monaco.editor.create(editorDiv, {
                    value: targetElement.value || '',
                    language: 'javascript' // Set the language here (JavaScript by default)
                });
            }
        });
    };

    console.log("Hello4");

    // Append the script to the page
    document.body.appendChild(monacoScript);
}


