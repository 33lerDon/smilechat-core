"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPatientPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    hospitalNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",

    phone: "",
    email: "",

    occupation: "",
    address: "",
    city: "",
    state: "",
    country: "",

    bloodGroup: "",
    genotype: "",
    maritalStatus: "",

    emergencyContact: "",
    emergencyPhone: "",
  });

  useEffect(() => {
    async function loadPatient() {
      const res = await fetch(`/api/patients/${id}`);
      const data = await res.json();

      setFormData({
        ...data,
        dateOfBirth: data.dateOfBirth
          ? data.dateOfBirth.split("T")[0]
          : "",
      });

      setLoading(false);
    }

    loadPatient();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(`/api/patients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Patient updated successfully.");
      router.push("/patients");
      router.refresh();
    } else {
      alert("Failed to update patient.");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Edit Patient
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div className="grid grid-cols-2 gap-6">

          <input
            name="hospitalNumber"
            value={formData.hospitalNumber}
            onChange={handleChange}
            placeholder="Hospital Number"
            className="border rounded-lg p-3"
          />

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded-lg p-3"
          />

          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
            className="border rounded-lg p-3"
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border rounded-lg p-3"
          />

          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded-lg p-3"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Occupation"
            className="border rounded-lg p-3"
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border rounded-lg p-3"
          />

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded-lg p-3"
          />

          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border rounded-lg p-3"
          />

        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Update Patient
        </button>

      </form>

    </div>
  );
}