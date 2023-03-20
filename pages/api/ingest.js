import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";
import { pinecone } from "../../utils/pinecone-client";
import { PINECONE_INDEX_NAME } from "../../config/pinecone.js";
import { Document } from "langchain/document";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "@/utils/prisma";

async function processMarkDownFiles(data) {
  try {
    let docs = data.map((item) => {
      return new Document({
        pageContent: item?.docs,
        metadata: item?.metadata,
      });
    });
    return docs;
  } catch (error) {
    console.log(error);
  }
}

async function createInquiry(req, res, userId) {
  const { namespace, name } = req.body;
  try {
    const newEntry = await prisma.doc.create({
      data: {
        name,
        userId,
        namespace,
      },
    });
    return newEntry;
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
}

async function handler(req, res) {
  const { data, namespace } = req.body;
  const { user } = await getSession(req, res);

  try {
    /*load raw docs from the markdown files in the directory */
    const rawDocs = await processMarkDownFiles(data);

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log("split docs", docs);

    console.log("creating vector store...");
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    console.log(index);
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace,
      textKey: "text",
    });

    console.log("vector store created");
    const m = await createInquiry(req, res, user.sub);
    return res.status(200).json(m, { msg: "data ingestion done" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to ingest your data" });
  }
}

export default withApiAuthRequired(handler);
