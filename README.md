# HappyWarehouse React

A React.js application for managing warehouses and inventory, converted from Angular.

## Features

- User Authentication (Login/Logout)
- Dashboard with warehouse statistics
- Warehouse Management (CRUD operations)
- Warehouse Items Management
- Responsive UI with TailwindCSS
- PrimeReact components

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **PrimeReact** - UI component library
- **TailwindCSS** - Styling
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Backend Integration

The application is configured to connect to the backend API at:
- Base URL: `https://localhost:7018/api`

The API endpoints are:
- Authentication: `/v1/Users/login`
- Warehouses: `/Warehouse/*`
- Warehouse Items: `/WarehouseItems/*`
- Dashboard: `/Dashboard/*`
- Countries: `/Country/countries`

## Project Structure

```
src/
├── components/          # Reusable components
├── contexts/           # React contexts (Auth)
├── features/           # Feature modules
│   ├── authentication/
│   ├── dashboard/
│   ├── warehouse/
│   └── welcome/
├── services/           # API services
├── shared/             # Shared components and layouts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Authentication

The app uses JWT tokens stored in localStorage. The AuthContext provides:
- `login(email, password)` - Login user
- `logout()` - Logout user
- `isAuthenticated()` - Check if user is authenticated
- `getToken()` - Get current token

## Environment Variables

You can create a `.env` file to configure the API base URL:

```
VITE_API_BASE_URL=https://localhost:7018/api
```

## License

Private project

