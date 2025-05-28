import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  const filePath = path.join(process.cwd(), 'public', 'files', 'resume.pdf');
  const fileBuffer = await fs.readFile(filePath);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume_hayden_westbrook.pdf"',
    },
  });
};
