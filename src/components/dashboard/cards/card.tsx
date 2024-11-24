"use client";

type CardProps = {
  title: string;
  value: string | number;
  description?: string;
};

const StatCard: React.FC<CardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-blue-500">{value}</p>
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
  );
};

export default StatCard;
