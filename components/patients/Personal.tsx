import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

type Props = {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function Personal({
  formData,
  handleChange,
}: Props) {
  return (
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
  );
}