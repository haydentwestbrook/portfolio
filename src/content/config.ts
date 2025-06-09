import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    technologies: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    date: z.date()
  })
});

export const collections = {
  'projects': projectsCollection
}; 