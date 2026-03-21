import { Provider } from "./base";

import openai from "./openai";
import groq from "./groq";

import { ProviderProps } from "./types";
/* eslint-disable @typescript-eslint/no-explicit-any */

const PROVIDER_CLASSES: Record<string, new (...args: any[]) => Provider> = {
  openai,
  groq,
};

export function createProvider(type: string, props: ProviderProps): Provider {
  const providerClass = PROVIDER_CLASSES[type];
  return new providerClass(props);
}
