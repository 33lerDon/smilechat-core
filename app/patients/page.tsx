import Link from "next/link";

export default function PatientsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Patients
      </h1>

      <p className="text-gray-500 mt-2">
        Manage all registered patients here.
      </p>

      <Link
        href="/patients/new"
        className="inline-block mt-8 bg-teal-700 text-white px-5 py-3 rounded-lg hover:bg-teal-800"
      >
        + Register New Patient
      </Link>
    </div>
  );
}