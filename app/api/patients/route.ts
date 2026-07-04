import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.trim() || "";

    const patients = await prisma.patient.findMany({
      where: search
        ? {
            OR: [
              {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                hospitalNumber: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch patients",
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

    const patient = await prisma.patient.create({
      data: {
        hospitalNumber: body.hospitalNumber,
        firstName: body.firstName,
        middleName: body.middleName || null,
        lastName: body.lastName,
        gender: body.gender,
        dateOfBirth: new Date(body.dateOfBirth),

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

    return NextResponse.json(patient, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create patient",
      },
      {
        status: 500,
      }
    );
  }
}