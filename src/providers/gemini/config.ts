import fetch from "node-fetch";
import { IConfig, IModel } from "../types";

// Google AI Studio (Gemini) via its OpenAI-compatible API.
// https://ai.google.dev/gemini-api/docs/openai
const fallbackModels: IModel[] = [
  { name: "gemini-3.7-flash", id: "gemini-3.7-flash" },
  { name: "gemini-3.6-flash", id: "gemini-3.6-flash" },
  { name: "gemini-3.5-flash", id: "gemini-3.5-flash" },
  { name: "gemini-3.5-flash-lite", id: "gemini-3.5-flash-lite" },
  { name: "gemini-3.1-pro-preview", id: "gemini-3.1-pro-preview" },
  { name: "gemini-2.5-flash", id: "gemini-2.5-flash" },
  { name: "gemini-2.5-pro", id: "gemini-2.5-pro" },
];

// Non-chat model families that show up in the models list.
const EXCLUDED = /embedding|imagen|veo|tts|audio|image|live/i;

const config: IConfig = {
  requireModel: true,
  defaultModel: {
    id: "gemini-3.5-flash",
    name: "gemini-3.5-flash",
  },
  supportCustomModel: true,
  async listModels(apikey: string | undefined, entrypoint: string | undefined): Promise<IModel[]> {
    const base = entrypoint && entrypoint !== "" ? entrypoint : config.defaultEntrypoint;
    const url = base.replace("/chat/completions", "/models");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apikey}`,
        },
      });
      if (!response.ok) {
        console.error(`API request failed with status ${response.status}`);
        return fallbackModels;
      }
      const data = (await response.json()) as { data: { id: string }[] };
      const models = data.data
        .map((model) => model.id.replace(/^models\//, ""))
        .filter((id) => id.includes("gemini") && !EXCLUDED.test(id))
        .map((id) => ({ name: id, id }));
      return models.length > 0 ? models : fallbackModels;
    } catch (error) {
      console.error("Failed to fetch model list from API, using fallback models:", error);
      return fallbackModels;
    }
  },
  defaultEntrypoint: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
  supportCustomEntrypoint: false,
  requireApiKey: true,
  hasApiKey: true,
};

export default config;
