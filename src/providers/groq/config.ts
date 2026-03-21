import { IConfig, IModel } from "../types";

const config: IConfig = {
  requireModel: true,
  defaultModel: {
    id: "llama-3.3-70b-versatile",
    name: "llama-3.3-70b-versatile",
  },
  supportCustomModel: false,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async listModels(apikey: string | undefined, _: string | undefined): Promise<IModel[]> {
    return Promise.resolve([
      { name: "llama-3.3-70b-versatile", id: "llama-3.3-70b-versatile" },
      { name: "llama-3.1-8b-instant", id: "llama-3.1-8b-instant" },
      { name: "llama3-70b-8192", id: "llama3-70b-8192" },
      { name: "llama3-8b-8192", id: "llama3-8b-8192" },
      { name: "gemma2-9b-it", id: "gemma2-9b-it" },
      { name: "mixtral-8x7b-32768", id: "mixtral-8x7b-32768" },
    ]);
  },
  defaultEntrypoint: "https://api.groq.com/openai/v1/chat/completions",
  supportCustomEntrypoint: false,
  requireApiKey: true,
  hasApiKey: true,
};

export default config;
