export interface UserModel {
  id: string
  userName: string
  fullName: string
  email: string
  phoneNumber?: string
  role: string
  isDeleted: boolean
  isActive: boolean
  createdAt: string
  updatedAt?: string | null
  deletedAt?: string | null
}

