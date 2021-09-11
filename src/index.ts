import axios from "axios";
import { JSDOM } from "jsdom";
var fs = require('fs');

interface iPageInfo {
    ext: string,
    index: number,
}

let data = {
    table:[
        
    ]
};

async function writeDataOnJson (number, extNumber){

    data.table.push({extNumber: extNumber, index:number})

        console.log(data);
        
//     fs.writeFile("test.txt", data, function(err) {
//     if (err) {
//         console.log(err);
//     }
//          });
}

async function getData() {
    const index:number = 10;
    for(let i = 0; i < index; i++){
        const url:string = `https://clevert.com.br/t/pt-br/numbers-to-words/index/pt-br/${i}`
                const data = (await axios.get(url)).data;
                const {window} = new JSDOM(data);
                const {document} = window;

                let number = document.querySelector('input').value;
                let extNumber = document.getElementById('resposta').innerHTML;
                writeDataOnJson(number,extNumber)
    }}
    getData()