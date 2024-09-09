

export async function GET(request: Request) {
    return new Response('hi')
}

export async function POST(req: Request) {
    const body = await req.json()
    return new Response('OK')

    
}