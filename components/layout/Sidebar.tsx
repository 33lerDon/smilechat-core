"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Wallet,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Stethoscope,
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
    href: "#",
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
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="bg-blue-600 p-3 rounded-xl">
            <Stethoscope className="w-6 h-6" />
          </div>

          <div>

            <h1 className="text-2xl font-bold">
              SmileChat
            </h1>

            <p className="text-sm text-slate-400">
              Dental EMR
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 py-6">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`mx-4 mb-2 flex items-center gap-4 rounded-xl px-5 py-3 transition-all
                ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>

            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}