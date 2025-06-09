import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    technologies: z.array(z.string()),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    date: z.date()
  })
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    modifiedDate: z.date().optional(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false)
  })
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional()
  })
});

const contactCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    email: z.string(),
    location: z.string(),
    github: z.string(),
    linkedin: z.string(),
    formTitle: z.string(),
    formDescription: z.string()
  })
});

export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection,
  'about': aboutCollection,
  'contact': contactCollection
}; 