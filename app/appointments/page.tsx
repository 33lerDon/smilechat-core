import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: true,
    },
    orderBy: [
      {
        appointmentDate: "asc",
      },
      {
        appointmentTime: "asc",
      },
    ],
  });

  function badgeColor(status: string) {
    switch (status) {
      case "Scheduled":
        return "bg-yellow-100 text-yellow-700";

      case "Arrived":
        return "bg-blue-100 text-blue-700";

      case "In Treatment":
        return "bg-orange-100 text-orange-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Appointment Schedule
          </h1>

          <p className="text-slate-500 mt-2">
            {appointments.length} appointment(s)
          </p>

        </div>

        <Link
          href="/appointments/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          + Book Appointment
        </Link>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Time
              </th>

              <th className="px-6 py-4 text-left">
                Patient
              </th>

              <th className="px-6 py-4 text-left">
                Purpose
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-500"
                >
                  No appointments booked.
                </td>

              </tr>

            ) : (

              appointments.map((appointment) => (

                <tr
                  key={appointment.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {appointment.appointmentTime}
                  </td>

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-semibold">
                        {appointment.patient.firstName}{" "}
                        {appointment.patient.lastName}
                      </p>

                      <p className="text-sm text-slate-500">
                        {appointment.patient.hospitalNumber}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {appointment.purpose}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-4">

                      <Link
                        href={`/appointments/${appointment.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>

                      <Link
                        href={`/appointments/${appointment.id}/edit`}
                        className="text-green-600 hover:underline"
                      >
                        Edit
                      </Link>

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