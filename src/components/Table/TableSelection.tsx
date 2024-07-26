import cx from "clsx";
import { useState, useEffect } from "react";
import { Table, Checkbox, ScrollArea, rem, Text } from "@mantine/core";
import classes from "./TableSelection.module.css";

interface TableSelectionProps {
  onSelectionChange: (
    isAnyChecked: boolean,
    selectedIps: string[],
    isAnyOtaInProgress: boolean
  ) => void;
}

export function TableSelection({ onSelectionChange }: TableSelectionProps) {
  const [selection, setSelection] = useState<string[]>([]);
  const [data, setData] = useState<
    { id: string; ipaddress: string; OTA_state: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/connectedclients");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const { recentEntries } = await response.json();
        const newData = recentEntries.map(
          (entry: { ip: string; OTA_state: string }) => ({
            id: entry.ip,
            ipaddress: entry.ip,
            OTA_state: entry.OTA_state,
          })
        );
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 3500); // Poll every 3.5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    const selectedIps = selection.map(
      (id) => data.find((item) => item.id === id)?.ipaddress || ""
    );
    const isAnyOtaInProgress = selection.some(
      (id) =>
        data.find((item) => item.id === id)?.OTA_state ===
        "OTA_STATE_DOWNLOAD_FIRMWARE_IN_PROGRESS"
    );
    onSelectionChange(selection.length > 0, selectedIps, isAnyOtaInProgress);
  }, [selection, data, onSelectionChange]);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const sortedData = [...data].sort((a, b) =>
    a.ipaddress.localeCompare(b.ipaddress)
  );

  const rows = sortedData.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td style={{ textAlign: "center", fontSize: "16px" }}>
          {item.ipaddress}
        </Table.Td>
        <Table.Td style={{ textAlign: "center", fontSize: "16px" }}>
          {item.OTA_state}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea style={{ height: rem(280) }} type="always">
      <Table
        style={{ minWidth: rem(400), maxWidth: rem(600) }}
        verticalSpacing="sm"
        highlightOnHover
      >
        <Table.Thead className={classes.stickyHeader}>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              {data.length > 0 && (
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== data.length
                  }
                />
              )}
            </Table.Th>
            <Table.Th
              className="underline"
              style={{ fontSize: "16px", textAlign: "center" }}
            >
              Connected Clients IP Address
            </Table.Th>
            {data.length > 0 && (
              <Table.Th
                className="underline"
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                OTA State
              </Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        {data.length > 0 ? (
          <Table.Tbody>{rows}</Table.Tbody>
        ) : (
          <Table.Tbody>
            <Table.Tr>
              <Table.Td
                style={{ textAlign: "left", paddingLeft: "200px" }}
                colSpan={2}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "red",
                    fontSize: 24,
                  }}
                >
                  No connected clients
                </Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        )}
      </Table>
    </ScrollArea>
  );
}
