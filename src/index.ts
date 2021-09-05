import axios from "axios";
import { JSDOM } from "jsdom";

interface iPageInfo {
    title: string,
    url: string,
}

const keyWord:string = "typescript";

const url:string = `https://pt.wikipedia.org/w/index.php?search=${keyWord}&title=Especial:Pesquisar&profile=advanced&fulltext=1&ns0=1`

const getData = async (url)=>{
    
        const data = (await axios.get(url)).data;
        const {window} = new JSDOM(data);
        const {document} = window;

        const listItems:Element[] = [ ...document.getElementsByClassName("mw-search-result") as any];
    try {
        const pageInfos: iPageInfo[] = listItems.map(listItem =>{
        
            const aElement = listItem.getElementsByTagName('a')[0];

            const title:string = aElement.textContent;
            const path:string = aElement.getAttribute('href')
            const url:string = `https://pt.wikipedia.org/${path}`

            const pageInfo: iPageInfo = {
                title,
                url,
            }
            return pageInfo;
        });
        console.log(pageInfos)
    } catch (error) {
        console.log(error);
    }
}
getData(url);