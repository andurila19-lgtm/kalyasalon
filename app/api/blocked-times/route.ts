import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const dynamic = "force-dynamic";

// GET /api/blocked-times
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "blocked-times",
      where: date ? { date: { equals: date } } : undefined,
      limit: 100,
    });

    return NextResponse.json({
      success: true,
      docs: result.docs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data blocked times.", error: error?.message },
      { status: 500 }
    );
  }
}

// POST /api/blocked-times (Create new blocked time interval)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, startTime, endTime, reason, staffId } = body;

    if (!date || !startTime || !endTime || !reason) {
      return NextResponse.json(
        { success: false, message: "Tanggal, jam mulai, jam selesai, dan alasan wajib diisi." },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });
    const newBlock = await payload.create({
      collection: "blocked-times",
      data: {
        date,
        startTime,
        endTime,
        reason,
        staff: staffId || undefined,
        active: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Jadwal blokir waktu berhasil dibuat.",
        doc: newBlock,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat jadwal blokir waktu.", error: error?.message },
      { status: 500 }
    );
  }
}
