import Link from "next/link";
import { Users, CalendarDays, Wallet, Stethoscope } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const patientCount = await prisma.patient.count();

  const recentPatients = await prisma.patient.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            🦷 SmileChat EMR
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back, Dr. Ismail.
          </p>

        </div>

        <Link
          href="/patients/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          + Register Patient
        </Link>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Patients
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {patientCount}
              </h2>

            </div>

            <Users className="h-10 w-10 text-blue-600" />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Appointments
              </p>

              <h2 className="text-3xl font-bold mt-2">
                0
              </h2>

            </div>

            <CalendarDays className="h-10 w-10 text-green-600" />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₦0
              </h2>

            </div>

            <Wallet className="h-10 w-10 text-yellow-600" />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Treatments
              </p>

              <h2 className="text-3xl font-bold mt-2">
                0
              </h2>

            </div>

            <Stethoscope className="h-10 w-10 text-red-600" />

          </div>

        </div>

      </div>

      {/* Recent Patients */}

      <div className="bg-white rounded-xl shadow border">

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            Recent Patients
          </h2>

        </div>

        <div className="divide-y">

          {recentPatients.length === 0 ? (

            <div className="p-6 text-slate-500">
              No patients yet.
            </div>

          ) : (

            recentPatients.map((patient) => (

              <div
                key={patient.id}
                className="flex items-center justify-between p-6 hover:bg-slate-50"
              >

                <div>

                  <p className="font-semibold">

                    {patient.firstName} {patient.lastName}

                  </p>

                  <p className="text-sm text-slate-500">

                    {patient.hospitalNumber}

                  </p>

                </div>

                <Link
                  href={`/patients/${patient.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}