import * as yargs from "yargs";
import { SearchContext } from "./searchContext";

async function main() {
  const args = yargs.options({
    search: {
      required: true,
      type: `string`,
      description: `search text`,
    }    
  }).argv;

  const searchText = args.search;
  const searchContext = new SearchContext();
  const results:string[] = await searchContext.getAutoComplete(searchText);
  if(results.length == 0) {
    console.log('No autocomplete results returned.');
  } else {
    console.log(`Autocomplete results`);
    for(const result of results) {
      console.log(`\t${result}`);
    }
  }  
}

main();