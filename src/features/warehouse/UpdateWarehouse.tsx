import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import Layout from '../../shared/layout/Layout'
import { warehouseService } from '../../services/warehouseService'
import { countryService } from '../../services/countryService'
import { CountryModel } from './models/Country'
import { UpdateWarehouseModel } from './models/UpdateWarehouse'
import { WarehouseByIdModel } from './models/WarehouseById'

const UpdateWarehouse = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [countries, setCountries] = useState<CountryModel[]>([])
  const [warehouse, setWarehouse] = useState<WarehouseByIdModel | null>(null)
  const [formData, setFormData] = useState<UpdateWarehouseModel>({
    name: '',
    address: '',
    city: '',
    countryId: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      loadWarehouse(parseInt(id))
      loadCountries()
    }
  }, [id])

  const loadWarehouse = async (warehouseId: number) => {
    try {
      const data = await warehouseService.getWarehouseById(warehouseId)
      setWarehouse(data)
      setFormData({
        name: data.name,
        address: data.address,
        city: data.city,
        countryId: data.countryId,
      })
    } catch (error) {
      console.error('Error loading warehouse:', error)
    }
  }

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
    if (!id) return

    setLoading(true)
    try {
      await warehouseService.putWarehouse(parseInt(id), formData)
      navigate('/warehouses')
    } catch (error) {
      console.error('Error updating warehouse:', error)
      alert('Failed to update warehouse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Update Warehouse</h1>
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
            <Button type="submit" label="Update" loading={loading} />
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

export default UpdateWarehouse

