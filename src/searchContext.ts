import {
  SearchIndexClient,
  AzureKeyCredential,
  odata,
  AutocompleteResult,
} from "@azure/search-documents";

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

export class SearchContext {
  listings: Listing[];
  totalCount: number;
  unitTypes: { [type: string]: number };

  constructor(
    listings = <Listing[]>[],
    totalCount = 0,
    unitTypes = <{ [unit: string]: number }>{}
  ) {
    this.listings = listings;
    this.totalCount = totalCount;
    this.unitTypes = unitTypes;
  }

  async searchBasic(searchText: string, top: number): Promise<SearchContext> {
    const client = new SearchIndexClient<Listing>(
      endpoint,
      indexName,
      new AzureKeyCredential(apiKey)
    );
    const options: any = {
      searchText,
      skip: 0,
      top: top,
      includeTotalResultCount: true,
      facets: [`type`],
    };

    const response = await client.search(options);
    const results = new SearchContext();
    results.totalCount = response.count || 0;
    for await (const result of response.results) {
      results.listings.push(result);
    }
    results.unitTypes = {};
    if (response.facets) {
      for (const facet of response.facets[`type`]) {
        results.unitTypes[facet.value || "type"] = facet.count || 0;
      }
    }
    return results;
  }

  async getListingDetails(id: string): Promise<Listing> {
    const client = new SearchIndexClient<Listing>(
      endpoint,
      indexName,
      new AzureKeyCredential(apiKey)
    );
    return await client.getDocument(id);
  }

  async getSuggestions(searchText: string): Promise<string[]> {
    const client = new SearchIndexClient<Listing>(
      endpoint,
      indexName,
      new AzureKeyCredential(apiKey)
    );
    const suggestions = await client.suggest({
      searchText,
      suggesterName: "sg",
    });
    return suggestions.results.map((r) => r.text);
  }

  async getCountDocuments(): Promise<number> {
    const client = new SearchIndexClient<Listing>(
      endpoint,
      indexName,
      new AzureKeyCredential(apiKey)
    );
    const count: number = await client.countDocuments();
    return count;
  }

  async getAutoComplete(searchText: string): Promise<string[]> {
    const client = new SearchIndexClient<Listing>(
      endpoint,
      indexName,
      new AzureKeyCredential(apiKey)
    );
    const results: AutocompleteResult = await client.autocomplete({
      searchText: searchText,
      suggesterName: "sg",
    });
    const autoCompleteResults: string[] = [];
    for (const result of results.results) {
      autoCompleteResults.push(result.text);
    }
    return autoCompleteResults;
  }

  async getExtendedSearch(
    searchText: string,
    pageNumber: number,
    resultsPerPage: number,
    sortPriceHigh: boolean,
    minBedrooms: number,
    unitType: string
  ): Promise<SearchContext> {
    const client = new SearchIndexClient<Listing>(
      endpoint,
      indexName,
      new AzureKeyCredential(apiKey)
    );
    const options: any = {
      searchText,
      skip: pageNumber * resultsPerPage,
      top: resultsPerPage,
      includeTotalResultCount: true,
      facets: [`type`],
    };
    if (sortPriceHigh === true) {
      options.orderBy = [`price desc`];
    } else if (sortPriceHigh === false) {
      options.orderBy = [`price asc`];
    }
    if (minBedrooms !== undefined) {
      options.filter = odata`beds ge ${minBedrooms}`;
    }
    if (unitType) {
      const unitFilter = odata`type eq ${unitType}`;
      if (options.filter) {
        options.filter += `and ${unitFilter}`;
      } else {
        options.filter = unitFilter;
      }
    }
    const response = await client.search(options);

    const results = new SearchContext();
    results.totalCount = response.count || 0;
    for await (const result of response.results) {
      results.listings.push(result);
    }
    results.unitTypes = {};
    if (response.facets) {
      for (const facet of response.facets[`type`]) {
        results.unitTypes[facet.value || "type"] = facet.count || 0;
      }
    }
    return results;
  }
}
