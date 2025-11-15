import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../shared/layout/Layout'
import { Button } from 'primereact/button'

const Welcome = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <Layout>
      <section className="box box--stacked p-6">
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Welcome, {currentUser?.username}!
        </h1>
        <p className="text-lg mb-6">You have successfully logged in to Happy Warehouse.</p>
        <div className="flex gap-2">
          <Button
            label="Go to Dashboard"
            onClick={() => navigate('/dashboard')}
          />
          <Button
            label="View Warehouses"
            onClick={() => navigate('/warehouses')}
          />
          <Button
            label="Logout"
            severity="danger"
            onClick={handleLogout}
          />
        </div>
      </section>
    </Layout>
  )
}

export default Welcome

