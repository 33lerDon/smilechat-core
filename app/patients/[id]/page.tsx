import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PatientProfilePage({ params }: Props) {
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
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {patient.firstName} {patient.lastName}
          </h1>

          <p className="text-slate-500 mt-1">
            Hospital Number: {patient.hospitalNumber}
          </p>
        </div>

        <Link
          href="/patients"
          className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg"
        >
          ← Back
        </Link>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Personal Information
          </h2>

          <div className="space-y-3">
            <p><strong>First Name:</strong> {patient.firstName}</p>
            <p><strong>Middle Name:</strong> {patient.middleName || "-"}</p>
            <p><strong>Last Name:</strong> {patient.lastName}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {patient.dateOfBirth.toLocaleDateString()}
            </p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Email:</strong> {patient.email || "-"}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Medical Information
          </h2>

          <div className="space-y-3">
            <p><strong>Blood Group:</strong> {patient.bloodGroup || "-"}</p>
            <p><strong>Genotype:</strong> {patient.genotype || "-"}</p>
            <p><strong>Marital Status:</strong> {patient.maritalStatus || "-"}</p>
            <p><strong>Occupation:</strong> {patient.occupation || "-"}</p>
            <p><strong>Address:</strong> {patient.address || "-"}</p>
            <p><strong>City:</strong> {patient.city || "-"}</p>
            <p><strong>State:</strong> {patient.state || "-"}</p>
            <p><strong>Country:</strong> {patient.country || "-"}</p>
          </div>
        </div>

      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">
          Emergency Contact
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Name:</strong> {patient.emergencyContact || "-"}
          </p>

          <p>
            <strong>Phone:</strong> {patient.emergencyPhone || "-"}
          </p>
        </div>
      </div>

      {/* Dental Records */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">
          Dental Records
        </h2>

        <p className="text-slate-500">
          No dental records available yet.
        </p>
      </div>
    </div>
  );
}