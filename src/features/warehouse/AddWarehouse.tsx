import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import Layout from '../../shared/layout/Layout'
import { warehouseService } from '../../services/warehouseService'
import { countryService } from '../../services/countryService'
import { CountryModel } from './models/Country'
import { CreateWarehouseModel } from './models/CreateWarehouse'
import { useAuth } from '../../contexts/AuthContext'

const AddWarehouse = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [countries, setCountries] = useState<CountryModel[]>([])
  const [formData, setFormData] = useState<CreateWarehouseModel>({
    name: '',
    address: '',
    city: '',
    countryId: 0,
    createdByUserId: currentUser?.userId || 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCountries()
  }, [])

  const loadCountries = async () => {
    try {
      const data = await countryService.getCountries()
      setCountries(data)
    } catch (error) {
      console.error('Error loading countries:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await warehouseService.postWarehouse(formData)
      navigate('/warehouses')
    } catch (error) {
      console.error('Error creating warehouse:', error)
      alert('Failed to create warehouse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Add Warehouse</h1>
        <form onSubmit={handleSubmit} className="box box--stacked rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <InputText
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Address</label>
            <InputText
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">City</label>
            <InputText
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Country</label>
            <Dropdown
              value={formData.countryId}
              onChange={(e) => setFormData({ ...formData, countryId: e.value })}
              options={countries}
              optionLabel="name"
              optionValue="id"
              placeholder="Select a country"
              className="w-full"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" label="Create" loading={loading} />
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              onClick={() => navigate('/warehouses')}
            />
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default AddWarehouse

