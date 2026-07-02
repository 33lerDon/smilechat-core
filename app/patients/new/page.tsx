"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function NewPatientPage() {
  const router = useRouter();

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
    country: "Nigeria",

    bloodGroup: "",
    genotype: "",
    maritalStatus: "",

    emergencyContact: "",
    emergencyPhone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to register patient.");
        return;
      }

      alert("Patient registered successfully!");

      router.push("/patients");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Register New Patient
        </h1>

        <p className="text-slate-500 mt-1">
          Enter the patient's information below.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <Card title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Hospital Number"
              name="hospitalNumber"
              value={formData.hospitalNumber}
              onChange={handleChange}
              required
            />

            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <Input
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female"]}
            />

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </Card>

        <Card title="Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </Card>

        <Card title="Medical Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              options={[
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
              ]}
            />

            <Select
              label="Genotype"
              name="genotype"
              value={formData.genotype}
              onChange={handleChange}
              options={["AA", "AS", "AC", "SS", "SC"]}
            />

            <Select
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              options={[
                "Single",
                "Married",
                "Divorced",
                "Widowed",
              ]}
            />
          </div>
        </Card>

        <Card title="Emergency Contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Emergency Contact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
            />

            <Input
              label="Emergency Phone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">
            Save Patient
          </Button>
        </div>
      </form>
    </div>
  );
}