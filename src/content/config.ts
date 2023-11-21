import { z, defineCollection } from "astro:content";
const mapCollection = defineCollection({
  type: "content",
  schema: z.object({
    cogurl: z.string().url(),
    TMSurl: z.string().url(),
    legacyTMSurl: z.string().url().optional(),
    title: z.string(),
    shortname: z.union([z.string(), z.number()]),
    year: z.union([z.string(), z.number()]),
    scale: z.string().optional(),
    gcp: z.string().optional(),
  }),
});
export const collections = {
  maps: mapCollection,
};
