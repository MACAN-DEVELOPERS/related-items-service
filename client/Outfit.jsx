import ReactStars from "react-stars";

function Outfit(props) {
  console.log(props.outfit);

  return (
    <div className="flex items-stretch mx-20">
      {props.outfit.map((element, index) => {
        return (
          <div className="container py-8 " key={index}>
            <div className="mx-6">
              <div className="">
                <a
                  href=""
                  className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                  <div className="relative pb-48 overflow-hidden">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={element.image}
                      alt="img"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      {element.category}
                    </span>
                    <h2 className="mt-2 mb-2  font-bold"></h2>

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
  );
}

export default Outfit;
