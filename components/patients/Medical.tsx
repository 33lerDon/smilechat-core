import Select from "@/components/ui/Select";

type Props = {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function Medical({
  formData,
  handleChange,
}: Props) {
  return (
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
        options={[
          "AA",
          "AS",
          "AC",
          "SS",
          "SC",
        ]}
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
  );
}