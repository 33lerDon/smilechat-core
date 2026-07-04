import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PatientsTable from "./PatientsTable";

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

          <h1 className="text-3xl font-bold">
            Patients
          </h1>

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

      <PatientsTable patients={patients} />

    </div>
  );
}