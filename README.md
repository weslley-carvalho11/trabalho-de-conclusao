# Trabalho de conclusão

Esse repositório foi criado para entregar o trabalho de conclusão de duas disciplinas, a primeira foi **Programação para Automação de Testes** ministrada pelo [Júlio de Lima](https://github.com/juliodelimas), a segunda foi **Integração Contínua para Automação de Testes de Integração Continua** ministrada pelo [Goku (João Vitor)](https://github.com/QAkarotto). Objetivo desse arquivo README.md é explicar o funcionamento da pipline e os conceitos aplicados. 

## Detalhamento
```
name: 'Trabalho de conclusão - Integração Continua'
```
Primeiro de tudo definimos o nome da nossa pipeline. Esse nome será exibido na aba de "Actions" no canto esquerdo da tela ou quando o mesmo for execultado manualmente ou execução manual.

```
on: 
  workflow_dispatch:
  push:
    branches:
      - main
  schedule:
    - cron: '30 21 * * *'
```
Foram configuradas na pipeline três formas de disparos, sendo elas: Manual, Agendado e a partir de um push. 
O gatilho de "workflow_dispatch: permite que executemos os testes manualmente dentro do GitHub Actions. 
Já o gatilho "push:" vai rodar os testes toda vez que comando push for execultado dentro do projeto, além disso, configuramos em qual branch ele irá rodar nesse será na main. Por último, temos o "schedule:" que nos permite agendar uma execução da pipeline em período especifico, conseguimos definir o minuto, hora, dia do mês, mês e dia da semana. Essa pipeline foi agendada para rodar todo dia no minuto 30 das 18 horas, foi colocado o número 21 na configuração, pois o GitHub usa o horário UTC (Tempo Universal Coordenado), afim de rodar ás 18h30 adicionamos 3 horas para UTC: 18h30 (UTC-3) + 3h = 21h30 (UTC).

```
jobs:
  teste-unitario:`
      runs-on: ubuntu-latest
      steps: 
```
O "jobs:" são todos os trabalhos que a pipeline precisa executar, já o "teste-unitario:" é o nome de um desses trabalhos. No caso dessa pipeline, o trabalho será execultar os testes unitários existes no projeto. O "runs-on" define que os testes serão executados em uma máquina virtual com a última versão do sistema operacional Ubuntu. E por último temos o "steps:", que será ações desse trabalho. 

```
- uses: actions/checkout@v4
```
Realiza a cópia do código do projeto na máquina virtual onde o GitHub está rodando o workflow. 

```
      - uses: actions/setup-node@v4
        with: 
          node-version: 24.x
```
Realiza o download da versão 24 do Node.js na máquina virtual para podermos execultar arquivos em JavaScript. 

```
      - name: Instalando Dependências
        run: npm i -g
```
Realiza o download das dependências que estão listadas no arquivo package-lock.json do projeto.

```
      - name: Instalando o Mocha
        run: npm i mocha
```
Realiza do download do Mocha nosso framework usado para realizar os testes unitários. 

```
      - name: Instalar Mochawesome
        run: npm i mochawesome

```
Realiza a instalação do Mochawesome usado para criar nosso relatórios de testes. 

```
      - name: Execultar e reportar
        run: npx mocha --reporter mochawesome
```
Execulta todos os testes construídos com o framework do Mocha, além de habilitar o relatório do Mochawesome.

```
      - name: Salvando relatórios
        uses: actions/upload-artifact@v4
        if: ${{ always() }}
        with:
          path: ./mochawesome-report
          name: Relatório de Testes Unitários
```
Configura quando o relatório será gerado, a pasta que o relatório será armazenado, e o nome do relatório. 

## Conceitos aplicados
- Nos commits foram pequenos, frequentes e semânticos, além disso, foi usado um padrão de estrutura de "pré-fixos" de commits como o "fix:" e o "ci:";
- Temos um feedback rápido na execução da pipeline, uma cobertura de 100% das funções do projeto e uma taxa de sucesso de 100% também;
- Foi usado o trigger de push, manual dispatch e schedule;
- O NPM foi usada como a ferramenta de controle de versionamento das dependências;
