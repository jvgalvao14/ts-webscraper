import axios from "axios";
import { JSDOM } from "jsdom";
var fs = require("fs");
require("dotenv").config();

//database stuff
import { Schema, model, connect } from "mongoose";

interface ExtensiveNumber {
    extNumber: string;
    index: string;
}
const schema = new Schema<ExtensiveNumber>({
    extNumber: { type: String, required: true },
    index: { type: String, required: true },
});

const extModel = model<ExtensiveNumber>("Number", schema);

// run().catch((err) => console.log(err));

// // async function run(): Promise<void> {
// //     await connect(process.env.URI);

// //     const doc = new extModel({
// //         extNumber: "Bill",
// //         index: "bill@initech.com",
// //     });
// //     await doc.save();

// //     console.log(doc.index);
// // }

async function writeDataOnDb(indexTag: string, extNumber: string) {
    await connect(process.env.URI);

    const doc = new extModel({
        extNumber: extNumber,
        index: indexTag,
    });

    await doc.save();
}

async function getData() {
    const index: number = 30;
    for (let i = 0; i < index; i++) {
        const url: string = `https://clevert.com.br/t/pt-br/numbers-to-words/index/pt-br/${i}`;
        const data = (await axios.get(url)).data;
        const { window } = new JSDOM(data);
        const { document } = window;

        let indexTag: string = document.querySelector("input").value;
        let extNumber: string = document.getElementById("resposta").innerHTML;
        console.log(indexTag, extNumber);
    }
}
getData();
