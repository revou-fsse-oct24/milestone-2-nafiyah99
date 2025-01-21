import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Products } from '../App';

const ProductDetail = ({ getItems, items, onClickProps }: { getItems: (id: string) => void; items: Products | null; onClickProps: (product: Products) => void }) => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/product');
  };

  useEffect(() => {
    if (id) {
      getItems(id);
    }
  }, [getItems, id]);

  if (!items) {
    return (
      <>
        <div className="m-10 text-4xl">Loading...</div>
      </>
    );
  }

  return (
    <>
      <div className='mx-10'>
        <button onClick={handleBack} className=" text-xs lg:text-base flex items-center text-grayshade-50 bg-grayshade-500 border border-grayshade-300 m-2 px-4 py-2 top-[2%] right-[2%] rounded-full">
          <p className="text-white"> Back</p>
        </button>
        <section className="mt-4 flex items-center justify-center max-w-7xl m-auto wrapper">
          <div key={`${items.id}`} className="relative flex lg:flex-row flex-col bg-zinc-900 border border-zinc-700 rounded-xl max-lg:p-4 max-md:p-4 lg:p-10 ">
            
            <div className="space-y-4">
              {items.images.map((image: string, index: number) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`relative rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-zinc-500' : ''}`}>
                  <img src={image} alt={`${items.title} ${index + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>

            <img src={items.images[selectedImage]} alt={items.title} className="ms-4 max-h-96 max-md:m-2 max-sm:m-0 rounded-lg w-full self-stretch mb-2 object-cover" />

            <div className="lg:px-8 max-md:p-4 flex lg:min-w-96 flex-col gap-2 justify-center">
              <h2 className="text-start mb-1 text-3xl max-sm:text-2xl font-semibold">{items.title}</h2>
              <span className="w-max border border-zinc-600 rounded-2xl text-xs p-1 px-2">{items.category.name.replace(/\d+/g, '')}</span>
              <p className="text-lg text-start text-zinc-400 max-sm:text-base text-grayshade-50 my-10">{items.description}</p>
              <div className="flex justify-between items-end">
                <div className="text-start">
                  <p className="text-grayshade-50 text-lg">Price</p>
                  <p className="font-bold text-white text-2xl">$ {items.price}</p>
                </div>
                <Button onClickProps={() => onClickProps(items)}>Add to Cart</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
