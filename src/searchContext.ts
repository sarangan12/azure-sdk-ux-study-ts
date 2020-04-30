import {
  SearchIndexClient,
  AzureKeyCredential,
  odata,
  AutocompleteResult,
} from "@azure/search-documents";

// TODO-TASK-1: Install azure search-documents package (thru npm install)

const endpoint = "https://cogsearchux.search.windows.net";
const apiKey = "A4C8777BE0353BBA8FA2603E3C731219";
const indexName =  "realestate-us-sample-index";

// TODO-TASK-2: Write code to create a search index client to interact with it to perform search operations in the next sections

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
  unitTypes?: { [type: string]: number };
}

export async function searchBasic(searchText: string, top: number): Promise<SearchContext> {
  const results:SearchContext = {
    listings: <Listing[]>[],
    totalCount: 0,
    unitTypes: <{ [unit: string]: number }>{}
  };

  return results;

  // TODO-TASK-3: 
  // 1. You can remove the above code and
  // 2. Write code to query documents in the index based on searchText parameter and return the top # of results
}

export async function getCountDocuments(): Promise<number> {
  return 0;
  // TODO-TASK-4:
  // 1. You can remove the above code in this function and 
  // 2. Write code to return the count of documents
}

export async function getAutoComplete(searchText: string): Promise<string[]> {
  const array:string[] = ["", ""];
  return array;  
  // TODO-TASK-5:
  // 1. You can remove the above code in this function and 
  // 2. Write code to return list of autocomplete results based on searchText
  // Note: AutoComplete API needs a suggester to be created and used. For your
  // comfort, we have already created a suggester named 'sg'.
}

export async function getListingDetails(id: string): Promise<Listing> {
  const listing:Listing =  {
    listingId: "",
    description: "",
    type: "",
    beds: 0,
    baths: 0,
    sqft: 0,
    daysOnMarket: 0,
    city: "",
    region: "",
    price: 0,
    thumbnail: ""
  }

  return listing;
  // TODO-TASK-6:
  // 1. You can remove the above code in this function and 
  // 2. Write code to get a document by its id from the index and return its details
  // Note: The listing id could be obtained from the results of the basic search/extended search scenarios
}

export async function getSuggestions(searchText: string): Promise<string[]> {
  const array:string[] = ["", ""];
  return array;
  // TODO-TASK-7:
  // 1. You can remove the above code in this function and 
  // 2. Write code to return result suggestions for a user query (searchText)
  // Note: AutoComplete API needs a suggester to be created and used. For your
  // comfort, we have already created a suggester named 'sg'.
}

export async function getExtendedSearch(
  searchText: string,
  pageNumber: number,
  resultsPerPage: number,
  sortPriceHigh: boolean,
  minBedrooms: number,
  unitType: string
): Promise<SearchContext> {
  const results:SearchContext = {
    listings: <Listing[]>[],
    totalCount: 0,
    unitTypes: <{ [unit: string]: number }>{}
  };

  return results;

  //TODO-TASK-8:
  // 1. You can remove the above code in this function and 
  // 2. Write code to query documents using searchText and return the results only from the specified page
  // you should sort results descending or ascending based on the price field and
  // Add the search filters based on the minimum bedrooms value
  // you need to also add a type facet then adding an
  // additional filter based on unitType
  // NOTE: if sortPriceHigh is true, sort descending and otherwise sort ascending
  // NOTE: Set the totalCount, listings and unitTypes of SearchContext class accordingly
  // NOTE: It would be helpful to refer https://docs.microsoft.com/en-us/azure/search/search-filters-facets
  // to learn about facets.
}

