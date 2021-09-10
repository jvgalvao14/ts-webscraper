import axios from "axios";
import { JSDOM } from "jsdom";

interface iPageInfo {
    ext: number,
    index: number,
}

async function getData() {
    const index:number = 10;
    for(let i = 0; i < index; i++){
        const url:string = `https://clevert.com.br/t/pt-br/numbers-to-words/index/pt-br/${i}`
                const data = (await axios.get(url)).data;
                const {window} = new JSDOM(data);
                const {document} = window;

                let number = document.querySelector('input').value;

                console.log(number);
    }
}

getData();

