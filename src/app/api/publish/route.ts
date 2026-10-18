import { NextResponse } from 'next/server';
import { DataService } from '@/services/data-service';

export async function POST() {
  try {
    const result = DataService.publishChanges();
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
