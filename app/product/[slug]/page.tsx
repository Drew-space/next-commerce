import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/lib/sanity";

const getData = async (slug: string) => {
  const query = `*[_type == "products" && slug.current == "${slug}"][0]{
    _id,
      images,
      price,
      name,
      description,
      "slug": slug.current,
      "categoryName": category->name,

  }`;

  const data = await client.fetch(query);
  return data;
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data: fullProduct = await getData(slug);

  return (
    <div className=" bg-white">
      <div className=" mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500 ">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl ">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
