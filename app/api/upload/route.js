import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";
import { NextResponse } from "next/server"; 

  export const config = {
    api: {
      bodyParser: false, // Disable the default body parser
    },
  };

  // Convert web request to stream then turn it into buffer
  async function requestToStream(request) {
    const { Readable } = require("stream");
    
    const readable = new Readable();
    readable._read = () => {}; // Override so that it can push
    readable.push(Buffer.from(await request.arrayBuffer())); // turn the stream into a buffer
    readable.push(null); // end 
    return readable;
  }

  export async function POST(req) {
    const form = formidable({ multiples: true }); // Enable multiple file uploads

    try {
      const stream = await requestToStream(req); // Convert request to a stream

      return new Promise((resolve, reject) => {
        form.parse(stream, { headers: req.headers }, async (err, fields, files) => {
          if (err) { // error handling
            console.error("Error parsing the file:", err);
            return reject(
              new Response(JSON.stringify({ error: "Failed to parse the file" }), { status: 500 })
            );
          }
  
          const file = files.image;
          if (!file || file.length === 0) {
            console.error("No file uploaded");
            return reject(
              new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 })
            );
          }
  
          try {
            const result = await cloudinary.uploader.upload(file.filepath, { // UPLOAD TO CLOUD
              upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            });
            return resolve(
              new Response(JSON.stringify({ secure_url: result.secure_url }), { status: 200 }) // RETURN RESPONSE BACK TO CLIENT
            );
          } catch (error) {
            console.error("Upload error:", error);
            return reject(
              new Response(JSON.stringify({ error: "Failed to upload to Cloudinary" }), { status: 500 })
            );
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }