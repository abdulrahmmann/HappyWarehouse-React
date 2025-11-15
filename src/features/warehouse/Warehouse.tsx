import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Layout from '../../shared/layout/Layout'
import { warehouseService } from '../../services/warehouseService'
import { WarehouseModel } from './models/Warehouse'

const Warehouse = () => {
  const navigate = useNavigate()
  const [warehouses, setWarehouses] = useState<WarehouseModel[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadWarehouses()
  }, [])

  const loadWarehouses = async () => {
    setLoading(true)
    try {
      const response = await warehouseService.getWarehouses()
      setWarehouses(response.data || [])
      console.log('✅ Warehouses:', warehouses)
    } catch (error) {
      console.error('❌ Error loading warehouses:', error)
    } finally {
      setLoading(false)
    }
  }

  const navigateAddNewWarehouse = () => {
    navigate('/add-warehouse')
  }

  const deleteWarehouse = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this warehouse?')) {
      try {
        await warehouseService.deleteWarehouse(id)
        console.log('✅ Deleted Warehouse:', id)
        loadWarehouses()
      } catch (error) {
        console.error('❌ Error deleting warehouse:', error)
        alert('Failed to delete warehouse')
      }
    }
  }

  const navigateToWarehouseItems = (id: number) => {
    navigate(`/warehouse/warehouse-items/${id}`)
  }

  const navigateToUpdateWarehouse = (id: number) => {
    navigate(`/warehouse/update-warehouse/${id}`)
  }

  const actionBodyTemplate = (rowData: WarehouseModel) => {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigateToWarehouseItems(rowData.id)}
          className="size-8 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <i className="pi pi-eye" style={{ fontSize: '16px', color: 'var(--color-theme-2)' }}></i>
        </button>
        <button
          onClick={() => navigateToUpdateWarehouse(rowData.id)}
          className="size-8 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <i className="pi pi-pencil" style={{ fontSize: '16px', color: 'var(--color-theme-2)' }}></i>
        </button>
        <button
          onClick={() => deleteWarehouse(rowData.id)}
          className="size-8 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <i className="pi pi-trash" style={{ fontSize: '16px', color: 'var(--color-theme-2)' }}></i>
        </button>
      </div>
    )
  }

  return (
    <Layout>
      <section>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h3 className="text-base font-medium text-white">General Reports</h3>
            <i className="pi pi-angle-right" style={{ color: 'white', fontSize: '12px' }}></i>
            <h3 className="text-base font-medium text-white">Warehouses</h3>
          </div>
          <button
            onClick={navigateAddNewWarehouse}
            className="text-sm text-white font-medium p-3 rounded-lg bg-[#416659] flex items-center gap-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pen-line stroke-[1.3] w-4 h-4 mr-2"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
            Add New Warehouse
          </button>
        </div>

        <div className="mt-3 box box--stacked">
          <DataTable
            value={warehouses}
            paginator
            rows={5}
            rowsPerPageOptions={[3, 5, 10]}
            loading={loading}
            tableStyle={{ minWidth: '65rem' }}
            className="rounded-md"
            style={{ borderRadius: '6px', overflow: 'hidden' }}
          >
            <Column field="id" header="Id" />
            <Column field="name" header="Name" />
            <Column field="countryName" header="Country" />
            <Column field="city" header="City" />
            <Column field="address" header="Address" />
            <Column field="createdByUser" header="Created By" />
            <Column body={actionBodyTemplate} header="Actions" />
          </DataTable>
        </div>
      </section>
    </Layout>
  )
}

export default Warehouse

