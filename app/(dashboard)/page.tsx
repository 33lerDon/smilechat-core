import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Patients" value="0" />
        <StatCard title="Appointments" value="0" />
        <StatCard title="Today's Revenue" value="₦0" />
        <StatCard title="Pending Treatments" value="0" />
      </div>
    </>
  );
}