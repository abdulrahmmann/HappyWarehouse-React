import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Layout from '../../shared/layout/Layout'
import { dashboardService } from '../../services/dashboardService'
import { WarehouseWithInventoryDetailsModel } from './models/WarehouseWithInventoryDetails'
import { WarehouseStatusModel } from './models/WarehouseStatus'
import { TopItemsModel } from './models/TopItems'

const Dashboard = () => {
  const [warehouses, setWarehouses] = useState<WarehouseWithInventoryDetailsModel[]>([])
  const [warehouseStatus, setWarehouseStatus] = useState<WarehouseStatusModel[]>([])
  const [topItems, setTopItems] = useState<TopItemsModel[]>([])
  const [loadingWarehouses, setLoadingWarehouses] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingTopItems, setLoadingTopItems] = useState(false)

  useEffect(() => {
    loadWarehouses()
    loadWarehouseStatus()
    loadTopItems()
  }, [])

  const loadWarehouses = async () => {
    setLoadingWarehouses(true)
    try {
      const response = await dashboardService.getWarehouseInventoryDetails()
      setWarehouses(response.data || [])
      console.log('✅ Warehouses:', response.data)
    } catch (error) {
      console.error('❌ Error loading warehouses:', error)
    } finally {
      setLoadingWarehouses(false)
    }
  }

  const loadWarehouseStatus = async () => {
    setLoadingStatus(true)
    try {
      const response = await dashboardService.getWarehouseStatus()
      setWarehouseStatus(response.data || [])
      console.log('✅ WarehouseStatus:', response.data)
    } catch (error) {
      console.error('❌ Error loading warehouse status:', error)
    } finally {
      setLoadingStatus(false)
    }
  }

  const loadTopItems = async () => {
    setLoadingTopItems(true)
    try {
      const response = await dashboardService.getTopItems()
      setTopItems(response.data || [])
      console.log('✅ TopItems:', response.data)
    } catch (error) {
      console.error('❌ Error loading top items:', error)
    } finally {
      setLoadingTopItems(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto pb-3.5">
        {/* Warehouse With Inventory Details */}
        <section>
            <div className="flex items-center gap-1">
                <h3 className="text-base font-medium text-white">General Reports</h3>
                <i className="pi pi-angle-right" style={{ color: 'white', fontSize: '12px' }}></i>
                <h3 className="text-base font-medium text-white">Warehouse With Inventory Details</h3>
            </div>
          <div className="mt-3 box box--stacked">
            <DataTable
              value={warehouses}
              paginator
              rows={5}
              rowsPerPageOptions={[3, 5, 10]}
              loading={loadingWarehouses}
              tableStyle={{ minWidth: '65rem' }}
              emptyMessage="No warehouses found"
              className=""
              style={{ borderRadius: '6px', overflow: 'hidden' }}
            >
              <Column field="warehouseId" header="Id" />
              <Column field="warehouseName" header="Name" />
              <Column field="warehouseCountry" header="Country" />
              <Column field="warehouseCity" header="City" />
              <Column field="itemsCount" header="Items" />
              <Column field="qtyCounts" header="Quantity" />
            </DataTable>
          </div>
        </section>

        {/* Warehouse Status */}
        <section className="mt-10">
            <div className="flex items-center gap-1">
                <h3 className="text-base font-medium text-white">General Reports</h3>
                <i className="pi pi-angle-right" style={{ color: 'white', fontSize: '12px' }}></i>
                <h3 className="text-base font-medium text-white">Warehouse Status</h3>
            </div>
          <div className="mt-3 box box--stacked">
            <DataTable
              value={warehouseStatus}
              paginator
              rows={5}
              rowsPerPageOptions={[3, 5, 10]}
              loading={loadingStatus}
              tableStyle={{ minWidth: '65rem' }}
              emptyMessage="No warehouse status found"
              className="rounded-md"
              style={{ borderRadius: '6px', overflow: 'hidden' }}
            >
              <Column field="warehouseId" header="Id" />
              <Column field="warehouseName" header="Name" />
              <Column field="totalItems" header="Total Items" />
            </DataTable>
          </div>
        </section>

        {/* Top Items */}
        <section className="mt-10">
            <div className="flex items-center gap-1">
                <h3 className="text-base font-medium text-white">General Reports</h3>
                <i className="pi pi-angle-right" style={{ color: 'white', fontSize: '12px' }}></i>
                <h3 className="text-base font-medium text-white">Top Items</h3>
            </div>
          <div className="mt-3 box box--stacked">
            <DataTable
              value={topItems}
              paginator
              rows={5}
              rowsPerPageOptions={[3, 5, 10]}
              loading={loadingTopItems}
              tableStyle={{ minWidth: '65rem' }}
              emptyMessage="No top items found"
              className="rounded-md"
              style={{ borderRadius: '6px', overflow: 'hidden' }}
            >
              <Column field="itemName" header="Item Name" />
              <Column field="warehouseName" header="Warehouse Name" />
              <Column field="qty" header="Quantity" />
              <Column field="skuCode" header="SKU Code" />
            </DataTable>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Dashboard

