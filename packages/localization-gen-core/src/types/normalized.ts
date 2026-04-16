import type { InlineMetadata, StructuredNode } from "./ast.js";

export interface NormalizedMessage {
  key: string;
  sourceKey: string;
  module: string;
  locale: string;
  value?: string;
  placeholders: string[];
  metadata?: InlineMetadata;
  structured?: StructuredNode;
}

export interface NormalizedLocaleModule {
  module: string;
  locale: string;
  messages: Record<string, NormalizedMessage>;
}

export interface NormalizedProject {
  locales: string[];
  modules: string[];
  entries: NormalizedLocaleModule[];
}

