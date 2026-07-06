import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
      },
      orderBy: {
        appointmentDate: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        patientId: body.patientId,
        appointmentDate: new Date(body.appointmentDate),
        appointmentTime: body.appointmentTime,
        purpose: body.purpose,
        status: body.status || "Scheduled",
        notes: body.notes || null,
      },
      include: {
        patient: true,
      },
    });

    return NextResponse.json(appointment, {
      status: 201,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}