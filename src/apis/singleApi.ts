export default async function singleApi(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const { data } = await response.json();
  console.log(data);
  return data;
}
