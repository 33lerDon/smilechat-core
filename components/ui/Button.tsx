type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant]} px-5 py-3 rounded-lg font-semibold transition duration-200`}
    >
      {children}
    </button>
  );
}