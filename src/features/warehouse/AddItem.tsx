import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import Layout from '../../shared/layout/Layout'
import { warehouseService } from '../../services/warehouseService'
import { CreateWarehouseItemModel } from './models/CreateWarehouseItem'
import { useAuth } from '../../contexts/AuthContext'

const AddItem = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { currentUser } = useAuth()
  const [formData, setFormData] = useState<CreateWarehouseItemModel>({
    itemName: '',
    skuCode: '',
    qty: 0,
    costPrice: 0,
    msrpPrice: 0,
    warehouseId: id ? parseInt(id) : 0,
    createdByUserId: currentUser?.userId || 0,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await warehouseService.postWarehouseItem(formData)
      navigate(`/warehouse/warehouse-items/${id}`)
    } catch (error) {
      console.error('Error creating item:', error)
      alert('Failed to create item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Add Item</h1>
        <form onSubmit={handleSubmit} className="box box--stacked rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm mb-1">Item Name</label>
            <InputText
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">SKU Code</label>
            <InputText
              value={formData.skuCode}
              onChange={(e) => setFormData({ ...formData, skuCode: e.target.value })}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Quantity</label>
            <InputNumber
              value={formData.qty}
              onValueChange={(e) => setFormData({ ...formData, qty: e.value || 0 })}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Cost Price</label>
            <InputNumber
              value={formData.costPrice}
              onValueChange={(e) => setFormData({ ...formData, costPrice: e.value || 0 })}
              className="w-full"
              mode="currency"
              currency="USD"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">MSRP Price</label>
            <InputNumber
              value={formData.msrpPrice}
              onValueChange={(e) => setFormData({ ...formData, msrpPrice: e.value || 0 })}
              className="w-full"
              mode="currency"
              currency="USD"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" label="Create" loading={loading} />
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              onClick={() => navigate(`/warehouse/warehouse-items/${id}`)}
            />
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default AddItem

