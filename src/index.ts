import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";
require("dotenv").config();

//database stuff

async function writeData(indexTag: string, extNumber: string) {
    const doc: any = [];
    doc.push({
        extNumber: extNumber,
        index: indexTag,
    });
    fs.writeFile("text.json", JSON.stringify(doc), (err) => {
        console.log(err);
    });
}

async function getData() {
    const index: number = 1000000;
    for (let i = 0; i < index; i++) {
        const url: string = `https://clevert.com.br/t/pt-br/numbers-to-words/index/pt-br/${i}`;
        const data = (await axios.get(url)).data;
        const { window } = new JSDOM(data);
        const { document } = window;

        let indexTag: string = document.querySelector("input").value;
        let extNumber: string = document.getElementById("resposta").innerHTML;
        writeData(indexTag, extNumber);
    }
}
getData();
