# Azure SDK UX Study - Typescript
This repository consists of sample CLI application which consists of samples that demonstrate the API use cases of ```@azure/search-documents```.

## Prerequisites
1. Clone this repository using the following command:
```
git clone https://github.com/sarangan12/azure-sdk-ux-study-ts.git
```

2. Change the directory
```
cd azure-sdk-ux-study-ts
```

3. Execute the following commands:
```
npm install
npm run build
```

4. Set the following environment variables:
```
export UX_SEARCH_ENDPOINT=<endpoint>
export UX_SEARCH_APIKEY=<apikey>
export UX_SEARCH_INDEX=<searchindex>
```

Now, you can start executing the scenarios.

## Scenarios
Each scenario contains multiple options/parameters to be applied. You can invoke any scenario without any parameters to display the help information on the parameters. For example, the following command gives parameter information on the extended scenario:

```
node out/extendedSearch.js
```

The above command will give the following output:

```
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --search   search text                                     [string] [required]
  --page     page of the search results                      [number] [required]
  --high     sort price high to low                                    [boolean]
  --low      sort price low to high (--high takes precedence)          [boolean]
  --beds     number of bedrooms to filter by                 [number] [required]
  --type     number of bedrooms to filter by
                             [string] [required] [choices: "House", "Apartment"]
```

### Basic Search
This scenario demonstrates the basic search scenario in which the search text is used to search. Please find sample commands to execute basic search below:

```
node out/basicSearch.js --search beach
````

This will display top 3 results. If you want to customize the number of results, you could use the following command:

```
node out/basicSearch.js --search beach --top 6
```

### Count Documents
This scenario counts the number of documents in the index. Use the following command to execute this scenario:

```
node out/countDocumentsSearch.js
```

### Autocomplete 
This scenario provides a list of autocomplete results based on the search text provided. Please find a sample command to execute this scenario:

```
  node out/autoCompleteSearch.js --search bea
```

### Listing Details Search
This scenario provides the details of an individual listing based on the listing id. The listing id could be obtained from the results of the basic search/extended search scenarios. Please find a sample command to execute this scenario:

```
node out/listingDetailsSearch.js --listingid OTM4MzM5MA2
```

### Suggestions Search
This scenario provides a list of suggestions based on input search text. Please find a sample command to execute this scenario:

```
node out/suggestionsSearch.js --search beach
```

### Extended Search
This scenario demonstrates the extended search capability with multiple input options. Please find a sample command to execute this scenario:

```
node out/extendedSearch.js --search beach --page 5 --high true --beds 1 --type House
```
