import {
  SearchIndexClient,
  AzureKeyCredential,
  odata,
  AutocompleteResult,
} from "@azure/search-documents";

//TODO-TASK-1: install azure search-documents package
//TODO-TASK-2: Write code to create a search index client to interact with it to perform search operations in the next sections

const getEnvVar = (name: string) => {
  let value = process.env[name];
  if (!value) {
    throw `Did not find environment variable ${name}`;
  }
  return value;
};

const endpoint = getEnvVar(`UX_SEARCH_ENDPOINT`);
const apiKey = getEnvVar(`UX_SEARCH_APIKEY`);
const indexName = getEnvVar(`UX_SEARCH_INDEX`);

//The interface we're expecting for property listings based on the Schema for documents in the index
interface Listing {
  listingId: string;
  description: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  daysOnMarket: number;
  city: string;
  region: string;
  price: number;
  thumbnail: string;
}

interface SearchContext {
  listings: Listing[];
  totalCount: number;
  unitTypes: { [type: string]: number };  
}

export async function searchBasic(searchText: string, top: number): Promise<SearchContext> {
  //TODO-TASK-3: Write code to query documents in the index based on searchText parameter and return the top # of results
}

export async function getCountDocuments(): Promise<number> {
  //TODO-TASK-4: Write code to return the count of documents
}

export async function getAutoComplete(searchText: string): Promise<string[]> {
  //TODO-TASK-5: Write code to return list of autocomplete results based on searchText
}

export async function getListingDetails(id: string): Promise<Listing> {
  //TODO-TASK-6: Write code to get a document by its id from the index and return its details
}

export async function getSuggestions(searchText: string): Promise<string[]> {
  //TODO-TASK-7: Write code to return result suggestions for a user query (searchText)
}

export async function getExtendedSearch(
  searchText: string,
  pageNumber: number,
  resultsPerPage: number,
  sortPriceHigh: boolean,
  minBedrooms: number,
  unitType: string
): Promise<SearchContext> {
  //TODO-TASK-8: Write code to query documents using searchText and return the results only from the specified page
  // you should sort results descending or ascending based on the price field and
  // Add the search filters based on the minimum bedrooms value
  // you need to also add a type facet then adding an
  // additional filter based on unitType
  //NOTE: if sortPriceHigh is true, sort descending and otherwise sort ascending
  //NOTE: Set the totalCount, listings and unitTypes of SearchContext class accordingly
}

