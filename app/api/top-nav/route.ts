import { NextRequest } from 'next/server'
import { ZodError } from 'zod'
import dummyData from '@/dummy/top-navigation.json'

export const revalidate = 60

export async function GET(request: NextRequest) {
  try {
    const data = dummyData

    return Response.json(data)
  } catch (error) {
    return Response.json(
      { status: 400 },
      {
        status: error instanceof ZodError ? 400 : 500,
      }
    )
  }
}
