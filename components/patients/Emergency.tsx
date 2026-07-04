import Input from "@/components/ui/Input";

type Props = {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function Emergency({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <Input
        label="Emergency Contact Name"
        name="emergencyContact"
        value={formData.emergencyContact}
        onChange={handleChange}
      />

      <Input
        label="Emergency Contact Phone"
        name="emergencyPhone"
        value={formData.emergencyPhone}
        onChange={handleChange}
      />

    </div>
  );
}