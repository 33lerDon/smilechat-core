import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>

          <p className="text-slate-500 mt-1">
            {patients.length} patient(s) registered
          </p>
        </div>

        <Link
          href="/patients/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          + Register Patient
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-4">Hospital No.</th>

              <th className="text-left px-6 py-4">Patient Name</th>

              <th className="text-left px-6 py-4">Gender</th>

              <th className="text-left px-6 py-4">Phone</th>

              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-slate-500"
                >
                  No patients registered.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    {patient.hospitalNumber}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {patient.firstName} {patient.lastName}
                  </td>

                  <td className="px-6 py-4">
                    {patient.gender}
                  </td>

                  <td className="px-6 py-4">
                    {patient.phone}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <Link
                        href={`/patients/${patient.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </Link>

                      <button className="text-green-600 hover:text-green-800 font-medium">
                        Edit
                      </button>

                      <button className="text-red-600 hover:text-red-800 font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}