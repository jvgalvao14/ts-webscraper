import axios from "axios";
import { JSDOM } from "jsdom";
import performance from 'perf_hooks';
import cluster from 'cluster';
import fs from "fs";
require("dotenv").config();
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;

console.log(numCPUs)


//stuff
async function writeData(indexTag: string, extNumber: string) {
    let data = JSON.stringify({indexTag, extNumber})

    const writer = fs.createWriteStream('data.json', {'flags': 'a'})

    writer.write(data + ',')
    console.log("")
}

async function getData() {
    try {
        const index: number = 1000000;
        for (let i = 0; i < index; i++) {
        let startTime = new Date().getTime()
        const url: string = `https://clevert.com.br/t/pt-br/numbers-to-words/index/pt-br/${i}`;
        const data = (await axios.get(url)).data;
        const { window } = new JSDOM(data);
        const { document } = window;

        let indexTag: string = document.querySelector('input').value;
        let extNumber: string = document.getElementById('resposta').textContent;
        
        writeData(indexTag, extNumber);
        let endTime = new Date().getTime()
        console.log(`Tempo de duração em MS: ${endTime - startTime}`)
    }
    } catch (error) {
        console.log("FUDEU!", error)
    }
}
getData()