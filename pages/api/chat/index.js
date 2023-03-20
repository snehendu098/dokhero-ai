import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";
import { openai } from "@/utils/openai-client";
import { pinecone } from "@/utils/pinecone-client";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";

export default async function handler(req, res) {
  const { question } = req.body;
  const namespace = req.headers["namespace"];

  if (!question) {
    return res.status(400).json({ message: "No question in the request" });
  }

  try {
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const index = pinecone.Index(PINECONE_INDEX_NAME);
    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      { pineconeIndex: index, namespace: namespace, textKey: "text" }
    );

    const model = openai;
    // create the chain
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      returnSourceDocuments: false,
    });

    //Ask a question
    const response = await chain.call({ query: sanitizedQuestion });

    res.status(200).json({ data: response });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error || "Unknown error." });
  }
}
