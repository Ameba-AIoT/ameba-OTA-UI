"use client";
import { useForm } from "@mantine/form";
import { Dropzone } from "@mantine/dropzone";
import { Center, Text, CloseButton, Button } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import { useState } from "react";

interface FormValues {
  files: File[];
}

interface FileSelectProps {
  onFilesSelected: (hasFiles: boolean) => void;
  onUploadComplete: (isUploaded: boolean) => void;
}

export function FileSelect({
  onFilesSelected,
  onUploadComplete,
}: FileSelectProps) {
  const form = useForm<FormValues>({
    initialValues: { files: [] },
  });

  const [uploading, setUploading] = useState(false);

  const handleDrop = async (files: File[]) => {
    const binFiles = files.filter((file) => file.name.endsWith(".bin"));
    if (binFiles.length > 0) {
      form.setFieldValue("files", binFiles);
      form.setFieldError("files", null);
      onFilesSelected(true);
    } else {
      form.setFieldError("files", "Select binary files only");
      onFilesSelected(false);
    }
  };

  const handleRemoveFile = async (index: number) => {
    try {
      const response = await fetch("/api/uploadfile", {
        method: "DELETE",
      });

      onUploadComplete(false);

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      const updatedFiles = form.values.files.filter((_, i) => i !== index);
      form.setFieldValue("files", updatedFiles);
      onFilesSelected(updatedFiles.length > 0);
    } catch (error) {
      console.error("Error deleting file:", error);
      // Handle error
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);

      const formData = new FormData();
      form.values.files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/uploadfile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      onUploadComplete(true);

      // Optionally handle success
    } catch (error) {
      console.error("Error uploading file:", error);
      onUploadComplete(false);
      // Handle error
    } finally {
      setUploading(false);
    }
  };

  const selectedFiles = form.values.files.map((file, index) => (
    <Text key={file.name} style={{ color: "green" }}>
      <b>{file.name}</b> ({(file.size / 1024).toFixed(2)} kb)
      <CloseButton size="xs" onClick={() => handleRemoveFile(index)} />
    </Text>
  ));

  return (
    <>
      <Dropzone
        style={{ marginLeft: "10px" }}
        h={400}
        w={500}
        p={0}
        multiple={false}
        onDrop={handleDrop}
        onReject={() => form.setFieldError("files", "Select binary files only")}
      >
        <Center h={400}>
          <Dropzone.Idle>
            Drop .bin file here or click to select .bin file to upload
          </Dropzone.Idle>
          <Dropzone.Accept>
            Drop .bin file here or click to select .bin file to upload
          </Dropzone.Accept>
          <Dropzone.Reject>Files are invalid</Dropzone.Reject>
        </Center>
      </Dropzone>

      {form.errors.files && (
        <Text c="red" mt={5} style={{ marginLeft: "10px" }}>
          {form.errors.files}
        </Text>
      )}

      {selectedFiles.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Text style={{ marginBottom: "5px", color: "green" }}>
              Selected files:
            </Text>
            {selectedFiles}
          </div>
          <Button
            style={{ marginLeft: "50px" }}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      )}
    </>
  );
}
