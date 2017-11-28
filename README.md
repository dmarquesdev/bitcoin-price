# Quanto custa o Bitcoin?

Projeto PoC para a disciplina INE5653 - Introdução à Internacionalização e Localização de Software da UFSC no semestre 17.2

A finalidade deste projeto é demonstrar como internacionalizar um software, e para isso foi implementada uma aplicação que consulta o preço do Bitcoin e mostra em algumas outras moedas.

A aplicação foi desenvolvida utilizando uma stack de [React](https://reactjs.org/) e sua biblioteca voltada para i18n [react-intl](https://github.com/yahoo/react-intl)

Os dados que são apresentados na aplicação são consumidos da API da [CryptoCompare](https://www.cryptocompare.com/api/), sendo esta aplicação apenas um Front-end para a mesma.

# Versões
A versão antes do processo de internacionalização se encontra no branch `master`, enquanto a versão internacionalizada se encontra no branch `i18n`

## Dependências
- NodeJS
- NPM

## Instalação
```sh
cd bitcoin-price
npm i
```

## Execução
- Modo development, não seguro para produção!!!
```sh
npm run dev
```

## Acesso
http://localhost:3000

## Autores
[Diego Marques](https://github.com/dmarquesdev)
[Laura Kácser](https://github.com/ltkacser)