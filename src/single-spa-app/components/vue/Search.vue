<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Semantic Search 
        </h1>



      <div id="search" class="search">

<div id="loading-icon-search" v-if="loading">
<v-progress-circular :indeterminate="loading" :value="0" size="24" class="ml-2"></v-progress-circular>
</div>



    <br><br>

                <select name="classes" id="classes" @input="classeOption($event)">
                  <option disabled selected class="disabled-option">Procurar artigos que mencionem...</option>
                  <option v-for="(classe, index) in classes" :key="index" :value="classe.id">{{classe.text}}</option>
                </select>

                <span v-if="subclasses">
                <br>
                <select name="subclasses" id="subclasses" @input="subclassOption($event)">
                  <option disabled selected class="disabled-option">Filtrar {{activeClasse.text}} que mencionem...</option>
                  <option v-for="(classe, index) in subclassesFilter" :key="index" :value="classe.row">{{classe.row.charAt(0).toUpperCase() + classe.row.slice(1)}}</option>
                </select>
              </span>

               <span v-if="activeSubclasses">
                <br>
                <select name="subclasses3" id="subclasses3" @input="filtroOption($event)">
                  <option disabled selected class="disabled-option">Filtrar resultados por...</option>
                   <option v-for="(filter, index) in filters" :key="index" :value="filter.value">{{filter.text}}</option>
                </select>
              </span>
                
                <span v-if="filter">
                <br>
                <input v-model="inputFilter" id="searchInput" type="text" placeholder="Search..." v-on:keyup.enter="inputOption">
                <button type="button" @click="inputOption()"><i class="fa fa-search"></i></button>
              </span>


<div v-if="loading">
<br>
<v-progress-circular :indeterminate="loading" :value="0" size="24" class="ml-2"></v-progress-circular>
<span style="color:gray;"> Wait please, loading data...</span>
</div>

      </div>
    </v-col>
    </v-row>


    <v-row class="text-center" v-if="tableCount>0">
      <v-col class="mb-4">
      <h2>Resultados: {{tableCount}}</h2>
      <br>
      <v-btn color="primary" @click="download()">Download</v-btn>
      <p style="color:gray:font-size:10px;text-align:center;margin-top:25px;">*Versão web limitada a {{ limit }} resultados - efetue download para dataset completo</p>
      </v-col>
    </v-row>

    <br>
  <v-card v-if="table">
    <v-card-title>
        Dados
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="hdados"
      :items="table"
      class="elevation-1"
      :search="search"
      :footer-props="{'items-per-page-options':[25, 50, 100, 200, 500, -1], 'items-per-page-text':'Resultados por página:'}"
      :items-per-page="10"
      :loading="loading"
    >

  
    <template v-slot:item.sourceUrl="row">
    <b><a :set='id = row.item.sourceUrl' :href="row.item.sourceUrl" target="_blank">
     OPEN
    </a></b>
  </template>

  <template v-slot:item.link="row">
    <b><a :href=row.item.link target="_blank">
     URL ORIGINAL
    </a></b>
  </template>

    </v-data-table>
  </v-card>

  <br>

    <v-row class="text-center">
      <v-col class="mb-4">
      <blockquote id="search-note">For SPARQL queries go to <a href="http://localhost:3888" target="_blank">API</a>.</blockquote>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios'

//let querystring = require('querystring');

//const lhost = require("@/config/global").lhost;
//const graphdb = require("@/config/global").graphdb;
//const flaskSparql = require("@/config/global").flaskSparql + '?output=json&external=true';
//const flaskDownload = require("@/config/global").flaskDownload + '?output=csv';

const graph = "http://localhost:3888/sparql"
const uri = "http://sparql.entigraph.di.pt/corpus"

  export default {
    name: 'Search',

  /*devServer: {
        proxy: 'http://127.0.0.1:8080/',
    },*/

  /*rules: {
    'no-unused-vars': 'off'
  },*/

    data: () => ({

    search: '',
      
    hdados: [
      /*{
        text: 'Título',
        align: 'start',
        sortable: false,
        value: 'row',
      },
      { text: 'Data', value: 'row' },
      { text: 'Texto', value: 'row' },*/
      //{ text: 'Data', sortable: true, value: 'timestamp' },
      { text: 'URL', value: 'sourceUrl' },
      { text: 'ID', value: 'id' },
      { text: 'User', value: 'user' },
      { text: 'Year', value: 'timestamp' },
      //{ text: 'Minoria', sortable: true, value: 'minority' },
      //{ text: 'Título', value: 'title' },
      {text: 'Sentiment', value: 'sentimentAnalysis'},
      { text: 'Text', value: 'text' },
    ],

    classes: [
      {'text': 'Minorias', 'id': 'minority', 'subclasses': ['Minority','minority']},
      {'text': 'Pessoas', 'id': 'personName', 'subclasses': ['Person', 'personName']},
      {'text': 'Palavras-chave', 'id': 'keyword', 'subclasses': ['Keyword','keyword']},
      {'text': 'Partidos', 'id': 'politicalParty', 'subclasses': ['PoliticalParty', 'politicalParty']},
      {'text': 'Animais', 'id': 'animal', 'subclasses': ['Animal', 'animal']},
      {'text': 'Etnias', 'id': 'ethnicity', 'subclasses': ['Ethnicity', 'ethnicity']},
      {'text': 'Religiões', 'id': 'religion', 'subclasses': ['Religion', 'religion']},
      {'text': 'Cidades', 'id': 'city', 'subclasses': ['City', 'city']},
      {'text': 'Países', 'id': 'country', 'subclasses': ['Country', 'country']},
      {'text': 'Continentes', 'id': 'continent', 'subclasses': ['Continent', 'continent']},
      {'text': 'Outros Lugares', 'id': 'otherPlace', 'subclasses': ['OtherPlace', 'otherPlace']},
      {'text': 'Dias da Semana', 'id': 'weekday', 'subclasses': ['Weekday', 'weekday']},
      {'text': 'Meses', 'id': 'month', 'subclasses': ['Month', 'month']},
      {'text': 'Entidades', 'id': 'entity', 'subclasses': ['Entity', 'entity']},
      {'text': 'Clubes de Futebol', 'id': 'footbal', 'subclasses': ['Football', 'footbal']},
      {'text': 'Desportos', 'id': 'sport', 'subclasses': ['Sport', 'sport']},
      {'text': 'Tags do Jornal', 'id': 'tag', 'subclasses': ['Tag','tag']},
      {'text': 'Marcas de Produtos', 'id': 'brand', 'subclasses': ['Brand','brand']}, 
      {'text': 'Canais de TV', 'id': 'tvChannel', 'subclasses': ['TvChannel','tvChannel']},
      {'text': 'Marcas de Carros', 'id': 'carBrand', 'subclasses': ['CarBrand','carBrand']}, 
      {'text': 'Desportos', 'id': 'sport', 'subclasses': ['Sport','sport']},

    ],

    filters: [
      {'text': 'Ano de publicação maior do que...', 'value': 'dataMaior'},
      {'text': 'Ano de publicação menor do que...', 'value': 'dataMenor'},
      {'text': 'Ano de publicação igual a...', 'value': 'dataIgual'},
      {'text': 'Minoria igual a...', 'value': 'minoriaIgual'},
      {'text': 'Contém palavra igual a...', 'value': 'keywordIgual'},
    ],

    activeClasse: null,

    subclasses: null,

    activeSubclasses: null,

    subclasses3: null,

    table: null,

    tableCount: null,

    loading: false,

    filter: null,

    inputFilter: null,

    limit: '5000',

    query: null,

    db: 'hiperfolio',

    articlePage: 'http://minors.ilch.uminho.pt/articles',


    }),

    computed: {
      subclassesFilter: function () {
        return this.subclasses.filter(classe => !['311', '112', '1980s', '1981', '702', '99'].includes(classe.row))
      },

      metadados: function() {      
        let link = '';
        if(this.db=='indiferenciado') {
            link = this.articlePage+'?db=indiferenciado&id=';
        }
        else {
            link = this.articlePage+'?id=';
        }
        return link;
      }
    },

  mounted () {
  //  alert(this.selected_classe)
  //  this.selected_classe = this.classes[0].text;
  },

  created: async function(){
    try {
      //let response = await axios.get(lhost + "/api/passadeiras");
      //this.crosswalks = response.data

    } 
    catch (e) {
      return e;
    }
    //this.timer = setInterval(this.updateData, 1000)
  },

  methods: {

    classeOption(event) {
      let id = event.target.value;
      let row = this.findObject(this.classes, "id", id);
      this.activeClasse = row;
      let query = `
PREFIX : <`+uri+`#>
SELECT DISTINCT ?row WHERE {
  ?article a :` + row.subclasses[0] + ` .
  ?article :` + row.subclasses[1] + ` ?row .
}
ORDER BY ?row
      `;

      this.loading = true;
      this.subclasses = null;
      this.activeSubclasses = null;
      this.filter = null;
      this.inputFilter = null;
      this.queryClasse(query, row);
      this.tableQuery(row.subclasses[0], row.subclasses[1], '', '');
      //this.queryClasse(query, row)

      //this.newSubClasse(query, row);

      //this.teste(row);
    },

    subclassOption(event) {
      this.loading = true;
      this.activeSubclasses = null;
      this.filter = null;
      this.inputFilter = null;
      this.activeSubclasses = event.target.value;
      this.tableQuery(this.activeClasse.subclasses[0], this.activeClasse.subclasses[1], this.activeSubclasses, '');
    },

    filtroOption(event) {
      this.filter = event.target.value;
      this.inputFilter = null;
    },

    inputOption() {
      this.loading = true;
      let filter = '';
      if(this.filter == 'dataMaior') {
        filter = `
        FILTER(YEAR(?dataPub) >= ` + this.inputFilter + `) .`
      }
      else if(this.filter == 'dataMenor') {
        filter = `
        FILTER(YEAR(?dataPub) <= ` + this.inputFilter + `) .`
      }
      else if(this.filter == 'dataIgual') {
        filter = `
        FILTER(YEAR(?dataPub) = ` + this.inputFilter + `) .`
      }
      else if(this.filter == 'minoriaIgual') {
        filter = `
        ?article :referesMinority ?Minority .
        ?Minority :minority ?minority .
        FILTER (CONTAINS(?minority , "` + this.inputFilter.toLowerCase() + `")) .`
      }
      else if(this.filter == 'keywordIgual') {
        filter = `
        FILTER (CONTAINS(?text , "` + this.inputFilter.toLowerCase() + `")) .`
      }
      
      if (filter!='') {
        this.tableQuery(this.activeClasse.subclasses[0], this.activeClasse.subclasses[1], this.activeSubclasses, filter);
      }
      //alert(this.filter)
      //alert(this.inputFilter)
    },

    queryClasse(sparql, row) {
      this.query = encodeURIComponent(sparql);
      let url = graph+this.query;
      var _this = this;
    /*axios.post(flaskSparql, {
                    query: 'this.sparql',
                    description: 'uuuu'
                })*/
            axios({
            method: 'GET',
            url: url,
            headers: {
              "Accept":"application/json", 
              //"Content-Type":"application/x-www-form-urlencoded"
              //"Content-Length": sparql.length
            },
            //data: {query: sparql}
            })
            .then(function (response) {

                let data = response.data;

                _this.newSubClasse(data, row);
            })
            .catch(function (error) {
                console.log(error)
                //alert(error)
            })
    },

    // eslint-disable-next-line no-unused-vars
    newSubClasse(data, row) {


      //let subclasses = this.findObject(this.classes, "id", id);
      /*let form = `
          <select name="subclasses" id="subclasses">
            <option disabled selected class="disabled-option">Filtrar ` + row.text + ` que mencionem...</option>
            `
      form = form + `
          </select>
      `*/

      //let cleaned = this.myNormalize(JSON.parse(data))
      let cleaned = data; 

      //console.log(this.myNormalize(data))

      this.subclasses = cleaned;
      //document.getElementById("search").appendChild(form); 
      //alert(subclasses.subclasses[1]);


    },

  findObject(obj, key, value) {
    return obj.find(function(v){ return v[key] === value});
  },

  myNormalize(r) {
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
                novo[k] = v.value
          }
          //novo.sort((a, b) => (a.row > b.row) ? 1 : -1)
        return novo
    })
  },

  normalizeArray(r) {
    return r.results.bindings.map(o => {
        var novo = []
        // eslint-disable-next-line no-unused-vars
        for (let [k, v] of Object.entries(o)) {
            novo.push(v.value)
          }
        return novo  
    })
  },


  tableQuery(classe1, classe2, subclass, filter) {
    this.tableCounter(classe1, classe2, subclass, filter);

    let sparql = `
PREFIX : <`+uri+`#>
SELECT DISTINCT ?text (SAMPLE(?article) AS ?article) (SAMPLE(?timestamp) AS ?timestamp) (SAMPLE(?id) AS ?id) (SAMPLE(?user) AS ?user) (SAMPLE(?sentimentAnalysis) AS ?sentimentAnalysis) (SAMPLE(?sourceUrl) AS ?sourceUrl) WHERE {
  ?article a :Article .
  ?article :timestamp ?timestamp .
  ?article :text ?text .
  ?article :id ?id .
  ?article :user ?user .
  ?article :sourceUrl ?sourceUrl .
  ?article :sentimentAnalysis ?sentimentAnalysis .
  `
  if(subclass!='') {
    sparql = sparql + `
    ?article :referes`+classe1+` ?subclass .
    ?subclass :`+classe2+` "`+subclass+`" .`
  }
  else {
    sparql = sparql + `
    ?article :referes`+classe1+` ?classe .`
  }
  if(filter!='') {
    sparql = sparql + filter
  }

   sparql = sparql + `
}
GROUP BY ?text
LIMIT ` + this.limit + `
    `

    this.query = encodeURIComponent(sparql);
    //this.query = sparql;
    var _this = this;

    axios({
    method: 'GET',
    url: graph+this.query,
    headers: {
      "Accept":"application/json", 
      //"Accept":"text/csv", 
      //"Content-Type":"application/x-www-form-urlencoded"
      //'Content-Length': sparql.length
    },  
    //data: querystring.stringify({query: sparql})
    data: {query: sparql}
    })
    .then(function (response) {
        let data = response.data;
        _this.setTable(data);
    })
    .catch(function (error) {
        console.log(error)
    })

  },

tableCounter(classe1, classe2, subclass, filter) {
      let sparql = `
PREFIX : <`+uri+`#>
SELECT (COUNT(DISTINCT ?text) as ?count) WHERE {
  ?article a :Article .
  ?article :timestamp ?timestamp .
  ?article :text ?text .
  ?article :sourceUrl ?sourceUrl .
  #?article :text ?text .
  `
  if(subclass!='') {
    sparql = sparql + `
    ?article :referes`+classe1+` ?subclass .
    ?subclass :`+classe2+` "`+subclass+`" .`
  }
  else {
    sparql = sparql + `
    ?article :referes`+classe1+` ?classe .`
  }
  if(filter!='') {
    sparql = sparql + filter
  }

   sparql = sparql + `
}
#GROUP BY ?text
    `
    this.query = encodeURIComponent(sparql);
    var _this = this;

    axios({
    method: 'GET',
    url: graph+this.query,
    headers: {
      "Accept":"application/json", 
      //"Accept":"text/csv", 
      //"Content-Type":"application/x-www-form-urlencoded"
      //'Content-Length': sparql.length
    }, 
    //data: {query: sparql}
    })
    .then(function (response) {
        let data = response.data;
        _this.setCountTable(data);
    })
    .catch(function (error) {
        console.log(error)
    })
},

  setTable(data) {
    //this.table = this.myNormalize(JSON.parse(data));
    this.table = data;
    this.loading = false;
  },

  setCountTable(data) {
    //this.tableCount = JSON.parse(data).results.bindings[0].count.value;
    this.tableCount = data[0].count.value;
  },

  download() {
    var _this = this;
    axios({
    method: 'GET',
    url: graph+this.query,
    headers: {
      "Accept":"application/json", 
      //"Accept":"text/csv", 
      //"Content-Type":"application/x-www-form-urlencoded"
      //'Content-Length': this.query.length
    }, 
    //data: {query: this.query}
    })
    .then(function (response) {
        //let data = response.data;
        //_this.setCountTable(data);
        //response.data.pipe(fs.createWriteStream("todays_picture.csv"));
        _this.forceFileDownload(response);
    })
    .catch(function (error) {
        console.log(error)
    })

  },

    forceFileDownload(response){
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'data.json') //or any other extension
      document.body.appendChild(link)
      link.click()
    },


}
}
</script>
