(function(t){function e(e){for(var a,i,l=e[0],o=e[1],c=e[2],d=0,p=[];d<l.length;d++)i=l[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(t[a]=o[a]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,c||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],a=!0,l=1;l<s.length;l++){var o=s[l];0!==n[o]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=s[0]))}return t}var a={},n={app:0},r=[];function i(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=a,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=o;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",[s("v-content",[s("Search")],1)],1)},r=[],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-row",{staticClass:"text-center"},[s("v-col",{staticClass:"mb-4"},[s("h1",{staticClass:"display-2 font-weight-bold mb-3"},[t._v(" Semantic Search ")]),s("div",{staticClass:"search",attrs:{id:"search"}},[t.loading?s("div",{attrs:{id:"loading-icon-search"}},[s("v-progress-circular",{staticClass:"ml-2",attrs:{indeterminate:t.loading,value:0,size:"24"}})],1):t._e(),s("br"),s("br"),s("select",{attrs:{name:"classes",id:"classes"},on:{input:function(e){return t.classeOption(e)}}},[s("option",{staticClass:"disabled-option",attrs:{disabled:"",selected:""}},[t._v("Procurar artigos que mencionem...")]),t._l(t.classes,(function(e,a){return s("option",{key:a,domProps:{value:e.id}},[t._v(t._s(e.text))])}))],2),t.subclasses?s("span",[s("br"),s("select",{attrs:{name:"subclasses",id:"subclasses"},on:{input:function(e){return t.subclassOption(e)}}},[s("option",{staticClass:"disabled-option",attrs:{disabled:"",selected:""}},[t._v("Filtrar "+t._s(t.activeClasse.text)+" que mencionem...")]),t._l(t.subclassesFilter,(function(e,a){return s("option",{key:a,domProps:{value:e.row}},[t._v(t._s(e.row.charAt(0).toUpperCase()+e.row.slice(1)))])}))],2)]):t._e(),t.activeSubclasses?s("span",[s("br"),s("select",{attrs:{name:"subclasses3",id:"subclasses3"},on:{input:function(e){return t.filtroOption(e)}}},[s("option",{staticClass:"disabled-option",attrs:{disabled:"",selected:""}},[t._v("Filtrar resultados por...")]),t._l(t.filters,(function(e,a){return s("option",{key:a,domProps:{value:e.value}},[t._v(t._s(e.text))])}))],2)]):t._e(),t.filter?s("span",[s("br"),s("input",{directives:[{name:"model",rawName:"v-model",value:t.inputFilter,expression:"inputFilter"}],attrs:{id:"searchInput",type:"text",placeholder:"Search..."},domProps:{value:t.inputFilter},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.inputOption(e)},input:function(e){e.target.composing||(t.inputFilter=e.target.value)}}}),s("button",{attrs:{type:"button"},on:{click:function(e){return t.inputOption()}}},[s("i",{staticClass:"fa fa-search"})])]):t._e(),t.loading?s("div",[s("br"),s("v-progress-circular",{staticClass:"ml-2",attrs:{indeterminate:t.loading,value:0,size:"24"}}),s("span",{staticStyle:{color:"gray"}},[t._v(" Wait please, loading data...")])],1):t._e()])])],1),t.tableCount>0?s("v-row",{staticClass:"text-center"},[s("v-col",{staticClass:"mb-4"},[s("h2",[t._v("Resultados: "+t._s(t.tableCount))]),s("br"),s("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.download()}}},[t._v("Download")]),s("p",{staticStyle:{color:"gray:font-size:10px","text-align":"center","margin-top":"25px"}},[t._v("*Versão web limitada a "+t._s(t.limit)+" resultados - efetue download para dataset completo")])],1)],1):t._e(),s("br"),t.tableCount>0?s("v-card",[s("v-card-title",[t._v(" Dados "),s("v-spacer"),s("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),s("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.hdados,items:t.table,search:t.search,"footer-props":{"items-per-page-options":[25,50,100,200,500,-1],"items-per-page-text":"Resultados por página:"},"items-per-page":10,loading:t.loading},scopedSlots:t._u([{key:"item.sourceUrl",fn:function(e){return[s("b",[s("a",{attrs:{set:t.id=e.item.sourceUrl,href:e.item.sourceUrl,target:"_blank"}},[t._v(" OPEN ")])])]}},{key:"item.link",fn:function(e){return[s("b",[s("a",{attrs:{href:e.item.link,target:"_blank"}},[t._v(" URL ORIGINAL ")])])]}}],null,!1,3707964962)})],1):t._e(),s("br"),s("v-row",{staticClass:"text-center"},[s("v-col",{staticClass:"mb-4"},[s("blockquote",{attrs:{id:"search-note"}},[t._v("For SPARQL queries go to "),s("a",{attrs:{href:"http://localhost:3888",target:"_blank"}},[t._v("API")]),t._v(".")])])],1)],1)},l=[],o=(s("4de4"),s("7db0"),s("caad"),s("d81d"),s("4fad"),s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d"),s("3835")),c=(s("96cf"),s("1da1")),u=s("bc3a"),d=s.n(u),p=s("cdd9").graph+"?q=",h=s("cdd9").uri,b={name:"Search",data:function(){return{search:"",hdados:[{text:"URL",value:"sourceUrl"},{text:"User",value:"userName"},{text:"Date",value:"dateCreated"},{text:"Type",value:"typePost"},{text:"Sentiment",value:"sentimentAnalysis"},{text:"Text",value:"text"}],classes:[{text:"Animais",id:"animal",subclasses:["Animal","animal"]},{text:"Pessoas",id:"personName",subclasses:["Person","personName"]},{text:"Palavras-chave",id:"keyword",subclasses:["Keyword","keyword"]},{text:"Partidos",id:"politicalParty",subclasses:["PoliticalParty","politicalParty"]},{text:"Cidades",id:"city",subclasses:["City","city"]},{text:"Países",id:"country",subclasses:["Country","country"]},{text:"Continentes",id:"continent",subclasses:["Continent","continent"]},{text:"Outros Lugares",id:"otherPlace",subclasses:["OtherPlace","otherPlace"]},{text:"Dias da Semana",id:"weekday",subclasses:["Weekday","weekday"]},{text:"Meses",id:"month",subclasses:["Month","month"]},{text:"Entidades",id:"entity",subclasses:["Entity","entity"]},{text:"Clubes de Futebol",id:"footbal",subclasses:["Football","footbal"]},{text:"Desportos",id:"sport",subclasses:["Sport","sport"]},{text:"Tags do Jornal",id:"tag",subclasses:["Tag","tag"]},{text:"Marcas de Produtos",id:"brand",subclasses:["Brand","brand"]},{text:"Canais de TV",id:"tvChannel",subclasses:["TvChannel","tvChannel"]},{text:"Marcas de Carros",id:"carBrand",subclasses:["CarBrand","carBrand"]},{text:"Desportos",id:"sport",subclasses:["Sport","sport"]},{text:"Minorias",id:"minority",subclasses:["Minority","minority"]},{text:"Etnias",id:"ethnicity",subclasses:["Ethnicity","ethnicity"]},{text:"Religiões",id:"religion",subclasses:["Religion","religion"]}],filters:[{text:"Contém palavra igual a...",value:"keywordIgual"}],activeClasse:null,subclasses:null,activeSubclasses:null,subclasses3:null,table:null,tableCount:null,loading:!1,filter:null,inputFilter:null,limit:"5000",query:null,db:"project1",articlePage:"http://minors.ilch.uminho.pt/articles"}},computed:{subclassesFilter:function(){return this.subclasses.filter((function(t){return!["311","112","1980s","1981","702","99"].includes(t.row)}))},metadados:function(){var t="";return t="indiferenciado"==this.db?this.articlePage+"?db=indiferenciado&id=":this.articlePage+"?id=",t}},mounted:function(){},created:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:t.prev=0,t.next=6;break;case 3:return t.prev=3,t.t0=t["catch"](0),t.abrupt("return",t.t0);case 6:case"end":return t.stop()}}),t,null,[[0,3]])})));function e(){return t.apply(this,arguments)}return e}(),methods:{classeOption:function(t){var e=t.target.value,s=this.findObject(this.classes,"id",e);this.activeClasse=s;var a="\nPREFIX : <"+h+"#>\nSELECT DISTINCT ?row WHERE {\n  ?article a :"+s.subclasses[0]+" .\n  ?article :"+s.subclasses[1]+" ?row .\n}\nORDER BY ?row\n      ";this.loading=!0,this.subclasses=null,this.activeSubclasses=null,this.filter=null,this.inputFilter=null,this.queryClasse(a,s),this.tableQuery(s.subclasses[0],s.subclasses[1],"","")},subclassOption:function(t){this.loading=!0,this.activeSubclasses=null,this.filter=null,this.inputFilter=null,this.activeSubclasses=t.target.value,this.tableQuery(this.activeClasse.subclasses[0],this.activeClasse.subclasses[1],this.activeSubclasses,"")},filtroOption:function(t){this.filter=t.target.value,this.inputFilter=null},inputOption:function(){this.loading=!0;var t="";"dataMaior"==this.filter?t="\n        FILTER(YEAR(?dateCreated) >= "+this.inputFilter+") .":"dataMenor"==this.filter?t="\n        FILTER(YEAR(?dateCreated) <= "+this.inputFilter+") .":"dataIgual"==this.filter?t="\n        FILTER( YEAR(?dateCreated) = "+this.inputFilter+") .":"minoriaIgual"==this.filter?t='\n        ?article :referesMinority ?Minority .\n        ?Minority :minority ?minority .\n        FILTER (CONTAINS(?minority , "'+this.inputFilter.toLowerCase()+'")) .':"keywordIgual"==this.filter&&(t='\n        FILTER (CONTAINS(?text , "'+this.inputFilter.toLowerCase()+'")) .'),""!=t&&this.tableQuery(this.activeClasse.subclasses[0],this.activeClasse.subclasses[1],this.activeSubclasses,t)},queryClasse:function(t,e){this.query=encodeURIComponent(t);var s=p+this.query,a=this;d()({method:"GET",url:s,headers:{Accept:"application/json"}}).then((function(t){var s=t.data;a.newSubClasse(s,e)})).catch((function(t){console.log(t)}))},newSubClasse:function(t,e){var s=t;this.subclasses=s},findObject:function(t,e,s){return t.find((function(t){return t[e]===s}))},myNormalize:function(t){return t.results.bindings.map((function(t){for(var e={},s=0,a=Object.entries(t);s<a.length;s++){var n=Object(o["a"])(a[s],2),r=n[0],i=n[1];e[r]=i.value}return e}))},normalizeArray:function(t){return t.results.bindings.map((function(t){for(var e=[],s=0,a=Object.entries(t);s<a.length;s++){var n=Object(o["a"])(a[s],2),r=(n[0],n[1]);e.push(r.value)}return e}))},tableQuery:function(t,e,s,a){this.tableCounter(t,e,s,a);var n="\nPREFIX : <"+h+"#>\nSELECT DISTINCT ?text (SAMPLE(?article) AS ?article) (SAMPLE(?typePost) AS ?typePost) (SAMPLE(?dateCreated) AS ?dateCreated) (SAMPLE(?id) AS ?id) (SAMPLE(?user) AS ?user) (SAMPLE(?sentimentAnalysis) AS ?sentimentAnalysis) (SAMPLE(?sourceUrl) AS ?sourceUrl) (SAMPLE(?userName) AS ?userName) WHERE {\n  ?article a :Article .\n  ?article :dateCreated ?dateCreated .\n  ?article :text ?text .\n  ?article :id ?id .\n  ?article :user ?user .\n  ?article :typePost ?typePost .\n  ?article :sourceUrl ?sourceUrl .\n  ?article :sentimentAnalysis ?sentimentAnalysis .\n  ?article :userName ?userName .\n  ";n=""!=s?n+"\n    ?article :referes"+t+" ?subclass .\n    ?subclass :"+e+' "'+s+'" .':n+"\n    ?article :referes"+t+" ?classe .",""!=a&&(n+=a),n=n+"\n}\nGROUP BY ?text\nLIMIT "+this.limit+"\n    ",this.query=encodeURIComponent(n);var r=this;d()({method:"GET",url:p+this.query,headers:{Accept:"application/json"},data:{query:n}}).then((function(t){var e=t.data;r.setTable(e)})).catch((function(t){console.log(t)}))},tableCounter:function(t,e,s,a){var n="\nPREFIX : <"+h+"#>\nSELECT (COUNT(DISTINCT ?text) as ?count) WHERE {\n  ?article a :Article .\n  #?article :dateCreated ?dateCreated .\n  ?article :text ?text .\n  #?article :sourceUrl ?sourceUrl .\n  ";n=""!=s?n+"\n    ?article :referes"+t+" ?subclass .\n    ?subclass :"+e+' "'+s+'" .':n+"\n    ?article :referes"+t+" ?classe .",""!=a&&(n+=a),n+="\n}\n#GROUP BY ?text\n    ",this.query=encodeURIComponent(n);var r=this;d()({method:"GET",url:p+this.query,headers:{Accept:"application/json"}}).then((function(t){var e=t.data;r.setCountTable(e)})).catch((function(t){console.log(t)}))},setTable:function(t){this.table=t,this.loading=!1},setCountTable:function(t){this.tableCount=t[0].count},download:function(){var t=this;d()({method:"GET",url:p+this.query,headers:{Accept:"application/json"}}).then((function(e){t.forceFileDownload(e)})).catch((function(t){console.log(t)}))},forceFileDownload:function(t){var e=window.URL.createObjectURL(new Blob(JSON.stringify([t.data]))),s=document.createElement("a");s.href=e,s.setAttribute("download","data.json"),document.body.appendChild(s),s.click()}}},f=b,v=s("2877"),m=s("6544"),y=s.n(m),g=s("8336"),C=s("b0af"),x=s("99d9"),S=s("62ad"),w=s("a523"),P=s("8fea"),_=s("490a"),E=s("0fd9"),A=s("2fa4"),O=s("8654"),T=Object(v["a"])(f,i,l,!1,null,null,null),k=T.exports;y()(T,{VBtn:g["a"],VCard:C["a"],VCardTitle:x["a"],VCol:S["a"],VContainer:w["a"],VDataTable:P["a"],VProgressCircular:_["a"],VRow:E["a"],VSpacer:A["a"],VTextField:O["a"]});var R={name:"App",components:{Search:k}},F=R,I=s("7496"),L=s("a75b"),j=Object(v["a"])(F,n,r,!1,null,null,null),M=j.exports;y()(j,{VApp:I["a"],VContent:L["a"]});var U=s("f309");a["a"].use(U["a"]);var q=new U["a"]({});a["a"].config.productionTip=!1,new a["a"]({vuetify:q,render:function(t){return t(M)}}).$mount("#app")},cdd9:function(t,e){t.exports.lhost="http://127.0.0.1:8080",t.exports.graphdb="http://127.0.0.1:7200",t.exports.flaskSparql="http://minors.ilch.uminho.pt/sparql",t.exports.flaskDownload="http://minors.ilch.uminho.pt/api/sparql",t.exports.graph="http://localhost:3888/sparql",t.exports.uri="http://sparql.entigraph.di.pt/corpus"}});
//# sourceMappingURL=app.506e8a9c.js.map