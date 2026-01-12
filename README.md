# Mini CMS

A lightweight content management system built with Next.js that supports Server-Driven UI (SDUI) via JSON schema.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Ant Design (antd)
- **Data Storage**: IndexedDB
- **Validation**: Zod
- **Package Manager**: pnpm

## Architecture

### Key Design Decisions

1. **Server Components & Server Actions**: Leverages Next.js App Router's server-centric architecture for optimal performance
2. **API Abstraction Layer**: Storage access is abstracted through `pageApi`, making it easy to replace IndexedDB with a real backend
3. **Type Safety**: Full TypeScript coverage with runtime validation using Zod
4. **SDUI Rendering**: Recursive, type-safe rendering of JSON-defined UI schemas
5. **Error Handling**: Graceful error handling with fallback UI for unknown node types

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel routes
│   └── [slug]/            # Client dynamic routes
├── components/
│   ├── admin/             # Admin UI components
│   ├── client/            # SDUI renderer components
│   └── shared/            # Shared components
├── lib/
│   ├── api/               # API abstraction layer
│   ├── storage/           # IndexedDB implementation
│   ├── validation/        # Zod schemas
│   └── utils/             # Utility functions
├── types/                 # TypeScript type definitions
└── actions/               # Server Actions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features

### Admin Panel

- **Content List**: View all pages with status indicators (DRAFT/PUBLISHED)
- **Content Editor**: 
  - Create and edit pages with title and slug
  - JSON editor for SDUI schema
  - Live preview of SDUI rendering
  - Validation for JSON syntax and SDUI schema
  - Publish/unpublish functionality
  - Duplicate slug detection

### Client Rendering

- **SDUI Support**: Renders published content using JSON schema
- **Supported Node Types**:
  - Container (with padding)
  - Text (with size variants: sm, md, lg)
  - Image (with alt text)
  - Button (with alert action)
- **Error Handling**: Graceful fallback for unsupported node types
- **404 Handling**: Unpublished or non-existent pages return 404

## SDUI Schema Example

```json
{
  "version": 1,
  "root": {
    "type": "container",
    "padding": 16,
    "children": [
      { "type": "text", "value": "Hello SDUI", "size": "lg" },
      {
        "type": "image",
        "src": "https://picsum.photos/800/400",
        "alt": "banner"
      },
      {
        "type": "button",
        "label": "Click me",
        "action": {
          "type": "alert",
          "message": "Hi!"
        }
      }
    ]
  }
}
```

## Implementation Highlights

✅ IndexedDB for client-side persistence  
✅ Clear separation of Storage / API / UI layers  
✅ SDUI preview functionality in editor  
✅ Runtime schema validation with Zod  
✅ Type-safe server actions  
✅ Responsive UI with Ant Design  

## Future Improvements

- [ ] Add more SDUI node types (e.g., form inputs, links)
- [ ] Implement version history for pages
- [ ] Add search and filtering in content list
- [ ] Support for nested actions in buttons
- [ ] Export/import functionality for pages
- [ ] Real-time collaboration features

## License

MIT
