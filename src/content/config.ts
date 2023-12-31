import { z, defineCollection } from "astro:content";
const mapCollection = defineCollection({
  type: "content",
  schema: z.object({
    cogurl: z.string().url(),
    WMTSurl: z.string().url(),
    pngWMTSurl: z.string().url(),
    legacyTMSurl: z.string().url().optional(),
    pngLegacyTMSurl: z.string().url().optional(),
    title: z.string(),
    shortname: z.union([z.string(), z.number()]),
    year: z.union([z.string(), z.number()]),
    scale: z.string().optional(),
    gcp: z.string().optional(),
    extent: z.number().array(),
  }),
});
export const collections = {
  maps: mapCollection,
};
