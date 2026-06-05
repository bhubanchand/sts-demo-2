import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const commonFields = [
  { name: 'title', type: 'text', required: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'content', type: 'richText' },
  { name: 'published', type: 'checkbox', defaultValue: false },
] as const;

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    {
      slug: 'users',
      auth: true,
      access: { read: () => true },
      fields: [],
    },
    {
      slug: 'pages',
      admin: { useAsTitle: 'title' },
      fields: [
        ...commonFields,
        { name: 'path', type: 'text', required: true, unique: true }, // e.g., /platform/traceability
      ],
    },
    {
      slug: 'blogs',
      admin: { useAsTitle: 'title' },
      fields: [...commonFields, { name: 'excerpt', type: 'textarea' }],
    },
    {
      slug: 'whitepapers',
      admin: { useAsTitle: 'title' },
      fields: [...commonFields, { name: 'pdfUrl', type: 'text' }],
    },
    {
      slug: 'reports',
      admin: { useAsTitle: 'title' },
      fields: [...commonFields],
    },
    {
      slug: 'webinars',
      admin: { useAsTitle: 'title' },
      fields: [...commonFields, { name: 'videoUrl', type: 'text' }],
    },
    {
      slug: 'events',
      admin: { useAsTitle: 'title' },
      fields: [...commonFields, { name: 'date', type: 'date' }],
    },
    {
      slug: 'newsroom',
      admin: { useAsTitle: 'title' },
      fields: [...commonFields],
    },
    {
      slug: 'case-studies',
      admin: { useAsTitle: 'title' },
      fields: [...commonFields, { name: 'company', type: 'text' }],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || 'your-payload-secret-key-12345',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/sourcetrace',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
