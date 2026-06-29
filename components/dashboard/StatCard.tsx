type StatCardProps = {
  title: string;
  value: string;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition-shadow">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3 text-slate-800">
        {value}
      </p>
    </div>
  );
}