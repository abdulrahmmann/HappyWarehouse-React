export interface WarehouseStatusModel {
  warehouseId: number
  warehouseName: string
  totalItems: number
}

export interface BaseResponse<T> {
  totalCount?: number
  httpStatusCode: number
  message: string
  errors?: string
  timestamp: string
  data?: T
}

