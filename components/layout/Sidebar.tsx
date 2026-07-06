import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Wallet,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: CalendarDays,
  },
  {
    name: "Clinical Records",
    href: "#",
    icon: FileText,
  },
  {
    name: "Billing",
    href: "#",
    icon: Wallet,
  },
  {
    name: "Inventory",
    href: "#",
    icon: Package,
  },
  {
    name: "Reports",
    href: "#",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "#",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-teal-700 text-white">

      <div className="p-6 border-b border-teal-600">

        <h1 className="text-2xl font-bold">
          🦷 SmileChat
        </h1>

        <p className="text-sm text-teal-100 mt-1">
          Dental Practice Management
        </p>

      </div>

      <nav className="mt-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 hover:bg-teal-600 transition-colors"
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}