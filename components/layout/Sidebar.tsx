import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/" },
  { name: "Patients", href: "/patients" },
  { name: "Appointments", href: "#" },
  { name: "Clinical Records", href: "#" },
  { name: "Billing", href: "#" },
  { name: "Inventory", href: "#" },
  { name: "Reports", href: "#" },
  { name: "Settings", href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-teal-700 text-white">
      <div className="p-6 border-b border-teal-600">
        <h1 className="text-2xl font-bold">🦷 SmileChat</h1>

        <p className="text-sm text-teal-100 mt-1">
          Dental Practice Management
        </p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-6 py-3 hover:bg-teal-600 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}