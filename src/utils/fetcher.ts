export async function fetcher(url: string, options?: object) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
