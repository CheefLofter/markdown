

let test = "start **bold** plain *italic* plain ==mark== plain `code` plain **bold text** plain *italic text* plain ==mark text== plain `code text` plain **bold** *italic* ==mark== `code` plain";

export function fxTokenizer(text: string): string {

    let src = text.trim().split("");
    let fHTML = "";


    src.unshift(" "); // add a space at the beginning to avoid index out of bounds error
    while (src.length > 0) {


        let boldElement = ""; // <b></b> **text**
        let italicElement = ""; // <i></i> *text*
        let codeElement = ""; // <code></code> `text`
        let markElement = ""; // <mark></mark>  ==text==

        if (src[0] == " " && src[1] == "*" && src[2] == "*") {
            fHTML += src.shift();
            src.shift();
            src.shift();
            while (src.length > 0 && !(src[0] === "*" && src[1] === "*")) {
                boldElement += src[0];
                src.shift();
            }
            if (src[0] == "*" && src[1] == "*" && src[2] == " ") {
                src.shift();
                src.shift();

                fHTML += `<b>${boldElement}</b>`;
            }
            else {
                
                fHTML += "**" + boldElement;
            }
        }




        else if (src[0] == " " && src[1] == "*") {
            fHTML += src.shift();
            src.shift();
            while (src.length > 0 && src[0] != "*") {
                italicElement += src[0];
                src.shift();
            }
            if (src[0] == "*" && src[1] == " ") {
                src.shift();

                fHTML += `<i>${italicElement}</i>`;
            }
            else {
                fHTML += "*" + italicElement;
            }
        }




        else if (src[0] == " " && src[1] == "`") {
            fHTML += src.shift();
            src.shift();
            while (src.length > 0 && src[0] != "`") {
                codeElement += src[0];
                src.shift();
            }
            if (src[0] == "`" && src[1] == " ") {
                src.shift();

                fHTML += `<code>${codeElement}</code>`;
            }
            else {
                fHTML += "`" + codeElement;
            }
        }



        else if (src[0] == " " && src[1] == "=" && src[2] == "=") {
            fHTML += src.shift();
            src.shift();
            src.shift();
            while (src.length > 0 && !(src[0] === "=" && src[1] === "=")) {
                markElement += src[0];
                src.shift();
            }
            if (src[0] == "=" && src[1] == "=" && src[2] == " ") {
                src.shift();
                src.shift();

                fHTML += `<mark>${markElement}</mark>`;
            }
            else {
                fHTML += "==" + markElement;
            }
        }
        


        else {
            fHTML += src.shift();
        }
    }
    return fHTML;
}



console.log(fxTokenizer(test));