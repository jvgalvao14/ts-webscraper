import axios from "axios";
import { JSDOM } from "jsdom";
import cluster from 'cluster';
import fs from "fs";
require("dotenv").config();
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;

const index1 = 125000;
const i1 = 0;

const index2 = 250000;
const i2 = 125000;

const index3 = 375000;
const i3 = 250000;

const index4 = 500000;
const i4 = 375000;

const index5 = 625000;
const i5 = 500000;

const index6 = 750000;
const i6 = 625000;

const index7 = 875000;
const i7 = 750000;

const index8 = 1000000;
const i8 = 875000;

async function writeData(indexTag: string, extNumber: string, path) {
    let data = JSON.stringify({indexTag, extNumber})

    const writer = fs.createWriteStream(`${path}.json`, {'flags': 'a'})

    writer.write(data + ',')
}

async function getData(maxVal, ind, path) {
    let start = new Date().getTime()
    try {
        for (let i = ind; i < maxVal; i++) {
        let startTime = new Date().getTime()
        const url: string = `https://clevert.com.br/t/pt-br/numbers-to-words/index/pt-br/${i}`;
        const data = (await axios.get(url)).data;
        const { window } = new JSDOM(data);
        const { document } = window;

        let indexTag: string = document.querySelector('input').value;
        let extNumber: string = document.getElementById('resposta').textContent;
        
        writeData(indexTag, extNumber, path);
        let endTime = new Date().getTime()
        console.log(`${process.pid}: ${endTime - startTime}`)
    }
        let end = new Date().getTime()
        console.log(`Tempo de processamento Do worker ${path}: ${end - start}`)
    } catch (error) {
        console.log(`${process.pid}: FUDEU!`, error)
    }
}

if(cluster.isPrimary){
    console.log(`${process.pid} - Primary is running`)
    for (let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
}else{
    console.log(`${process.pid} - Worker ${cluster.worker.id}!`)
    switch (cluster.worker.id) {
        case 1:
            getData(index1, i1, cluster.worker.id)
            .then(process.exit(0))

            break;
        case 2:
            getData(index2, i2, cluster.worker.id)
            .then(process.exit(0))

            break;
        case 3:
            getData(index3, i3, cluster.worker.id)
            .then(process.exit(0))

            break;
        case 4:
            getData(index4, i4, cluster.worker.id)
            .then(process.exit(0))

            break;
        case 5:
            getData(index5, i5, cluster.worker.id)
            .then(process.exit(0))

            break;
        case 6:
            getData(index6, i6, cluster.worker.id)
            .then(process.exit(0))

            break;
        case 7:
            getData(index7, i7, cluster.worker.id)
            .then(process.exit(0))

            break;
        case 8:
            getData(index8, i8, cluster.worker.id)
            .then(process.exit(0))

            break;
        default:
            break;
    }
}
