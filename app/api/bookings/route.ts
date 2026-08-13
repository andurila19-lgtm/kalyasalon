import { NextRequest, NextResponse } from "next/server";
import { createBookingAtomically } from "@/lib/booking-service";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const dynamic = "force-dynamic";

// GET /api/bookings (List bookings for admin or date range)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const status = searchParams.get("status");
    const limit = Number(searchParams.get("limit")) || 50;

    const payload = await getPayload({ config: configPromise });

    const whereClauses: any[] = [];
    if (date) {
      whereClauses.push({ bookingDate: { equals: date } });
    }
    if (status) {
      whereClauses.push({ status: { equals: status } });
    }

    const result = await payload.find({
      collection: "bookings",
      where: whereClauses.length > 0 ? { and: whereClauses } : undefined,
      sort: "-createdAt",
      limit,
    });

    return NextResponse.json({
      success: true,
      docs: result.docs,
      totalDocs: result.totalDocs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil daftar booking.", error: error?.message },
      { status: 500 }
    );
  }
}

// POST /api/bookings (Public atomic booking creation)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      staffId,
      bookingDate,
      startTime,
      notes,
    } = body;

    const result = await createBookingAtomically({
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      staffId,
      bookingDate,
      startTime,
      notes,
    });

    if (!result.success) {
      const statusCode = result.error === "SLOT_UNAVAILABLE" ? 409 : 400;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("[API Bookings POST] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kendala pada server saat memproses booking.",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
