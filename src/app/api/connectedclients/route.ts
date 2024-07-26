import { NextRequest, NextResponse } from "next/server";

// Define the array to store the IP and timestamp pairs
let ipStore: Array<{ ip: string; timestamp: number; OTA_state: string }> = [];

const POST = async (req: NextRequest) => {
  // Get the IP address
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.ip ||
    req.headers.get("x-real-ip") ||
    "";
  // console.log("Client IP address is:", ip);

  const requestData = await req.json();
  // console.log("Request data is:", requestData);

  const { OTA_state } = requestData;

  let formattedIp = ip;
  // Remove the ::ffff: prefix if present
  if (formattedIp && formattedIp.startsWith("::ffff:")) {
    formattedIp = formattedIp.substring(7);
  }

  // console.log("Formatted Client IP address is:", formattedIp);

  const currentTime = Date.now();
  // console.log("Request received at:", currentTime);

  // Check if the formatted IP is already in the array
  const ipIndex = ipStore.findIndex((entry) => entry.ip === formattedIp);

  // If the IP does not exist in the array, add it along with the current timestamp
  if (ipIndex === -1) {
    ipStore.push({ ip: formattedIp, timestamp: currentTime, OTA_state });
    // console.log("IP and timestamp stored:", {
    //   ip: formattedIp,
    //   timestamp: currentTime,
    // });
  } else {
    // If the IP exists, update the timestamp
    ipStore[ipIndex].timestamp = currentTime;
    ipStore[ipIndex].OTA_state = OTA_state;
    // console.log("Timestamp updated for IP:", {
    //   ip: formattedIp,
    //   timestamp: currentTime,
    // });
  }

  // Log the entire ipStore array
  // console.log("Current state of ipStore:", ipStore);

  // Send a response
  return NextResponse.json({ message: "POST data" });
};

const GET = async (req: NextRequest) => {
  const currentTime = Date.now();

  // Filter the entries in ipStore where the timestamp is within the last 10 seconds
  const recentEntries = ipStore.filter(
    (entry) => currentTime - entry.timestamp <= 4500
  );

  // Log the filtered entries
  // console.log("Filtered recent entries:", recentEntries);

  // Send a response with the recent entries
  return NextResponse.json({ recentEntries });

  // For debug purposes
  // Create HTML content to display the recent entries
  // const htmlContent = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Connected Clients</title>
  //     </head>
  //     <body>
  //       <h1>Connected Clients</h1>
  //       <ul>
  //         ${recentEntries
  //           .map(
  //             (entry) =>
  //               `<li>IP: ${entry.ip}, Timestamp: ${new Date(
  //                 entry.timestamp
  //               ).toLocaleString()}</li>`
  //           )
  //           .join("")}
  //       </ul>
  //     </body>
  //   </html>
  // `;

  // // Send the HTML response
  // return new NextResponse(htmlContent, {
  //   headers: { "Content-Type": "text/html" },
  // });
};

export { POST, GET };
