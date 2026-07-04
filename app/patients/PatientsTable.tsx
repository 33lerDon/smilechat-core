"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  User,
} from "lucide-react";

import DeleteDialog from "@/components/ui/DeleteDialog";
import { notify } from "@/lib/notify";

type Patient = {
  id: string;
  hospitalNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
};

type Props = {
  patients: Patient[];
};

export default function PatientsTable({ patients }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    if (!search.trim()) return patients;

    const term = search.toLowerCase();

    return patients.filter((patient) =>
      [
        patient.firstName,
        patient.lastName,
        patient.hospitalNumber,
        patient.phone,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [patients, search]);

  function askDelete(patient: Patient) {
    setSelectedPatient(patient);
    setOpen(true);
  }

  async function deletePatient() {
    if (!selectedPatient) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/patients/${selectedPatient.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        notify.error("Failed to delete patient.");
        return;
      }

      notify.success("Patient deleted successfully.");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DeleteDialog
        open={open}
        loading={loading}
        title="Delete Patient"
        description={
          selectedPatient
            ? `Are you sure you want to delete ${selectedPatient.firstName} ${selectedPatient.lastName}? This action cannot be undone.`
            : ""
        }
        onCancel={() => setOpen(false)}
        onConfirm={deletePatient}
      />

      <div className="space-y-6">

        <div className="relative">

          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />

        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Patient
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Hospital No.
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Gender
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPatients.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-16 text-center"
                  >

                    <User
                      size={50}
                      className="mx-auto mb-4 text-slate-300"
                    />

                    <p className="text-lg font-semibold">
                      No patient found
                    </p>

                  </td>

                </tr>

              ) : (

                filteredPatients.map((patient) => (

                  <tr
                    key={patient.id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white font-bold">

                          {patient.firstName.charAt(0)}
                          {patient.lastName.charAt(0)}

                        </div>

                        <div>

                          <p className="font-semibold">

                            {patient.firstName} {patient.lastName}

                          </p>

                          <p className="text-sm text-slate-500">
                            Patient
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">
                      {patient.hospitalNumber}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          patient.gender === "Male"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {patient.gender}
                      </span>

                    </td>

                    <td className="px-6 py-5">
                      {patient.phone}
                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-3">

                        <Link
                          href={`/patients/${patient.id}`}
                          className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition"
                        >
                          <Eye size={18} />
                        </Link>

                        <Link
                          href={`/patients/${patient.id}/edit`}
                          className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200 transition"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => askDelete(patient)}
                          className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition"
                        >
                          <Trash2 size={18} />
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
    </>
  );
}