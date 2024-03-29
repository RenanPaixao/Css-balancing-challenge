# Javascript

## Sobre o desafio e linha de pensamento.

Tentando encontrar a forma mais fácil e legível de resolver o problema, sem entrar em vários loops dentro de outros
loops, pensei em ordenar os dois arrays (de css e de customers) com o algortimo de merge sort, que garante a menor
complexidade.
Com isso, eu poderia dividir o array de customers em pedaços, onde cada pedaço seria os clientes atendidos pelo cs.

### Exemplo:

#### Entradas:

```javascript
const css = [
   { id: 1, score: 60 },
   { id: 2, score: 20 },
   { id: 3, score: 95 },
]
```
```javascript
const customers = [
   { id: 1, score: 90 },
   { id: 2, score: 20 },
   { id: 3, score: 70 },
]
```
```javascript
const cssAway = []
```
Ao ordenar os arrays de acordo com os scores, eu teria:

```javascript
const css = [
  { id: 2, score: 20 },
  { id: 1, score: 60 },
  { id: 3, score: 95 },
]
```
  
  ```javascript
const customers = [
  { id: 2, score: 20 },
  { id: 3, score: 70 },
  { id: 1, score: 90 },
]
```

Agora, posso dividir os pedaços sequencialmente de acordo com o score do cs.

> **cs id 2** -> Não tem clientes<br/>
> **cs id 1** -> 1 cliente (slice do array de customers de **0 até 0**)<br/>
> **cs id 3** -> 2 clientes (slice do array de customers de **1 até 2**)

Com isso, facilmente tenho a quantidade de clientes atendidos por cada cs.
Depois, preciso verificar qual cs atendeu mais clientes. Se houver um empate entre 2 ou mais, retorno 0, caso
não, retorno o id normalmente.

O desafio foi bem legal. Me fez pensar em várias formas de resolver.
 
---

## Como rodar os testes

No terminal, execute os comandos:

```bash
cd javascript
yarn
yarn test
```

Ou usando o NPM:

```bash
cd javascript
npm install
npm test
```
