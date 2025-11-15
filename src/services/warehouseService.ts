import api from './api'
import { WarehouseModel } from '../features/warehouse/models/Warehouse'
import { CreateWarehouseModel } from '../features/warehouse/models/CreateWarehouse'
import { UpdateWarehouseModel } from '../features/warehouse/models/UpdateWarehouse'
import { WarehouseByIdModel } from '../features/warehouse/models/WarehouseById'
import { WarehouseItemModel } from '../features/warehouse/models/WarehouseItem'
import { CreateWarehouseItemModel } from '../features/warehouse/models/CreateWarehouseItem'

interface BaseResponse<T> {
  data?: T
  httpStatusCode: number
  message: string
  timestamp: string
}

export const warehouseService = {
  getWarehouses: async (): Promise<{ data: WarehouseModel[] }> => {
    const response = await api.get<{ data: WarehouseModel[] }>('/Warehouse/warehouses')
    return response.data
  },

  postWarehouse: async (warehouse: CreateWarehouseModel): Promise<any> => {
    const response = await api.post('/Warehouse/create-warehouse', warehouse)
    return response.data
  },

  putWarehouse: async (id: number, warehouse: UpdateWarehouseModel): Promise<any> => {
    const response = await api.put(`/Warehouse/update-warehouse/${id}`, warehouse)
    return response.data
  },

  deleteWarehouse: async (id: number): Promise<any> => {
    const response = await api.delete(`/Warehouse/delete-warehouse/${id}`)
    return response.data
  },

  getWarehouseById: async (id: number): Promise<WarehouseByIdModel> => {
    const response = await api.get<BaseResponse<WarehouseByIdModel> | WarehouseByIdModel>(`/Warehouse/by-id/${id}`)
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return (response.data as BaseResponse<WarehouseByIdModel>).data!
    }
    return response.data as WarehouseByIdModel
  },

  getWarehouseItems: async (id: number): Promise<WarehouseItemModel[]> => {
    const response = await api.get<BaseResponse<WarehouseItemModel[]>>(`/WarehouseItems/get-items/${id}`)
    return response.data.data || []
  },

  postWarehouseItem: async (item: CreateWarehouseItemModel): Promise<any> => {
    const response = await api.post('/WarehouseItems/create-item', item)
    return response.data
  },
}

