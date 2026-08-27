import { Provider } from "./base";

import openai from "./openai";
import groq from "./groq";
import gemini from "./gemini";

import { ProviderProps } from "./types";
/* eslint-disable @typescript-eslint/no-explicit-any */

const PROVIDER_CLASSES: Record<string, new (...args: any[]) => Provider> = {
  openai,
  groq,
  gemini,
};

export function createProvider(type: string, props: ProviderProps): Provider {
  const providerClass = PROVIDER_CLASSES[type];
  return new providerClass(props);
}
