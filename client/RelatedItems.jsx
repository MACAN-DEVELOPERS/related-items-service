import "./index.css";
import axios from "axios";
import ReactStars from "react-stars";
import Outfit from "./Outfit.jsx";

const getImage = (id) => axios.get(`/products/${id}/styles`);
const getRating = (id) => axios.get(`/products/reviews/meta/${id}`);

const RelatedItems = () => {
  const { useState, useEffect } = React;
  const [prod, setprod] = useState([]);
  const [rating, setrating] = useState([]);
  const [outfit, setOutfit] = useState([]);


  // function handleChage(item){
  //   setOutfit(...item)
  // }

  const id = 11001
  // window.location.href.split("/")[3];

  const getAvg = async (id) => {
    try {
      const { data } = await getRating(id);
      let ratings = data.ratings;
      let som = 0;
      let coefs = 0;
      let average;
      for (var key in ratings) {
        coefs += Number(ratings[key]);
        som = som + Number(key) * Number(ratings[key]);
      }
      average = Math.round((4 * som) / coefs) / 4;
      setrating({ average });
      return average;
    } catch (error) {
      console.log(error);
    }
  };

  //fetch the related product + image
  const fetc = async () => {
    try {
      let { data } = await axios.get(`/products/${id}/related`);
      let relatesIds = data.map((element) => element.id);
      let arr = relatesIds.map((relatedId) => getImage(relatedId));
      let arr1 = relatesIds.map((relatedId) => getAvg(relatedId));
      let images = await Promise.all(arr);
      let ratings = await Promise.all(arr1);
      const final = data.map((element, index) => {
        return {
          ...element,
          rating: ratings[index],
          image: images[index].data,
        };
      });
      console.log(final);
      setprod(final);
    } catch (error) {
      console.log(error);
    }
  };
    

  useEffect(() => {
    fetc();
    getAvg(id, (result) => setrating(result));
    console.log(outfit)
  }, []);

  return (
    <div className="grid justify-items-start">
      <h1>Related product </h1>
      <div className="flex items-stretch mx-25">
        {prod.map((element, i) => {
          return (
            <div key={i} className="container py-8 " >
              <div className="mx-6">
                <button className="z-50" onClick={() => setOutfit([...outfit,element])}>
                  Add to OutFit
                </button>
                <div className="">
                  <a
                    href=""
                    className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                    <div className="relative pb-48 overflow-hidden">
                      <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={element.image}
                        alt=""
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                        {element.category}
                      </span>
                      <h2 className="mt-2 mb-2  font-bold">{element.name}</h2>

                      <div className="mt-3 flex items-center">
                        <span className="text-sm font-semibold">$</span>
                        <span className="font-bold text-xl">
                          {element.default_price}
                        </span>
                        &nbsp;
                      </div>
                    </div>

                    <div className="p-4 flex items-center text-sm text-gray-600">
                      <ReactStars count={5} size={15} value={element.rating} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ml-12">
        <Outfit prod={prod} outfit={outfit} />
      </div>
    </div>
  );
};
export default RelatedItems;
