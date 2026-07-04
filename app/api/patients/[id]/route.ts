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

    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return NextResponse.json(
        { message: "Patient not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch patient." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        hospitalNumber: body.hospitalNumber,
        firstName: body.firstName,
        middleName: body.middleName || null,
        lastName: body.lastName,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth
          ? new Date(body.dateOfBirth)
          : null,

        phone: body.phone,
        email: body.email || null,

        occupation: body.occupation || null,
        address: body.address || null,
        city: body.city || null,
        state: body.state || null,
        country: body.country || "Nigeria",

        bloodGroup: body.bloodGroup || null,
        genotype: body.genotype || null,
        maritalStatus: body.maritalStatus || null,

        emergencyContact: body.emergencyContact || null,
        emergencyPhone: body.emergencyPhone || null,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update patient." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.patient.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Patient deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete patient." },
      { status: 500 }
    );
  }
}