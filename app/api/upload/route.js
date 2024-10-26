import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server"; 

  export const config = {
    api: {
      bodyParser: false, // Disable the default body parser
    },
  };

  export async function POST(req) {
    try {
      const formData = await req.formData();
      const file = formData.get("image");
  
      if (!file) {
        return NextResponse.json(
          { error: "No file uploaded" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer(); // CONVERT FILE TO BUFFER
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => { // UPLOAD BUFFER TO CLOUD
        cloudinary.uploader.upload_stream(
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
  
      return NextResponse.json({ secure_url: result.secure_url }); // RETURN RESPONSE BACK TO CLIENT
    } catch (error) {
      console.error("Upload error:", error);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }
  }