import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import Layout from '../../shared/layout/Layout'
import {warehouseService} from '../../services/warehouseService'
import {WarehouseItemModel} from './models/WarehouseItem'

const WarehouseItems = () => {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [items, setItems] = useState<WarehouseItemModel[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (id) {
            loadItems(parseInt(id))
        }
    }, [id])

    const loadItems = async (warehouseId: number) => {
        setLoading(true)
        try {
            const data = await warehouseService.getWarehouseItems(warehouseId)
            setItems(data)
        } catch (error) {
            console.error('Error loading warehouse items:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Warehouse Items</h1>
                    {id && (
                        <Button onClick={() => navigate(`/warehouses/${id}/add-item`)}
                            className="text-sm text-white font-medium p-3 rounded-lg bg-[#416659] flex items-center gap-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-pen-line stroke-[1.3] w-4 h-4 mr-2">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                            </svg>
                            Add New Item
                        </Button>
                )}
            </div>
            <div className="mt-3 box box--stacked">
                <DataTable
                    value={items}
                    paginator
                    rows={10}
                    loading={loading}
                    tableStyle={{minWidth: '50rem'}}
                    className="rounded-md"
                    style={{borderRadius: '6px', overflow: 'hidden'}}
                >
                    <Column field="itemName" header="Item Name"/>
                    <Column field="skuCode" header="SKU Code"/>
                    <Column field="qty" header="Quantity"/>
                    <Column field="costPrice" header="Cost Price"/>
                    <Column field="msrpPrice" header="MSRP Price"/>
                </DataTable>
            </div>
        </section>
</Layout>
)
}

export default WarehouseItems

