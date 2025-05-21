
console.log("Hello World 101");
// document.getElementById("htmlText").value = "1000000";
require.config({
    paths: { 'vs': document.getElementById("editorLocationId123").innerHTML }
});
var editor123
var editorDiv



$(document).tooltip('destroy');
temp = {};
logger = [];
var recsReturns = {};
var sqlReturns = {};
sqlReturns.f = [];
sqlReturns.e = [];
sqlReturns.g = [];
sqlReturns.d = [];






function createDummy() {
    dummyInvisbleContainer = document.createElement("div");
    dummyInvisbleContainer.id = "dummyInvisbleContainer";
    dummyInvisbleContainer.style.display = "none";
    dummyConatiner = document.createElement("div");
    dummyConatiner.id = "dummyContainer";
    dummyConatiner.style.display = "none";
    dummyPager = document.createElement("div");
    dummyPager.id = "dummyPager";
    dummyPager.style.display = "none";
    document.body.appendChild(dummyInvisbleContainer);
    dummyInvisbleContainer.appendChild(dummyConatiner);
    dummyInvisbleContainer.appendChild(dummyPager);
}


function executeSQL(query, pageSize1 = 15) {
    if (!$("#dummyContainer").length) {
        createDummy();
    }
    var dataList = [];
    if (query != "") {
        $("#dummyContainer").html("");
        $("#dummyPager").html("").css("display", "none");
        $("#dummyContainer").html('<table id="dummyTable"  style="display:none; "><thead><tr></tr></thead><tbody></tbody></table>');
        var a = {};
        a.INIT = "Y";
        a.SQLQUERY = query;
        dataList = [];
        recsReturns = $("#dummyTable").recsServerPaginatedTable({
            dataUrl: "/sqlwizard/sqlwizardData",
            pageSize: pageSize1,
            rowHover: true,
            rowSelection: false,
            multiRowSelection: false,
            paginatorContainer: $("#dummyPager"),
            sortIconHdrRow: 0,
            sortable: [],
            columnFiltes: [],
            textLimit: [],
            defaultTextLimit: 25,
            showSuccErr: true,
            otherParams: a,
            rowFunction: function (f, e, g, d) {
                dataList.push(d);
                sqlReturns.f.push(f);
                sqlReturns.e.push(e);
                sqlReturns.g.push(g);
                sqlReturns.d.push(d);
                
            }
        })
    }
    $("#dbQuery").focus()
    return dataList;
}



require(['vs/editor/editor.main'], function () {
    targetElement = document.getElementById("dbQuery");
    editorDiv = document.createElement('div');
    editorDiv.style.width = '85%';
    editorDiv.style.height = '200px';
    targetElement.parentNode.replaceChild(editorDiv, targetElement);
    editorDiv.id = targetElement.id;
    editorDiv.style.margin = "0";
    editorDiv.style.top = "10px";

    feedList = executeSQL("SELECT feed_name,data_storage FROM feed_config_tbl ORDER BY mod_datetime DESC LIMIT 1000", 1000);
    reconList = executeSQL("SELECT recon_name FROM recon_config_tbl ORDER BY mod_datetime DESC LIMIT 1000", 1000);
    setTimeout(function () {
        monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: function (model, position) {
                const suggestions = [

                ];
                const line = model.getLineContent(position.lineNumber); 
                const textBeforeCursor = line.substring(0, position.column); 
                const tokensBeforeCursor = textBeforeCursor.split(' ');
                const tokenBeforeCursor = tokensBeforeCursor[tokensBeforeCursor.length-2];
                // Check if the text before the cursor contains the 'FROM' keyword
                if (tokenBeforeCursor!=undefined && ( tokenBeforeCursor.includes('FROM') || tokenBeforeCursor.includes('JOIN') || tokenBeforeCursor.includes('from') || tokenBeforeCursor.includes('join')) ) {
                    feedList.forEach(element => {
                        tokenName = element.feed_name;
                        if (element.data_storage == "GENERIC") {
                            tokenName = "feed$" + tokenName;
                        }
                        suggestions.push({
                            label: tokenName,
                            kind: monaco.languages.CompletionItemKind.Reference,
                            insertText: tokenName,
                            // documentation: 'Specifies the condition to filter data.'
                        })
                    });

                    reconList.forEach(element => {
                        tokenName = "recon$" + element.recon_name;
                        suggestions.push({
                            label: tokenName,
                            kind: monaco.languages.CompletionItemKind.Reference,
                            insertText: tokenName,
                            // documentation: 'Specifies the condition to filter data.'
                        })
                    });
                }

                logger = suggestions;

                return { suggestions: suggestions };
            }
        });
        editor123.focus()
    }, 500);




    editor123 = monaco.editor.create(document.getElementById('dbQuery'), {
        value: targetElement.value,
        language: 'sql',
        theme: 'vs-light',
        lineNumbers: 'on'
    });



    Object.defineProperty(editorDiv, 'value', {
        get() {
            return editor123.getValue();
        },
        set(val) {
            editor123.setValue(val);
        }
    })


    document.getElementById('dbQuery').addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();  
            document.getElementById('executeBtn').click();  
        }
    });
});



