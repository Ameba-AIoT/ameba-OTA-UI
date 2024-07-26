import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("files");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const filePath = path.resolve(UPLOAD_DIR, "ota.bin");
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ success: true, name: "ota.bin" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, message: "File upload failed" });
  }
};

const DELETE = async (req: NextRequest) => {
  try {
    const filePath = path.resolve(UPLOAD_DIR, "ota.bin");

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true, message: "File deleted" });
    } else {
      return NextResponse.json({ success: false, message: "File not found" });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({
      success: false,
      message: "File deletion failed",
    });
  }
};

const GET = async (req: NextRequest) => {
  try {
    const filePath = path.resolve(UPLOAD_DIR, "ota.bin");

    if (fs.existsSync(filePath)) {
      const fileStats = fs.statSync(filePath);
      const fileContent = fs.readFileSync(filePath);
      const headers = new Headers();
      headers.append("Content-Disposition", `attachment; filename=ota.bin`);
      headers.append("Content-Type", "application/octet-stream");
      headers.append("Content-Length", fileStats.size.toString());

      const response = new NextResponse(fileContent, { headers });
      return response;
    } else {
      const response = NextResponse.json({
        success: false,
        message: "File not found",
      });
      return response;
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json({
      success: false,
      message: "File download failed",
    });
  }
};

export { POST, DELETE, GET };
