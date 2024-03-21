const APIENDPOINT =
  "https://openlibrary.org/search.json?fields=title,key,language&limit=15&lang=eng&sort=title&language=eng&q=";
export type Entry = {
  title: string;
  key: string;
};

type SearchResults = {
  docs: Entry[];
};

function sortCountriesByName(results: Entry[], searchString: string): Entry[] {
  if (!results.length) return [];
  return results
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter((entry) => entry.title.indexOf(searchString));
}

async function fetchApi(query: string): Promise<Entry[]> {
  const results = await fetch(APIENDPOINT + query);
  const { docs }: SearchResults = await results.json();
  return sortCountriesByName(docs, query);
}

export async function getBooksByTitle(query: string): Promise<Entry[]> {
  const results = await fetchApi(query);
  return results;
}
