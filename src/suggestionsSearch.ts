import * as yargs from "yargs";
import * as searchContext from "./searchContext";

async function main() {
  const args = yargs.options({
    search: {
      required: true,
      type: `string`,
      description: `search text`,
    }    
  }).argv;

  const searchText:string = args.search;
  const suggestions:string[] = await searchContext.getSuggestions(searchText);

  if(suggestions.length == 0) {
    console.log(`No suggestions returned.`);
  } else {
    console.log(`Suggestions:`)
    for(const suggestion of suggestions){
      console.log(`\t${suggestion}`);
    }
  }  
}

main();