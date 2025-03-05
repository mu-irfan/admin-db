const DetailItem = ({ label, value }: any) => (
  <div className="flex gap-1">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-500">{value}</span>
  </div>
);

export default DetailItem;
