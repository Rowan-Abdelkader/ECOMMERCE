export default async function myApis() {
  const response = await fetch("http://localhost:3000/api/users");
  const { data } = await response.json();
  console.log(data);
  return data;
}
