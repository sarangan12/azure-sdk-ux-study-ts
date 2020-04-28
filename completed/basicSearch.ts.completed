import * as yargs from "yargs";
import * as searchContext from "./searchContext";

async function main() {
  const args = yargs.options({
    search: {
      required: true,
      type: `string`,
      description: `search text`,
    },
    top: {
      type: `number`,
      default: 3,
      description: `number of results to display`,
    }    
  }).argv;

  const [searchText, top] = [
    args.search,
    args.top
  ];
  
  const dollars = new Intl.NumberFormat(`en-US`, { style: `currency`, currency: `USD` });
  const results = await searchContext.searchBasic(searchText, top);
  console.log(`Summary:`);
  console.log(`       Count: ${results.totalCount}`);
  console.log(`       Pages: ${Math.ceil(results.totalCount / top)}`);
  console.log(`      Houses: ${results.unitTypes[`House`]}`);
  console.log(`  Apartments: ${results.unitTypes[`Apartment`]}`);
  console.log();

  for (const listing of results.listings) {
    console.log(`${listing.listingId}:`);
    console.log(`  ${listing.city}, ${listing.region}  /  ${dollars.format(listing.price)}  /  ${listing.type}`);
    console.log(`  ${listing.beds} beds, ${listing.baths} baths, ${listing.sqft} sqft, ${listing.daysOnMarket} days on market`);
    console.log(`  ${listing.description}`);
    console.log();
  }
}

main(); 