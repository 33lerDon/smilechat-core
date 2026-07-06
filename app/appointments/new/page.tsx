"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/button";

import { notify } from "@/lib/notify";

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  hospitalNumber: string;
};

export default function NewAppointmentPage() {
  const router = useRouter();

  const [patients, setPatients] = useState<Patient[]>([]);

  const [formData, setFormData] = useState({
    patientId: "",
    appointmentDate: "",
    appointmentTime: "",
    purpose: "",
    status: "Scheduled",
    notes: "",
  });

  useEffect(() => {
    async function loadPatients() {
      try {
        const res = await fetch("/api/patients");
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadPatients();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        notify.error(error.message || "Failed to book appointment.");
        return;
      }

      notify.success("Appointment booked successfully!");

      router.push("/appointments");
      router.refresh();
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong.");
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      <div>
        <h1 className="text-3xl font-bold">
          Book Appointment
        </h1>

        <p className="text-slate-500 mt-2">
          Schedule a new patient appointment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <Card title="Appointment Details">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Select
              label="Patient"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              options={patients.map((patient) => ({
                value: patient.id,
                label: `${patient.hospitalNumber} — ${patient.firstName} ${patient.lastName}`,
              }))}
            />

            <Input
              label="Appointment Date"
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />

            <Input
              label="Appointment Time"
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />

            <Input
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Dental Consultation"
              required
            />

            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: "Scheduled", label: "Scheduled" },
                { value: "Arrived", label: "Arrived" },
                { value: "In Treatment", label: "In Treatment" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />

          </div>

          <div className="mt-6">

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>

            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-600 focus:outline-none"
            />

          </div>

        </Card>

        <div className="flex justify-end">

          <Button type="submit">
            Book Appointment
          </Button>

        </div>

      </form>

    </div>
  );
}