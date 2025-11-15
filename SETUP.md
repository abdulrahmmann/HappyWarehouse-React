# Setup Instructions

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd D:\Kaizen-Plus\HappyWarehouse-React
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   If you encounter PowerShell execution policy issues, you can:
   - Use Command Prompt instead of PowerShell
   - Or run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Backend Configuration

The React app is configured to connect to the backend API at:
- **Base URL:** `https://localhost:7018/api`

Make sure your backend is running before starting the React app.

## API Endpoints Used

- **Authentication:**
  - `POST /v1/Users/login` - User login
  - `POST /v1/Users/generate-new-access-token` - Refresh token

- **Warehouses:**
  - `GET /Warehouse/warehouses` - Get all warehouses
  - `POST /Warehouse/create-warehouse` - Create warehouse
  - `PUT /Warehouse/update-warehouse/:id` - Update warehouse
  - `DELETE /Warehouse/delete-warehouse/:id` - Delete warehouse
  - `GET /Warehouse/by-id/:id` - Get warehouse by ID

- **Warehouse Items:**
  - `GET /WarehouseItems/get-items/:id` - Get items for warehouse
  - `POST /WarehouseItems/create-item` - Create warehouse item

- **Dashboard:**
  - `GET /Dashboard/warehouse-inventory-details` - Get inventory details
  - `GET /Dashboard/warehouse-status` - Get warehouse status
  - `GET /Dashboard/top-warehouse-items` - Get top items

- **Countries:**
  - `GET /Country/countries` - Get all countries

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure your backend API has CORS configured to allow requests from `http://localhost:3000`.

### SSL Certificate Issues
The app connects to `https://localhost:7018`. If you have SSL certificate issues, you may need to:
1. Accept the certificate in your browser first
2. Or configure the backend to use HTTP instead of HTTPS

### Port Already in Use
If port 3000 is already in use, Vite will automatically try the next available port. Check the console output for the actual port number.

## Project Structure

```
HappyWarehouse-React/
├── public/              # Static assets
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts (Auth)
│   ├── features/       # Feature modules
│   │   ├── authentication/
│   │   ├── dashboard/
│   │   ├── warehouse/
│   │   └── welcome/
│   ├── services/       # API services
│   ├── shared/         # Shared components
│   ├── App.tsx         # Main app
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Next Steps

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Test the login functionality
4. Verify all features work with your backend

