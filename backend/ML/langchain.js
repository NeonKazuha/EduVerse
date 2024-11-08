import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage } from "@langchain/core/messages";


const outputParser = new StringOutputParser();

async function askai(pathtofile) {

  const loader = new PDFLoader(pathtofile, { splitPages: false });
  const docs = await loader.load();

  const ip = docs[0].pageContent;
  // Initialize Gemini AI model
  const model = new ChatGoogleGenerativeAI({
    apiKey: "AIzaSyD7QdH07BroM-yraKPt19xmn_1q_ykPNT8",
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
  });

  // Example question
  const question = "gimme 10 basic questions based on the topic on which the information  is given to you ?";

  // Ask question based on PDF content
  const questions = [
    new HumanMessage({
      content: [
        {
          type: "text",
          text: ip,
        },
        {
          type: "text",
          text: question,
        },
      ]
    })
  ];
  const res = await model.invoke(questions);

  const parsedResponse = outputParser.parse(res);
  return parsedResponse;
}

export { askai };
