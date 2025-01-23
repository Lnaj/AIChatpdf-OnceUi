"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCompletion } from "ai/react";
import { MediaUpload } from "@/once-ui/modules";
import {
  RevealFx,
  Card,
  Flex,
  Button,
  Spinner,
} from "@/once-ui/components";

export default function Home() {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null); // Track upload status
  const [fileName, setFileName] = useState<string | null>(null); // Track uploaded file name

  // File Upload Handler
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // Extract the first file

    if (!file || file.type !== "application/pdf") {
      setUploadStatus("Please upload a valid PDF");
      return;
    }

    setFileName(file.name); // Update the file name
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.set("file", file);

    try {
      const response = await fetch("/api/addData", {
        method: "POST",
        body: formData,
      });

      const body = await response.json();

      if (body.success) {
        setUploadStatus("File uploaded and indexed successfully.");
      } else {
        setUploadStatus("Failed to process the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred during upload.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"], // Correct usage
    },
  });

  // AI Completion Hook
  const { completion, input, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/chat",
    });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* Header Section */}
      <RevealFx speed="fast" delay={0.5} translateY={10}>
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to Ask AI! 🤖
        </h1>
      </RevealFx>
      <RevealFx speed="slow" delay={1} translateY={10}>
        <h2 className="text-gray-600 text-center">
          Upload a PDF and ask questions to get AI-powered responses.
        </h2>
      </RevealFx>

      {/* Dropzone for PDF Upload */}
      <Flex
        align="center"
        horizontal="center"
        direction="column"
        gap="m"
        padding="m"
        className="max-w-lg mx-auto"
        style={{ width: "500px", height: "300px", margin: "auto" }}
      >
        <MediaUpload
          compress
          aspectRatio="16 / 9"
          quality={1.98}
          initialPreviewImage="/images/nf12.png"
          accept="application/pdf"
          onFileUpload={async (file) => {
            // Ensure file handling works as expected
            const acceptedFile = Array.isArray(file) ? file[0] : file;

            if (!acceptedFile || acceptedFile.type !== "application/pdf") {
              setUploadStatus("Please upload a valid PDF");
              return;
            }

            try {
              console.log("Uploaded file:", acceptedFile);
              setFileName(acceptedFile.name); // Save the file name
              setUploadStatus("File uploaded successfully!");
            } catch (error) {
              console.error("Error handling the file upload:", error);
              setUploadStatus("An error occurred while uploading the file.");
            }
          }}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300"
        />
        {fileName && (
          <p className="mt-4 text-blue-300 text-center">
            <strong>Selected File:</strong> {fileName}
          </p>
        )}
        {uploadStatus && (
          <p className={`mt-4 text-center text-sm ${uploadStatus.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {uploadStatus}
          </p>
        )}
      </Flex>

      {/* Chat Section */}
      <div className="w-full max-w-md py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex flex-col gap-6"
        >
          <Flex
  align="center"
  horizontal="center"
  direction="column"
  gap="m"
  padding="m"
  className="max-w-lg mx-auto"
  style={{ width: "500px", height: "300px", margin: "auto" }}
  // onBackground="brand-strong"
  // background="brand-medium"
  position="relative" // Ensures no interference with input
>
  <p className="text-center">
    How to get started?{" "}
    {isLoading ? (
      <Spinner size="m" />
    ) : (
      completion || "Enter a prompt and hit Submit."
    )}
  </p>
  <input
    className="w-full text-black border border-blue-400 rounded p-2"
    value={ input }
    placeholder="Enter your prompt..."
    onChange={handleInputChange}
    aria-label="Prompt input"
  />
  </Flex>
  <Flex horizontal="space-between">
    <Button
      disabled={isLoading}
      type="submit"
      variant="primary"
      style={{
        backgroundColor: isLoading ? "#A9A9A9" : "#1E90FF",
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? "Loading..." : "Submit"}
    </Button>
    <Button
      type="button"
      variant="secondary"
      onClick={() => alert("Unsubmit action!")}
    >
      Unsubmit
    </Button>
  </Flex>

        </form>
      </div>
    </main>
  );
}
