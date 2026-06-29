export default function Header() {
  return (
    <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back, Dr. Ismail
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold">
          SmileChat Dental Clinic
        </p>

        <p className="text-sm text-gray-500">
          Katsina, Nigeria
        </p>
      </div>
    </header>
  );
}