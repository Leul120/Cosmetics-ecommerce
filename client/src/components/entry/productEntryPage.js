import { useNavigate } from "react-router-dom";

const ProductTypeSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Select Product Type</h1>
      <div className="grid grid-cols-3 gap-6">
        <button onClick={() => handleSelection("makeup")} className="bg-blue-500 text-white py-2 px-6 rounded">
          Makeup
        </button>
        <button onClick={() => handleSelection("skincare")} className="bg-green-500 text-white py-2 px-6 rounded">
          Skincare
        </button>
        <button onClick={() => handleSelection("haircare")} className="bg-yellow-500 text-white py-2 px-6 rounded">
          Haircare
        </button>
        <button onClick={() => handleSelection("fragrance")} className="bg-purple-500 text-white py-2 px-6 rounded">
          Fragrance
        </button>
        <button onClick={() => handleSelection("nail")} className="bg-pink-500 text-white py-2 px-6 rounded">
          Nail Product
        </button>
        <button onClick={() => handleSelection("body-care")} className="bg-red-500 text-white py-2 px-6 rounded">
          Body Care
        </button>
      </div>
    </div>
  );
};

export default ProductTypeSelection;
