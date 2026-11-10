
export enum TokenType{
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

export interface Token{
    type: TokenType;
    value: string[]
}


export function tokenizer(line: string):Token{
    const Tokens: Token[] = [];
    if (line == ""){
        return { type: TokenType.Empty, value: [""] };
    }

    if (line.trim() == "---" || line.trim() == "***" || line.trim() == "___"){
        return {type: TokenType.Seperator, value: [""]}
    }
    else if (line.trim() == "emp"){
        return {type: TokenType.Emptyline, value: [""]}
    }


    let src = line.split(" ");

    if (src[0] == "#"){
        src.shift();
        return { type: TokenType.H1, value: [src.join(" ")] };
    }
    else if (src[0] == "##"){
        src.shift();
        return { type: TokenType.H2, value: [src.join(" ")] };
    }
    else if (src[0] == "###"){
        src.shift();
        return { type: TokenType.H3, value: [src.join(" ")] };
    }
    else if (src[0] == "####"){
        src.shift();
        return { type: TokenType.H4, value: [src.join(" ")] };
    }
    else if (src[0] == "#####"){
        src.shift();
        return { type: TokenType.H5, value: [src.join(" ")] };
    }
    else if (src[0] == "######"){
        src.shift();
        return { type: TokenType.H6, value: [src.join(" ")] };
    }
    else if (src[0] == "!"){
        src.shift();
        const url = src[0]
        src.shift()
        return { type: TokenType.URL, value: [url, src.join(" ")] };
    }
    else if (src[0] == "img"){
        src.shift();
        const url = src[0]
        src.shift()
        return { type: TokenType.Img, value: [url, src.join(" ")] };
    }
    else if (src[0] == "-"){
         src.shift();
        return { type: TokenType.Uoli, value: [src.join(" ")] };

    }
    else{
        return { type: TokenType.Text, value: [line] };
    }


}