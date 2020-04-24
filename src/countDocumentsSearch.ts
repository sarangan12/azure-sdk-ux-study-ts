import { SearchContext } from "./searchContext";

async function main() {
  const searchContext = new SearchContext();
  const documentsCount:number = await searchContext.getCountDocuments();
  console.log(`Documents Count: ${documentsCount}`);
}

main();