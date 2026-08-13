import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots, getTodayDateJakarta } from "@/lib/availability";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || getTodayDateJakarta();
    const serviceId = searchParams.get("serviceId");
    const staffId = searchParams.get("staffId") || undefined;

    if (!serviceId) {
      return NextResponse.json(
        { success: false, message: "Parameter serviceId wajib disertakan." },
        { status: 400 }
      );
    }

    const availability = await getAvailableSlots({
      date,
      serviceId,
      staffId,
    });

    return NextResponse.json({
      success: true,
      data: availability,
    });
  } catch (error: any) {
    console.error("[API Available Slots] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data slot ketersediaan salon.",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
