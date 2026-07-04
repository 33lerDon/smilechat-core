import Input from "@/components/ui/Input";

type Props = {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function Contact({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <Input
        label="Email Address"
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
        label="Home Address"
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
  );
}