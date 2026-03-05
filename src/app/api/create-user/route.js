import clientPromise from '../mongodb';

export async function POST(req) {
  const body = await req.json();
  const { name, mobile, id, email, password } = body;

  if (!name || !mobile || !id || !email || !password) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    console.log('[API] Received POST /api/create-user');
    const client = await clientPromise;
    console.log('[API] Connected to MongoDB');
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if user with same id or email already exists
    const existingUser = await usersCollection.findOne({ $or: [{ id }, { email }] });
    if (existingUser) {
      console.log('[API] User already exists:', existingUser);
      return new Response(JSON.stringify({ error: 'User with this ID or email already exists' }), { status: 409 });
    }

    const newUser = { name, mobile, id, email, password };
    await usersCollection.insertOne(newUser);
    console.log('[API] User created:', newUser);
    return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), { status: 201 });
  } catch (error) {
    console.error('[API] Error in /api/create-user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message, stack: error.stack }), { status: 500 });
  }
}
