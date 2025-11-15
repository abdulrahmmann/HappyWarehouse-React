import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Layout from '../../shared/layout/Layout'
import { userService } from '../../services/userService'
import { UserModel } from './models/User'

const Users = () => {
  const [users, setUsers] = useState<UserModel[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await userService.getAllUsers()
      console.log('✅ Users response:', response)
      setUsers(response || [])
      console.log('✅ Users loaded:', response)
    } catch (error) {
      console.error('❌ Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusBodyTemplate = (rowData: UserModel) => {
    return (
      <span className={rowData.isActive ? 'text-green-500' : 'text-red-500'}>
        {rowData.isActive ? 'Active' : 'Inactive'}
      </span>
    )
  }

  return (
    <Layout>
      <section>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h3 className="text-base font-medium text-white">General Reports</h3>
            <i className="pi pi-angle-right" style={{ color: 'white', fontSize: '12px' }}></i>
            <h3 className="text-base font-medium text-white">Users</h3>
          </div>
        </div>

          <div className="mt-3 box box--stacked">
          <DataTable
            value={users}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            loading={loading}
            tableStyle={{ minWidth: '65rem' }}
            emptyMessage="No users found"
            className="rounded-md"
            style={{ borderRadius: '6px', overflow: 'hidden' }}
          >
            <Column field="id" header="Id" />
            <Column field="userName" header="Username" />
            <Column field="fullName" header="Full Name" />
            <Column field="email" header="Email" />
            <Column 
              field="phoneNumber" 
              header="Phone Number" 
              body={(rowData) => rowData.phoneNumber || '-'}
            />
            <Column field="role" header="Role" />
            <Column 
              header="Status" 
              body={statusBodyTemplate}
            />
          </DataTable>
        </div>
      </section>
    </Layout>
  )
}

export default Users

