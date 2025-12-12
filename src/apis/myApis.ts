export default async function myApis() {
  const response = await fetch(`${process.env.URL}/products`);
  const { data } = await response.json();
  return data;
}
