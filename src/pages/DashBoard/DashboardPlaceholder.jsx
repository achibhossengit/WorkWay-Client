const DashboardPlaceholder = ({ title, description }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default DashboardPlaceholder;
