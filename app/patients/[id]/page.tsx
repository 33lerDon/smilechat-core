import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PatientProfilePage({
  params,
}: Props) {
  const { id } = await params;

  const patient = await prisma.patient.findUnique({
    where: {
      id,
    },
  });

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            {patient.firstName} {patient.lastName}
          </h1>

          <p className="text-slate-500">
            Hospital No: {patient.hospitalNumber}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border p-6">

          <h2 className="font-bold text-lg mb-4">
            Personal Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>

            <p>
              <strong>Date of Birth:</strong>{" "}
              {patient.dateOfBirth.toLocaleDateString()}
            </p>

            <p>
              <strong>Phone:</strong> {patient.phone}
            </p>

            <p>
              <strong>Email:</strong> {patient.email || "-"}
            </p>

            <p>
              <strong>Occupation:</strong>{" "}
              {patient.occupation || "-"}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-xl border p-6">

          <h2 className="font-bold text-lg mb-4">
            Medical Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Blood Group:</strong>{" "}
              {patient.bloodGroup || "-"}
            </p>

            <p>
              <strong>Genotype:</strong>{" "}
              {patient.genotype || "-"}
            </p>

            <p>
              <strong>Marital Status:</strong>{" "}
              {patient.maritalStatus || "-"}
            </p>

            <p>
              <strong>Emergency Contact:</strong>{" "}
              {patient.emergencyContact || "-"}
            </p>

            <p>
              <strong>Emergency Phone:</strong>{" "}
              {patient.emergencyPhone || "-"}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl border p-6">

        <h2 className="font-bold text-lg mb-4">
          Dental Records
        </h2>

        <p className="text-slate-500">
          No dental records yet.
        </p>

      </div>

    </div>
  );
}