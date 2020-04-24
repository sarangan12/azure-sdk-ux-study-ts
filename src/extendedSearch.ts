import * as yargs from "yargs";
import { SearchContext } from "./searchContext";

async function main() {
  const args = yargs.options({
    search: {
      required: true,
      type: `string`,
      description: `search text`,
    },
    page: {
      required: true,
      type: `number`,
      description: `page of the search results`,
    },
    high: {
      type: `boolean`,
      description: `sort price high to low`,
    },
    low: {
      type: `boolean`,
      description: `sort price low to high (--high takes precedence)`,
    },
    beds: {
      required: true,
      type: `number`,
      description: `number of bedrooms to filter by`,
    },
    type: {
      required: true,
      type: `string`,
      choices: ["House", "Apartment"] as const,
      description: `type of listing`,
    },
  }).argv;

  const [searchText, pageNumber, minBedrooms, unitType] = [
    args.search,
    args.page,
    args.beds,
    args.type,
  ];
  const sortPriceHigh = args.high ? true : args.low ? false : true;

  const searchContext = new SearchContext();
  const resultsPerPage = 5;
  const dollars = new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency: `USD`,
  });
  const results = await searchContext.getExtendedSearch(
    searchText,
    pageNumber,
    resultsPerPage,
    sortPriceHigh,
    minBedrooms,
    unitType
  );

  console.log(`Summary:`);
  console.log(`       Count: ${results.totalCount}`);
  console.log(`       Pages: ${Math.ceil(results.totalCount / resultsPerPage)}`);
  console.log(`      Houses: ${results.unitTypes[`House`]}`);
  console.log(`  Apartments: ${results.unitTypes[`Apartment`]}`);
  console.log();

  // Print the individual search results
  for (const listing of results.listings) {
    console.log(`${listing.listingId}:`);
    console.log(`  ${listing.city}, ${listing.region}  /  ${dollars.format(listing.price)}  /  ${listing.type}`);
    console.log(`  ${listing.beds} beds, ${listing.baths} baths, ${listing.sqft} sqft, ${listing.daysOnMarket} days on market`);
    console.log(`  ${listing.description}`);
    console.log();
  }
}

main();
