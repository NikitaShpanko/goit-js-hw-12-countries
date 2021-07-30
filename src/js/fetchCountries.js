export default async function fetchCountries(searchQuery) {
  try {
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`);
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}
