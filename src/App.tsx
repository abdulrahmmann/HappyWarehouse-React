import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './features/authentication/pages/Login'
import Dashboard from './features/dashboard/Dashboard'
import Warehouse from './features/warehouse/Warehouse'
import AddWarehouse from './features/warehouse/AddWarehouse'
import UpdateWarehouse from './features/warehouse/UpdateWarehouse'
import WarehouseItems from './features/warehouse/WarehouseItems'
import AddItem from './features/warehouse/AddItem'
import Welcome from './features/welcome/Welcome'
import Users from './features/users/Users'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/warehouses"
            element={
              <PrivateRoute>
                <Warehouse />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-warehouse"
            element={
              <PrivateRoute>
                <AddWarehouse />
              </PrivateRoute>
            }
          />
          <Route
            path="/warehouse/warehouse-items/:id"
            element={
              <PrivateRoute>
                <WarehouseItems />
              </PrivateRoute>
            }
          />
          <Route
            path="/warehouse/update-warehouse/:id"
            element={
              <PrivateRoute>
                <UpdateWarehouse />
              </PrivateRoute>
            }
          />
          <Route
            path="/warehouses/:id/add-item"
            element={
              <PrivateRoute>
                <AddItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

