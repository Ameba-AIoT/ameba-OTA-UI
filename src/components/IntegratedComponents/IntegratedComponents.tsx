"use client";

import { Container, Text, Button } from "@mantine/core";
import Image from "next/image";
import { FileSelect } from "../FileSelect/FileSelect";
import { TableSelection } from "../Table/TableSelection";
import { useState, useCallback } from "react";

export function IntegratedComponents() {
  const [filesSelected, setFilesSelected] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [anyChecked, setAnyChecked] = useState(false);
  const [selectedIps, setSelectedIps] = useState<string[]>([]);
  const [isAnyOtaInProgress, setIsAnyOtaInProgress] = useState(false);

  const handleSelectionChange = useCallback(
    (
      isAnyChecked: boolean,
      selectedIps: string[],
      isAnyOtaInProgress: boolean
    ) => {
      setAnyChecked(isAnyChecked);
      setSelectedIps(selectedIps);
      setIsAnyOtaInProgress(isAnyOtaInProgress);
    },
    []
  );
  const handleStartOta = async () => {
    const payload = "start_ota";

    try {
      const responses = await Promise.all(
        selectedIps.map((ip) =>
          fetch(`http://${ip}:5000`, {
            method: "POST",
            body: payload,
          })
        )
      );
      console.log(responses);
    } catch (error) {
      console.error("Failed to start OTA:", error);
    }
  };

  return (
    <header style={{ padding: 0, margin: 0 }}>
      <Container
        fluid
        style={{
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center", // Align items vertically in the center
          justifyContent: "flex-start", // Distribute space between items
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          <Image src={"/AmebaIOT.png"} width={500} height={271} alt="Logo" />
          <div
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "calc(100% + 27px)", // Adjust position of the line
              borderLeft: "1px solid #ccc", // Vertical line style
              margin: "20px 0",
            }}
          />
        </div>
        <div style={{ marginLeft: "70px" }}>
          <Text size="xl" fw={700}>
            Instructions: <br />
            This tool aims to provide a user-friendly approach to do OTA
            firmware update
            <br /> for AMB82 Mini Board. Follow the steps below to do OTA
            firmware update.
            <br />
            <br />
            **Friendly reminder that if you do not call the OTA API in your
            Arduino
            <br /> sketch and compile, the next OTA iteration will not work
            properly.**
          </Text>
        </div>
      </Container>
      <hr style={{ borderTop: "1px solid #ccc", margin: "20px 0" }} />
      <div style={{ marginTop: "50px", display: "flex", gap: "20px" }}>
        <div>
          <Text size="xl" fw={700} style={{ marginLeft: "10px" }}>
            Step 1: Select File for OTA transfer
          </Text>
          <FileSelect
            onFilesSelected={setFilesSelected}
            onUploadComplete={setFileUploaded}
          />
        </div>
        <div
          style={{
            borderLeft: "1px solid #ccc",
            marginLeft: "0px",
            marginRight: "30px",
            height: "550px",
          }}
        />

        <div>
          <Text size="xl" fw={700}>
            Step 2: Select one or more connected clients and click Start OTA
            button
          </Text>
          <TableSelection onSelectionChange={handleSelectionChange} />
          <Button
            disabled={
              !filesSelected ||
              !anyChecked ||
              !fileUploaded ||
              isAnyOtaInProgress
            }
            style={{
              marginTop: "20px",
              width: "600px",
              height: "50px",
              fontSize: "16px",
            }}
            onClick={handleStartOta}
          >
            Start OTA
          </Button>
        </div>
        {/* <div
          style={{
            borderLeft: "1px solid #ccc",
            marginLeft: "-25px",
            marginRight: "50px",
            height: "550px",
          }}
        />
        <div>
          <Text size="xl" fw={700}>
            Step 3: Check the progress of OTA firmware updates on Clients
          </Text>
        </div> */}
      </div>
    </header>
  );
}
