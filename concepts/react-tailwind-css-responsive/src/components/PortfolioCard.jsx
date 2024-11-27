function PortfolioCard({ title, description }) {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          View Details
        </button>
      </div>
    );
  }
  
  export default PortfolioCard;
  