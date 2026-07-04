import { LucideIcon, TrendingUp } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-teal-600",
  iconBg = "bg-teal-100",
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Decorative Gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600" />

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              {subtitle}
            </div>
          )}

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>

      </div>

    </div>
  );
}