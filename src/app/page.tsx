import myApis from "@/apis/myApis";
import MyCards from "@/_components/MyCards/MyCards";
import MainSlider from "@/_components/MainSlider/MainSlider";
import CategorySlider from "@/_components/CategorySlider/CategorySlider";
import { product } from "@/types/product.t";

export default async function Home() {
  const data = await myApis();

  return (
    <section className="px-5 md:px-0 my-10">
      <MainSlider />
      <CategorySlider />
      <div className="flex flex-wrap w-[85%] mx-auto">
	
        {data.map((product: product, idx: number) => (
			
          <MyCards key={idx} product={product} />
		  
        ))}
      </div>
    </section>
  );
}
