
export enum TokenType {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    URL,
    Text,
    Seperator,
    Uoli,
    Emptyline,
    Img,
    Empty
}

export interface Token {
    type: TokenType;
    value: string[]
}


export function tokenizer(line: string): Token {
    const Tokens: Token[] = [];
    if (line == "") {
        return { type: TokenType.Empty, value: [""] };
    }

    // one word lines

    if (line.trim() == "---" || line.trim() == "***" || line.trim() == "___") {
        return { type: TokenType.Seperator, value: [""] }
    }
    else if (line.trim() == "emp") {
        return { type: TokenType.Emptyline, value: [""] }
    }


    // first word of the line

    let src = line.trim().split(" ");

    if (src[0] == "#") {
        src.shift();
        return { type: TokenType.H1, value: [src.join(" ")] };
    }
    else if (src[0] == "##") {
        src.shift();
        return { type: TokenType.H2, value: [src.join(" ")] };
    }
    else if (src[0] == "###") {
        src.shift();
        return { type: TokenType.H3, value: [src.join(" ")] };
    }
    else if (src[0] == "####") {
        src.shift();
        return { type: TokenType.H4, value: [src.join(" ")] };
    }
    else if (src[0] == "#####") {
        src.shift();
        return { type: TokenType.H5, value: [src.join(" ")] };
    }
    else if (src[0] == "######") {
        src.shift();
        return { type: TokenType.H6, value: [src.join(" ")] };
    }
    // else if (src[0] == "!"){
    //     src.shift();
    //     const url = src[0]
    //     src.shift()
    //     return { type: TokenType.URL, value: [url, src.join(" ")] };
    // }
    // else if (src[0] == "img"){
    //     src.shift();
    //     const url = src[0]
    //     src.shift()
    //     return { type: TokenType.Img, value: [url, src.join(" ")] };
    // }
    else if (src[0] == "-") {
        src.shift();
        return { type: TokenType.Uoli, value: [src.join(" ")] };
    }



    // full line parsing

    src = line.trim().split("");


    // image parsing

    if (src[0] == "!") {
        
        if (src[src.length - 1] != ")") {

            return { type: TokenType.Text, value: [line] };
        }
        src.shift();
        let link = "";
        let dText = "";
        let roundbrak = [false, false];
        let boxbrack = [false, false];

        if (src[0] == "[") {
            src.shift();
            boxbrack[0] = true;
            while (src[0] != "]" && src.length > 0) {
                dText += src[0];
                src.shift();
            }
            if (src[0] == "]") {
                boxbrack[1] = true;
                src.shift();
            }
            else {
                return { type: TokenType.Text, value: [line] };
            }
        }

        if (src[0] == "(") {
            src.shift();
            roundbrak[0] = true;
            while (src[0] != ")" && src.length > 0) {
                link += src[0];
                src.shift();
            }
            if (src[0] == ")") {
                roundbrak[1] = true;
                src.shift();
            }
            else {
                return { type: TokenType.Text, value: [line] };
            }
        }

        if (roundbrak[0] && roundbrak[1] && boxbrack[0] && boxbrack[1]) {
            return { type: TokenType.Img, value: [link, dText] };
        }
        else {
            return { type: TokenType.Text, value: [line] };
        }
    }

    // link parsing

    if (src[0] == "[" && src[src.length - 1] == ")") {
        let link = "";
        let dText = "";
        let roundbrak = [false, true];
        let boxbrack = [true, false];

        src.shift();
        while (src[0] != "]" && src.length > 0) {
            dText += src[0];
            src.shift();
        }
        if (src[0] == "]") {
            boxbrack[1] = true;
            src.shift();
        }
        else {
            return { type: TokenType.Text, value: [line] };
        }


        if (src[0] == "(") {
            src.shift();
            roundbrak[0] = true;
            while (src[0] != ")" && src.length > 0) {
                link += src[0];
                src.shift();
            }


        }

        if (roundbrak[0] && roundbrak[1] && boxbrack[0] && boxbrack[1]) {
            return { type: TokenType.URL, value: [link, dText] };
        }
        else {
            return { type: TokenType.Text, value: [line] };
        }

    }

    else {
        return { type: TokenType.Text, value: [line] };
    }

}
