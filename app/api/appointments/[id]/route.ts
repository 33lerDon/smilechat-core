import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        patient: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}