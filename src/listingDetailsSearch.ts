import * as yargs from "yargs";
import { SearchContext } from "./searchContext";

async function main() {
  const args = yargs.options({
    listingid: {
      required: true,
      type: `string`,
      description: `listing id`,
    }    
  }).argv;

  const listingId = args.listingid;
  const searchContext = new SearchContext();
  try {
    const result = await searchContext.getListingDetails(listingId);
    console.log(`Listing ID: ${result.listingId}`);
    console.log(`Description: ${result.description}`);
    console.log(`Type: ${result.type}`);
    console.log(`Beds: ${result.beds}`);
    console.log(`Baths: ${result.baths}`);
    console.log(`Sqft: ${result.sqft}`);
    console.log(`Days on Market: ${result.daysOnMarket}`);
    console.log(`City: ${result.city}`);
    console.log(`Region: ${result.region}`);
    console.log(`Price: ${result.price}`);
    console.log(`Thumbnail: ${result.thumbnail}`);
  } catch(ex) {
    console.log(`Encountered error`);
    throw ex;
  }
  
}

main();