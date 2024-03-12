import { NextRequest } from 'next/server'
import { ZodError } from 'zod'
import productDummyData from '@/dummy/blog.json'

export const revalidate = 60

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const blog = productDummyData.find((x) => x.id === id)

    return Response.json({
      ...blog,
    })
  } catch (error) {
    return Response.json(
      { status: 400 },
      {
        status: error instanceof ZodError ? 400 : 500,
      }
    )
  }
}
