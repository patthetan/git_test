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

            let docFrag = document.createDocumentFragment();
            let newElement = {};
            let newElementLabel = {};


            function changeButton() {
                let thisButton = this;
                let otherButton = document.querySelector(`button[name="${thisButton.name}"]:not([class="${thisButton.className}"])`);
        
                let selectedTextElement = document.getElementById(targetArray[i].headingName);
                let selectedTextStr = selectedTextElement.innerHTML;
                let newReg = new RegExp(targetArray[i].elementObj[j].elementText)
                
        
                /* this function searches the selected textfield for the value and removes it */
                writeToText = (selectValue) => {

                    switch (selectValue) {
                        case "buttonPositive":
                            if(newReg.test(selectedTextStr)) {
                                let oldStrReg = new RegExp("nil " + targetArray[i].elementObj[j].elementText, 'i');
                                let newStr = "has " + targetArray[i].elementObj[j].elementText;
                                let replacedStr = selectedTextStr.replace(oldStrReg, newStr);
                                selectedTextElement.innerHTML = replacedStr;
                            } else selectedTextElement.innerHTML += " has " + targetArray[i].elementObj[j].elementText;
                            break;

                        case "buttonNegative":
                            if (newReg.test(selectedTextStr)){
                                let oldStrReg = new RegExp("has " + targetArray[i].elementObj[j].elementText, 'i');
                                let newStr = "nil " + targetArray[i].elementObj[j].elementText;
                                let replacedStr = selectedTextStr.replace(oldStrReg, newStr);
                                selectedTextElement.innerHTML = replacedStr;
                            } else selectedTextElement.innerHTML += " nil " + targetArray[i].elementObj[j].elementText;
                            break;
                    }
                };
                
                removeFromText = (selectValue) => {
                    switch (selectValue) { 
                        case "buttonPositive": {
                            let oldStrReg = new RegExp ("has " + targetArray[i].elementObj[j].elementText, 'i');
                            let replacedStr = selectedTextStr.replace(oldStrReg, "");
                            selectedTextElement.innerHTML = replacedStr;}
                            break;

                        case "buttonNegative": {
                            let oldStrReg = new RegExp ("nil " + targetArray[i].elementObj[j].elementText, 'i');
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
            switch (targetArray[i].inputType) {
                case "radio":
                        newElement = document.createElement("input");
                        newElementLabel = document.createElement("label");

                        newElement.setAttribute("value", targetArray[i].elementObj[j].elementText);
                        newElement.setAttribute("type", targetArray[i].inputType);
                        newElement.setAttribute("name", targetArray[i].headingName);
                        newElement.setAttribute("id", targetArray[i].elementObj[j].elementId);

                        newElement.addEventListener("click", () => {
                            const radioButtons = document.querySelectorAll(`input[name="${targetArray[i].headingName}"]`);
                            for (let selectedButton of radioButtons) {
                                if (selectedButton.checked) {
                                    //var selectedTextElement = document.getElementById(targetArray[i].headingName); -- this is superfluous
                                    document.getElementById(targetArray[i].headingName).innerText = selectedButton.value;
                                }
                            }
                        });

                        newElementLabel.innerText = targetArray[i].elementObj[j].elementLabel;
                        newElementLabel.setAttribute("for", targetArray[i].elementObj[j].elementId);

                    docFrag.appendChild(newElement);
                    docFrag.appendChild(newElementLabel);


                    break;

                case "button":
                        newElement = document.createElement("button");
                        newElement.setAttribute("name", targetArray[i].headingName);
                        newElement.setAttribute("id", targetArray[i].elementObj[j].elementId);
                        newElement.innerText = targetArray[i].elementObj[j].elementText;
                    docFrag.appendChild(newElement);
                    break;
                
                case "dualButton":
                    newElementLabel = document.createElement("span");
                        newElementLabel.innerHTML = `<strong>${targetArray[i].elementObj[j].elementLabel}:</strong>`;

                    let newNegativeElement = document.createElement("button");
                        
                        newNegativeElement.setAttribute("name", targetArray[i].elementObj[j].elementId);
                        newNegativeElement.setAttribute("class", "buttonNegative");
                        newNegativeElement.setAttribute("value", "disabled");
                        newNegativeElement.innerText = "-";
                        newNegativeElement.addEventListener("click", changeButton);

                    
                    let newPositiveElement = document.createElement("button");
                        newPositiveElement.setAttribute("name", targetArray[i].elementObj[j].elementId);
                        newPositiveElement.setAttribute("class", "buttonPositive");
                        newPositiveElement.setAttribute("value", "disabled");
                        newPositiveElement.innerText = "+";
                        newPositiveElement.addEventListener("click", changeButton);

                    docFrag.append(newNegativeElement, newElementLabel, newPositiveElement);
                    break;
            };
            //newElement.setAttribute("class", "testing2");
            //newElement.setAttribute("name", targetArray[i].headingName);
            //newElement.setAttribute("id", targetArray[i].elementObj[j].elementId);
            //newElement.innerText = targetArray[i].elementObj[j].elementText;

            targetToAppend.appendChild(docFrag);

        };

        let elementBreak = document.createElement("br");
        targetToAppend.appendChild(elementBreak);
    };
}
    
    
