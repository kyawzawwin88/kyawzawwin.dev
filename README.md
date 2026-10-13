# Portal - Remix Web Portal

A Remix web portal for showcasing software projects and portfolio.

## Features

- 3-column layout:
  - **Left Column**: Fixed navigation menu (Projects, LinkedIn, About Me)
  - **Middle Column**: Project list with details view
  - **Right Column**: Tag cloud for tech stack filtering
- Project showcase with images, descriptions, and tech stacks
- SQLite database for project storage
- Responsive design with Tailwind CSS

## Tech Stacks

- **Remix** - Full-stack React framework
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **SQLite** - Lightweight database (via better-sqlite3)
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Environment Variables

The following environment variables are required for S3 image support:

- `S3_BUCKET_NAME` - The name of your S3 bucket
- `S3_ACCESS_KEY_ID` - AWS access key ID
- `S3_SECRET_ACCESS_KEY` - AWS secret access key
- `S3_REGION` - AWS region (optional, defaults to `us-east-1`)

**Note**: Project `image_url` values in the database should be S3 object names (e.g., `authentication.png`), not full URLs. The application will automatically generate presigned URLs for these objects.

## Database

The application uses SQLite for data storage. The database file is created automatically at `data/portal.db` on first run.

### Schema

- **projects**: Stores project information
- **tech_stacks**: Stores available tech stack tags
- **project_tech_stacks**: Junction table linking projects to tech stacks

## Project Structure

```
portal/
├── app/
│   ├── components/      # React components
│   ├── models/          # Data models and database queries
│   ├── routes/          # Remix routes
│   ├── root.tsx         # Root layout
│   └── tailwind.css     # Tailwind styles
├── public/              # Static assets
└── Dockerfile          # Docker configuration
```

