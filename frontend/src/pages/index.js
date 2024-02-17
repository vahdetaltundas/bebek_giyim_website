import Header from "@/components/layout/Header";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const array = Array.from({ length: 20 }, (_, index) => index);
  return (
    <>
    <div className="container mx-auto">
    <div className="mt-20 grid gird-cols-2 md:grid-cols-4 gap-5 mx-5">
          {array.map((index) => (
            <ProductCard   key={index}/>
          ))}
        </div>
    </div>
    </>
  );
}
