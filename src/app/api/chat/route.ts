import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings, OpenAI } from "@langchain/openai";
import { LangChainAdapter } from "ai";

export const maxDuration = 60;

import { NextRequest } from 'next/server';
 
export async function POST(request: NextRequest) {
  try {
    // Parse the request body only once
    const { prompt } = await request.json();

    // Initialize Pinecone Client
    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME as string);

    // Initialize our vector store
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
      { pineconeIndex }
    );

    // Define the LangChain chain
    const model = new OpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
    });
    
    // Generate the response stream
    const stream = await model.stream(prompt);

    // Return the response
    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("An error occurred", { status: 500 });
  }
}
