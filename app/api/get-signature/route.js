import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

export async function POST(req) {
  const { timestamp, upload_preset } = await req.json();
  console.log('Received timestamp:', timestamp); // Debugging log
  console.log('Received upload_preset:', upload_preset); // Debugging log
  
  const secret = process.env.CLOUDINARY_API_SECRET;
  const paramsToSign = `upload_preset=${upload_preset}&timestamp=${timestamp}&${secret}`;

//   Generate the HMAC SHA1 signature
  const signature = crypto
    .createHmac('sha1', secret) // Use HMAC with SHA1
    .update(paramsToSign)
    .digest('hex');

  console.log('String to sign:', paramsToSign); // For debugging
  console.log('Generated signature:', signature); // For debugging

  return new Response(JSON.stringify({ signature }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
