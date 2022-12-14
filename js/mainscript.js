/* Start of Main Script */

/* onLoad scripts */
functionOnLoad = () => {
    /*
    createCopyButtonInBody = () => {functionCreateCopyButton("divCopy")};
    createModePresentation = () => {functionCreateElements(arrModeArrival, "divModePresentation")};
    createHistoryPhrases = () => {functionCreateElements(arrHistoryPhrases, "divHistoryPhrases")};
    createExamPhrases = () => {functionCreateElements(arrExamPhrases, "physicalExam")};
    */
    //functionCreateCopyButton("divCopy");
    functionCreateElements(arrModeArrival, "divModePresentation");
    functionCreateElements(arrHistoryPhrases, "divHistoryPhrases");
    functionCreateElements(arrExamPhrases, "physicalExam");
};


/* finish onLoad scripts */


functionCreateCopyButton = (e) => {
    let targetAppend = document.getElementById(e);
    let docFrag = document.createDocumentFragment();
    let createCopyButton = document.createElement("button");
    
    copyFunction = (eventObj) => {
        const clickedEl = eventObj.target;
        const text = clickedEl.innerHTML;
        const blob = new Blob([text], {type: "text/html"});
        const data = [new ClipboardItem({[blob.type]: blob})];
        navigator.clipboard.write(data);
        console.log(clickedEl.innerHTML);
    };

    createCopyButton.addEventListener("click", copyFunction);
    createCopyButton.innerHTML = "<b>this is a test copy button</b>";
    docFrag.appendChild(createCopyButton);
    targetAppend.appendChild(docFrag);
};


copyHistoryPhrases = () => {
    const selectedElement = document.getElementById("historyPhrases");
    const copiedText = selectedElement.innerHTML;
    console.log(copiedText);
    const blob = new Blob([copiedText], {type: "text/html"});
    const data = [new ClipboardItem({[blob.type]: blob})];
    navigator.clipboard.write(data);
};
    
functionCreateElements = (targetArray, targetAppend) => {
    // note that 'i' is counter for targetArray while 'j' is counter for element in array

    let targetToAppend = document.getElementById(targetAppend);

    for (let i = 0; i < targetArray.length; i++) {
        for (let j = 0; j < targetArray[i].elementObj.length; j++) {
            let selectedArr = targetArray[i];
            let selectedArrObj = selectedArr.elementObj[j];
            let docFrag = document.createDocumentFragment();
            let newElement = {};
            let newElementLabel = {};


            const setMultipleAttributes = (selectObj, objAttributes) => {
                for (const index in objAttributes){
                    selectObj.setAttribute(`${index}`, objAttributes[index]);
                }
            }

            function changeButton() {
                let thisButton = this;
                let otherButton = document.querySelector(`button[name="${thisButton.name}"]:not([class="${thisButton.className}"])`);
        
                let selectedTextElement = document.getElementById(selectedArr.headingName);
                let selectedTextStr = selectedTextElement.innerHTML;
                let newReg = new RegExp(selectedArrObj.elementText)
                
        
                /* this function searches the selected textfield for the value and removes it */
                writeToText = (selectValue) => {

                    switch (selectValue) {
                        case "buttonPositive":
                            if(newReg.test(selectedTextStr)) {
                                let oldStrReg = new RegExp("nil " + selectedArrObj.elementText, 'i');
                                let newStr = "has " + selectedArrObj.elementText;
                                let replacedStr = selectedTextStr.replace(oldStrReg, newStr);
                                selectedTextElement.innerHTML = replacedStr;
                            } else selectedTextElement.innerHTML += " has " + selectedArrObj.elementText;
                            break;

                        case "buttonNegative":
                            if (newReg.test(selectedTextStr)){
                                let oldStrReg = new RegExp("has " + selectedArrObj.elementText, 'i');
                                let newStr = "nil " + selectedArrObj.elementText;
                                let replacedStr = selectedTextStr.replace(oldStrReg, newStr);
                                selectedTextElement.innerHTML = replacedStr;
                            } else selectedTextElement.innerHTML += " nil " + selectedArrObj.elementText;
                            break;
                    }
                };
                
                removeFromText = (selectValue) => {
                    switch (selectValue) { 
                        case "buttonPositive": {
                            let oldStrReg = new RegExp ("has " + selectedArrObj.elementText, 'i');
                            let replacedStr = selectedTextStr.replace(oldStrReg, "");
                            selectedTextElement.innerHTML = replacedStr;}
                            break;

                        case "buttonNegative": {
                            let oldStrReg = new RegExp ("nil " + selectedArrObj.elementText, 'i');
                            let replacedStr = selectedTextStr.replace(oldStrReg, "");
                            selectedTextElement.innerHTML = replacedStr;}
                            break;
                    }
                };

                switch (thisButton.value) {
                    case "enabled": thisButton.value = "disabled";
                        removeFromText(thisButton.className);
                    break;
        
                    case "disabled": thisButton.value = "enabled";
                        writeToText(thisButton.className);
                        if (otherButton.value === "enabled") {otherButton.value = "disabled"};
                    break;
                }
            };

            /* this switch allows for checking between different elementObj - currently input/radio and button used so far */
            switch (selectedArr.inputType) {
                case "radio":
                        newElement = document.createElement("input");
                        

                        setMultipleAttributes(newElement,{
                            "value": selectedArrObj.elementText,
                            "type": selectedArr.inputType,
                            "name": selectedArr.headingName,
                            "id": selectedArrObj.elementId
                        })

                        /* old way to setAttribute of an element
                        newElement.setAttribute("value", selectedArrObj.elementText);
                        newElement.setAttribute("type", selectedArr.inputType);
                        newElement.setAttribute("name", selectedArr.headingName);
                        newElement.setAttribute("id", selectedArrObj.elementId);
                        */
                        newElement.addEventListener("click", () => {
                            const radioButtons = document.querySelectorAll(`input[name="${selectedArr.headingName}"]`);
                            for (let selectedButton of radioButtons) {
                                if (selectedButton.checked) {
                                    //var selectedTextElement = document.getElementById(selectedArr.headingName); -- this is superfluous
                                    document.getElementById(selectedArr.headingName).innerText = selectedButton.value;
                                }
                            }
                        });

                        newElementLabel = document.createElement("label");
                        newElementLabel.innerText = selectedArrObj.elementLabel;
                        newElementLabel.setAttribute("for", selectedArrObj.elementId);

                    docFrag.appendChild(newElement);
                    docFrag.appendChild(newElementLabel);


                    break;

                case "button":
                        newElement = document.createElement("button");
                        newElement.setAttribute("name", selectedArr.headingName);
                        newElement.setAttribute("id", selectedArrObj.elementId);
                        newElement.innerText = selectedArrObj.elementText;
                    docFrag.appendChild(newElement);
                    break;
                
                case "dualbutton":
                    newElementLabel = document.createElement("span");
                        newElementLabel.innerHTML = `<strong>${selectedArrObj.elementLabel}:</strong>`;
                    
                    newButton = (sign) => {
                        button = document.createElement("button");
                        let smallSign = () =>{ if (sign.toLowerCase() === "negative"){return "-"} else return "+"};
                        button.setAttribute("name", selectedArrObj.elementId);
                        button.setAttribute("class", `button${sign}`);
                        button.setAttribute("value", "disabled")
                        button.innerText = smallSign();
                        button.addEventListener("click", changeButton);
                        return button;
                    }
                    //let newNegativeElement = newButton("Negative")
                    //let newPositiveElement = newButton("Positive")
                    /* now deprecated!!
                    let newNegativeElement = document.createElement("button");
                        
                        newNegativeElement.setAttribute("name", selectedArrObj.elementId);
                        newNegativeElement.setAttribute("class", "buttonNegative");
                        newNegativeElement.setAttribute("value", "disabled");
                        newNegativeElement.innerText = "-";
                        newNegativeElement.addEventListener("click", changeButton);

                    
                    let newPositiveElement = document.createElement("button");
                        newPositiveElement.setAttribute("name", selectedArrObj.elementId);
                        newPositiveElement.setAttribute("class", "buttonPositive");
                        newPositiveElement.setAttribute("value", "disabled");
                        newPositiveElement.innerText = "+";
                        newPositiveElement.addEventListener("click", changeButton);
*/
                    docFrag.append(newElementLabel, newButton("Negative"), newButton("Positive"));
                    break;
            };
            targetToAppend.appendChild(docFrag);

        };
        
        targetToAppend.appendChild(document.createElement("br"));
    };
}
    
    
