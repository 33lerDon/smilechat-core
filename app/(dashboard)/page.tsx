import Link from "next/link";
import {
  Users,
  CalendarDays,
  Wallet,
  Stethoscope,
  UserPlus,
  CalendarPlus,
  FileText,
  ArrowRight,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import StatCard from "@/components/dashboard/StatCard";

export default async function DashboardPage() {
  const patientCount = await prisma.patient.count();

  const recentPatients = await prisma.patient.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div className="rounded-3xl bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700 p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-teal-100 text-lg">
              {today}
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome back,
              <br />
              Dr. Ismail 👋
            </h1>

            <p className="mt-3 text-teal-100 max-w-xl">
              Here's what's happening in your dental practice today.
            </p>

          </div>

          <Link
            href="/patients/new"
            className="rounded-xl bg-white px-6 py-4 font-semibold text-teal-700 shadow hover:bg-slate-100 transition"
          >
            + Register Patient
          </Link>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Patients"
          value={patientCount}
          subtitle="Registered patients"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />

        <StatCard
          title="Appointments"
          value={0}
          subtitle="Today's schedule"
          icon={CalendarDays}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />

        <StatCard
          title="Revenue"
          value="₦0"
          subtitle="Today's income"
          icon={Wallet}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
        />

        <StatCard
          title="Treatments"
          value={0}
          subtitle="Completed today"
          icon={Stethoscope}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />

      </div>

      {/* Quick Actions + Recent Patients */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Quick Actions */}

        <div className="rounded-2xl border bg-white shadow-sm p-6">

          <h2 className="text-xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <Link
              href="/patients/new"
              className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3">

                  <UserPlus className="h-5 w-5 text-blue-600" />

                </div>

                <div>

                  <p className="font-semibold">
                    Register Patient
                  </p>

                  <p className="text-sm text-slate-500">
                    Add a new patient
                  </p>

                </div>

              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />

            </Link>

            <button
              className="w-full flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-green-100 p-3">

                  <CalendarPlus className="h-5 w-5 text-green-600" />

                </div>

                <div className="text-left">

                  <p className="font-semibold">
                    New Appointment
                  </p>

                  <p className="text-sm text-slate-500">
                    Coming soon
                  </p>

                </div>

              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />

            </button>

            <button
              className="w-full flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-purple-100 p-3">

                  <FileText className="h-5 w-5 text-purple-600" />

                </div>

                <div className="text-left">

                  <p className="font-semibold">
                    Clinical Records
                  </p>

                  <p className="text-sm text-slate-500">
                    Coming soon
                  </p>

                </div>

              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />

            </button>

          </div>

        </div>

        {/* Recent Patients */}

        <div className="lg:col-span-2 rounded-2xl border bg-white shadow-sm">

          <div className="flex items-center justify-between border-b px-6 py-5">

            <h2 className="text-xl font-bold">
              Recent Patients
            </h2>

            <Link
              href="/patients"
              className="text-sm font-semibold text-teal-600 hover:underline"
            >
              View All
            </Link>

          </div>

          <div>

            {recentPatients.length === 0 ? (

              <div className="py-20 text-center">

                <Users className="mx-auto h-14 w-14 text-slate-300" />

                <h3 className="mt-4 text-lg font-semibold">
                  No Patients Yet
                </h3>

                <p className="mt-2 text-slate-500">
                  Start by registering your first patient.
                </p>

              </div>

            ) : (

              recentPatients.map((patient) => (

                <div
                  key={patient.id}
                  className="flex items-center justify-between border-b last:border-none px-6 py-5 hover:bg-slate-50 transition"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white">

                      {patient.firstName.charAt(0)}
                      {patient.lastName.charAt(0)}

                    </div>

                    <div>

                      <p className="font-semibold">

                        {patient.firstName} {patient.lastName}

                      </p>

                      <p className="text-sm text-slate-500">

                        {patient.hospitalNumber}

                      </p>

                    </div>

                  </div>

                  <Link
                    href={`/patients/${patient.id}`}
                    className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-100 transition"
                  >
                    View
                  </Link>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}