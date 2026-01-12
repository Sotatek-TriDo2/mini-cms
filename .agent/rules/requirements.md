---
trigger: manual
---

You will build a small content system where:
An **Admin** creates, edits, and publishes content
A **Client** renders published content using **SDUI (Server-Driven UI via JSON schema)**

Rather than visual polish, we focus on:
Architectural design and reasoning
State and data flow
Type safety
Error handling and user experience
Extensibility in real-world scenarios

---

## Technology Choices (Important)

**Next.js only**
  - App Router
  - Server Components / Server Actions–centric architecture

> ⚠️ We evaluate how **consistent, reasonable, and explainable** your design is within the chosen setup.

---

## Package Manager (Required)

**pnpm is required**
npm and yarn are **not allowed**
The repository **must include pnpm-lock.yaml**

bash
pnpm install
pnpm dev



> This helps us assess familiarity with modern dependency management and reproducible environments.

---

## Common Technical Guidelines
TypeScript is strongly recommended
UI Libraries
  - **Admin UI: Ant Design (antd) recommended**
  - Client UI: Ant Design (antd) recommended
Data persistence
  - IndexedDB
  - MSW may be used for API mocking

---

## Scope

You must implement **both** areas:

1. **Admin**
   - Create, edit, and publish content
2. **Client**
   - Render published content using SDUI

---

## Data Model

ts
interface Page {
  id: string;
  slug: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED';
  schema: SDUISchema;
  updatedAt: number;
}



slug is used as the public URL identifier
slug **must be unique**
Data may be stored using localStorage, IndexedDB, or mocked APIs

---

## Data Storage & Access Rules

Choose IndexedDB for persistence
**Client-side code must not access storage directly**
Access data through an **API-style abstraction layer**

ts
await pageApi.getPublishedPageBySlug(slug);



This design should make it easy to replace the storage layer with a real backend API later.

---

## Admin Requirements

### Content List
Display a list of content entries
Show publication status (DRAFT / PUBLISHED)
Provide an edit action

### Content Editor
Inputs for title and slug
TextArea for editing SDUI JSON
Actions:
  - JSON parsing and validation
  - Save
  - Publish
  - (Optional) Unpublish

### Required UX
Validation for empty or duplicate slugs
Clear error messages for JSON parsing failures
User feedback for save / publish actions

---

## SDUI Specification (Core Requirement)

### 1. SDUI Types

ts
type SDUINode =
  | ContainerNode
  | TextNode
  | ImageNode
  | ButtonNode;

interface ContainerNode {
  type: 'container';
  padding?: number;
  children: SDUINode[];
}

interface TextNode {
  type: 'text';
  value: string;
  size?: 'sm' | 'md' | 'lg';
}

interface ImageNode {
  type: 'image';
  src: string;
  alt?: string;
}

interface ButtonNode {
  type: 'button';
  label: string;
  action: {
    type: 'alert';
    message: string;
  };
}

interface SDUISchema {
  version: 1;
  root: SDUINode;
}



---

### 2. Rendering Rules

If schema.version !== 1
  - Handle as an error or render a fallback UI
Unknown node.type
  - Must be handled **gracefully**
  - The application must **never crash**
Child nodes must be rendered **recursively**
Renderer logic should be isolated (e.g. renderNode(node))

ts
function renderNode(node: SDUINode): ReactNode {
  switch (node.type) {
    case 'text':
      return <span>{node.value}</span>;
    case 'container':
      return <div>{node.children.map(renderNode)}</div>;
    default:
      return <UnsupportedBlock />;
  }
}



---

### 3. Example SDUI JSON

json
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



---

## Client Requirements
Only content with PUBLISHED status should be rendered
DRAFT or non-existent content should result in **404 / Not Found**

---

## Submission

Submit a GitHub repository including:
Source code
pnpm-lock.yaml
A README describing:
  - Your chosen tech stack and why
  - How to run the project (pnpm-based)
  - Implemented scope
  - Remaining TODOs or improvements

---

## Bonus Points
IndexedDB usage
Clear separation of Storage / API / UI layers
SDUI preview functionality
Runtime schema validation (e.g. Zod)