import { tokenizer, TokenType } from "./tokenizer";
import type { Token } from "./tokenizer";

export function convertToHTML(line: string): string {

    const token: Token = tokenizer(line);

    switch (token.type) {
        case TokenType.H1:
            return `<h1>${token.value[0]}</h1>`;
        case TokenType.H2:
            return `<h2>${token.value[0]}</h2>`;
        case TokenType.H3:
            return `<h3>${token.value[0]}</h3>`;
        case TokenType.H4:
            return `<h4>${token.value[0]}</h4>`;
        case TokenType.H5:
            return `<h5>${token.value[0]}</h5>`;
        case TokenType.H6:
            return `<h6>${token.value[0]}</h6>`;
        case TokenType.URL:
            return `<a href="${token.value[0]}">${token.value[1]}</a>`;
        case TokenType.Img:
            return `<img src="${token.value[0]}" alt="${token.value[1]}">`;
        case TokenType.Text:
            return `<p>${line}</p>`;
        case TokenType.Seperator:
            return `<hr>`;
        case TokenType.Emptyline:
            return `<br><br>`;
        case TokenType.Uoli:
            return `<ul><li>${token.value[0]}</li></ul>`;
        case TokenType.Oli:
            return `<ol start="${token.value[0]}"><li>${token.value[1]}</li></ol>`;
        case TokenType.Empty:
            return "";
        default:
            throw new Error(`Unknown token type: ${token.type}`);
    }

}