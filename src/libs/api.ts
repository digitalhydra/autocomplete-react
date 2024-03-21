const APIENDPOINT =
  "https://api.scryfall.com/cards/search?order=name&unique=cards&q=";
//  "https://openlibrary.org/search.json?fields=title,key,language&limit=15&lang=eng&sort=title&language=eng&q=";
export type Entry = {
  name: string;
  key: string;
};

type SearchResults = {
  data: Entry[];
};

function sortCountriesByName(results: Entry[], searchString: string): Entry[] {
  if (!results.length) return [];
  return results
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((entry) => entry.name.indexOf(searchString));
}

async function fetchApi(query: string): Promise<Entry[]> {
  const results = await fetch(APIENDPOINT + query);
  const { data }: SearchResults = await results.json();
  return sortCountriesByName(data, query);
}

export async function getBooksByTitle(query: string): Promise<Entry[]> {
  const results = await fetchApi(query);
  return results;
}
