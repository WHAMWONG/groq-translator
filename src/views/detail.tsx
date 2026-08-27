import { Detail, List } from "@raycast/api";
import capitalize from "capitalize";
import { langMap } from "../providers/lang";
import { TranslateMode } from "../providers/types";

const PROVIDER_LABEL: Record<string, string> = {
  openai: "OpenAI",
  groq: "Groq",
  raycast: "Raycast AI",
  azure: "Azure",
  palm2: "PaLM 2",
  gemini: "Google AI Studio",
};

export interface DetailViewProps {
  showMetadata: boolean;
  text: string;
  original: string;
  from: string;
  to: string;
  mode: TranslateMode;
  created_at?: string;
  ocrImg: string | undefined;
  provider: string | undefined;
  error?: string;
}

export const DetailView = (props: DetailViewProps) => {
  const { showMetadata, text, original, from, to, mode, created_at, ocrImg, provider, error } = props;
  const imgMd = ocrImg ? `\n![](${ocrImg})` : "";
  const errorMd = error ? `⚠️ **Error**\n\n${error}\n` : "";
  return (
    <List.Item.Detail
      markdown={`${errorMd}${text}\n${imgMd}\n\`\`\`\n${original}\n\`\`\`\n`}
      metadata={
        showMetadata ? (
          <Detail.Metadata>
            {mode != "what" ? <Detail.Metadata.Label title="From" text={`${langMap.get(from) || "Auto"}`} /> : null}
            <Detail.Metadata.Label title="To" text={`${langMap.get(to)}`} />
            <Detail.Metadata.Label title="Mode" text={capitalize(mode)} />
            {created_at && <Detail.Metadata.Label title="Created At" text={`${created_at}`} />}
            {provider && <Detail.Metadata.Label title="Provider" text={`${PROVIDER_LABEL[provider] || provider}`} />}
          </Detail.Metadata>
        ) : null
      }
    />
  );
};
