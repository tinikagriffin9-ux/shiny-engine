# UK Healthcare Careers

## Overview

A full-stack web application designed to connect healthcare professionals from Kenya, Uganda, Ghana, and Nigeria with career opportunities in the UK's NHS and private healthcare system. The platform streamlines the entire recruitment process from initial application through visa sponsorship and professional registration to final placement in UK healthcare positions.

The application serves three main healthcare roles: registered nurses, midwives, and caregivers. It provides comprehensive support including skills assessment testing, visa application assistance, professional body registration, and ongoing career support once professionals arrive in the UK.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod schema validation

The frontend follows a modern React architecture with reusable UI components and proper separation of concerns. Pages are organized by functionality (home, application, test) with shared components for common UI elements.

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON communication
- **File Handling**: Multer middleware for document uploads
- **Development**: Hot module replacement with Vite integration

The backend uses a modular architecture with separate route handlers and storage abstraction. It includes middleware for request logging and error handling.

### Data Storage
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Development Storage**: In-memory storage implementation for development/testing

The database schema includes three main entities: users (personal information), applications (role-specific applications with document uploads), and tests (skills assessment with questions and scoring).

### Authentication & Sessions
- **Session Storage**: PostgreSQL with connect-pg-simple
- **File Storage**: Local filesystem for document uploads
- **Validation**: Zod schemas for runtime type validation

### Key Features
- **Multi-step Application Process**: Personal information, role selection, and document upload
- **Skills Assessment Testing**: Role-specific online tests with scoring
- **Document Management**: Secure upload and storage of passports and credentials
- **Progress Tracking**: Real-time application status updates
- **Mobile Responsive**: Optimized for both desktop and mobile devices

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Local File System**: Document storage for uploaded files

### Development Tools
- **Vite**: Frontend build tool and development server
- **Replit Integration**: Development environment plugins and error handling

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Google Fonts**: Typography (Inter, DM Sans, Fira Code, Geist Mono)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation library
- **@hookform/resolvers**: Form validation integration

### API & Data Fetching
- **TanStack Query**: Server state management and caching
- **Fetch API**: HTTP client for API requests

### File Processing
- **Multer**: File upload middleware
- **Path utilities**: File system path handling