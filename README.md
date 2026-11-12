# **WIP**

# dumb-markdown

- a simple markup language inspired from markdown.
- written is Typescript

## current ststus

- converts various headings, simple text, links to html 


To install dependencies:

```bash
bun install
```

To run:

```bash
bun ./src/index.ts <markdown file > // has to have .md extention
```

With css

```
bun ./src/index.ts <markdown file >  <css Style> // currently we have "light" and "dark"
```

# Reference

```

// headings

# - H1
## - h2
### - h3
#### - h4
##### - h5
###### - h6

// p

any random text

// seperators

---
***
___

// links

[alt text](link)

// images

![alt](path)

// lists

- list data
- more data

1. odered list data
2. another
3) also supports braces

// blankline

emp 

// inline fxx

**text** => bold
==text== => highlighted
*text* => italic
`text` => code
