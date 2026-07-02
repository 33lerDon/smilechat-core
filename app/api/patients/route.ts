import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error("PRISMA ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed",
        error: String(error),
      },
      { status: 500 }
    );
  }
}