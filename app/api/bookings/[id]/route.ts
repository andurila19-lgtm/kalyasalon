import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { cancelBooking, rescheduleBooking } from "@/lib/booking-service";

export const dynamic = "force-dynamic";

// PATCH /api/bookings/[id] (Update status / cancel / reschedule)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, status, newDate, newStartTime } = body;

    // Handle Cancel Action
    if (action === "cancel") {
      const cancelResult = await cancelBooking(id);
      return NextResponse.json(cancelResult);
    }

    // Handle Reschedule Action
    if (action === "reschedule") {
      if (!newDate || !newStartTime) {
        return NextResponse.json(
          { success: false, message: "newDate dan newStartTime wajib diisi untuk reschedule." },
          { status: 400 }
        );
      }
      const rescheduleResult = await rescheduleBooking({
        bookingId: id,
        newDate,
        newStartTime,
      });
      const statusCode = rescheduleResult.success ? 200 : 409;
      return NextResponse.json(rescheduleResult, { status: statusCode });
    }

    // Handle Status Update (COMPLETED, NO_SHOW, CONFIRMED, etc.)
    if (status) {
      const payload = await getPayload({ config: configPromise });
      const updated = await payload.update({
        collection: "bookings",
        id,
        data: {
          status,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Status booking berhasil diubah menjadi ${status}.`,
        booking: updated,
      });
    }

    return NextResponse.json(
      { success: false, message: "Aksi tidak dikenali." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[API Bookings ID PATCH] Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui status booking.", error: error?.message },
      { status: 500 }
    );
  }
}

// GET /api/bookings/[id] (Single booking detail)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config: configPromise });
    const booking = await payload.findByID({
      collection: "bookings",
      id,
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Data booking tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data booking.", error: error?.message },
      { status: 500 }
    );
  }
}
