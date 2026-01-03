import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "iu5xmlt3",
  dataset: "production",
  apiVersion: "2025-11-08",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => {
  return builder.image(source);
};
