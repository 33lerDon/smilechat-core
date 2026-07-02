type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({
  title,
  children,
}: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}