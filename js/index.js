/** this is a new index script */

class NewElement {
    constructor(category, headingName, headingText, inputType, elements) {
        this.category = category;
        this.headingName = headingName;
        this.headingText = headingText;
        this.inputType = inputType;
        this.elements = elements;


    };

    createElements() {
        let targetCreate = document.getElementById(`${this.category}${this.headingName}Options`);
        let targetChange = document.getElementById(`${this.category}${this.headingName}Textbox`);

        function createText(text) {
            let label = document.createElement("span");
            label.innerText = text;
            return label;
        }

        function fnClick() {
            let thisButton = this;
            let otherButton = document.querySelector(`button[name="${thisButton.name}"]:not([class="${thisButton.className}"])`);

            switch (this.dataset.toggle) {
                case "OFF":
                    thisButton.setAttribute("data-toggle", "ON");
                    if (otherButton.dataset.toggle === "ON") { otherButton.setAttribute("data-toggle", "OFF") };
                    break;
                case "ON":
                    thisButton.setAttribute("data-toggle", "OFF");
                    break;
            };

            //console.log(thisButton.className)
            updateText(this.dataset.text);

            function updateText(valueStr) {
                let x = thisButton.className;
                let prefixValue = "";
                function prefix(e) {
                    switch (e) {
                        case "positive": return "has ";
                        case "negative": return "nil ";
                    }
                };

                let notPrefix = () => { switch (thisButton.className) { case "positive": return "nil "; case "negative": return "has " } };
                let oldStr = targetChange.innerHTML;
                let oldStrReg = new RegExp(prefix + oldStr, "i");

                let newStr = " " + prefix(x) + valueStr;
                let testReg = new RegExp(/(has |nil ) + valueStr/, "i");
                if (testReg.test(oldStr)) { //if oldStr contains the newReg
                    targetChange.innerHTML = targetChange.innerHTML.replace(oldStrReg, newStr);

                } else {
                    targetChange.innerHTML += newStr;
                    console.log(oldStr)
                    //change text if true
                }   //else
            };
        };



        function createButton(insideText, name, text, style, fn, toggle) { //toggle is true/false
            let button = document.createElement("button")
            button.innerText = insideText;
            button.setAttribute("name", name);
            button.setAttribute("class", style);
            button.setAttribute("data-text", text);
            button.addEventListener("click", fn);
            if (toggle) { button.setAttribute("data-toggle", "OFF") };
            return button;
        };

        let frag = document.createDocumentFragment();

        switch (this.inputType) {
            case "dualbutton": {
                /* groupTypes is an array of filtered 'group' from the target Array
                using this map, we use each value to filter the target Array to generate a smaller array which is used to create elements*/

                let groupTypes = this.elements.map((index) => index.group).filter((value, index, self) => self.indexOf(value) === index);
                groupTypes.forEach(element => {
                    let tempArr = this.elements.filter((value, index, self) => self[index].group === element);
                    for (const i in tempArr) {
                        frag.append(
                            createText(tempArr[i].text),
                            createButton("-", tempArr[i].label, tempArr[i].text, "negative", fnClick, true),
                            createButton("+", tempArr[i].label, tempArr[i].text, "positive", fnClick, true));
                        targetCreate.appendChild(frag);
                    };
                    targetCreate.appendChild(document.createElement("br"));
                });
            }; break;

            case "radio": {


            }; break;

        }
    }
};

const objSysReview = new NewElement(arrHxReview[0].category, arrHxReview[0].headingName, arrHxReview[0].headingText, arrHxReview[0].inputType, arrHxReview[0].elements);
objSysReview.createElements();