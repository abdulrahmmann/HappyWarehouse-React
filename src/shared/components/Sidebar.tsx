import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScrollPanel } from 'primereact/scrollpanel'

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface SidebarItem {
  name: string
  icon: string
  route: string
}

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const location = useLocation()

  const togglePin = () => {
    setIsPinned(!isPinned)
  }

  const sidebarExpanded = isPinned || isHovered

  // Notify parent about pin state (if needed in future)
  // For now, we'll handle it internally

  const sidebarSections: SidebarSection[] = [
    {
      title: 'dashboards',
      items: [{ name: 'Dashboard', icon: '/dashboard.svg', route: '/dashboard' }],
    },
    {
      title: 'warehouse managements',
      items: [
        { name: 'Warehouses', icon: '/dashboard.svg', route: '/warehouses' },
        { name: 'Add Warehouse', icon: '/dashboard.svg', route: '/add-warehouse' },
      ],
    },
    {
      title: 'user managements',
      items: [
        { name: 'Users', icon: '/dashboard.svg', route: '/users' },
        { name: 'Add Users', icon: '/dashboard.svg', route: '/users/add' },
      ],
    },
  ]

  return (
    <aside className="hidden lg:block fixed top-0 bottom-0 left-0 lg:py-3.5 lg:pl-3.5 cursor-pointer z-50">
      <div
        className={`h-full box bg-[#f3f6f6] rounded-none lg:rounded-xl relative duration-300 transition-[width] xl:shadow-[6px_0_12px_-4px_#0000000f] overflow-hidden ${
          sidebarExpanded ? 'w-[275px]' : 'w-[91px]'
        }`}
        onMouseEnter={() => !isPinned && setIsHovered(true)}
        onMouseLeave={() => !isPinned && setIsHovered(false)}
      >
        {/* Sidebar Header */}
        <div className="flex-none hidden lg:flex items-center z-10 px-5 h-[65px] w-[275px] overflow-hidden relative duration-300">
          <div className="flex items-center transition-[margin] duration-300 w-full">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-[34px] rounded-lg h-[34px] bg-gradient-to-b from-theme-1 to-theme-2/80 transition-transform ease-in-out ${
                  sidebarExpanded ? 'rotate-180 ml-0' : 'ml-2'
                }`}
              >
                <div className="w-[16px] h-[16px] relative -rotate-45">
                  <div className="absolute w-[21%] left-0 inset-y-0 my-auto rounded-full bg-white opacity-50 h-[75%]"></div>
                  <div className="absolute w-[21%] inset-0 m-auto h-[120%] rounded-full bg-white"></div>
                  <div className="absolute w-[21%] right-0 inset-y-0 my-auto rounded-full bg-white opacity-50 h-[75%]"></div>
                </div>
              </div>
              <div
                className={`ml-3.5 transition-opacity text-sm gradient-text font-medium ${
                  sidebarExpanded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Happy Warehouse
              </div>
            </div>
            <button
              onClick={togglePin}
              className={`hidden transition-[opacity,transform] 2xl:flex items-center justify-center w-[20px] h-[20px] ml-auto border rounded-full border-slate-600/40 hover:bg-slate-600/5 ${
                isPinned ? 'rotate-180' : ''
              } ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}
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
                className="lucide lucide-arrow-left w-3.5 h-3.5 stroke-[1.3]"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="px-5">
          <ScrollPanel style={{ height: 'calc(100vh - 100px)' }}>
            <ul>
              {sidebarSections.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  {/* Section Title */}
                  <li
                    className={`mt-5 mb-3 text-xs text-[#64748b] uppercase truncate list-none ${
                      sidebarExpanded ? 'text-start font-normal' : 'text-center font-bold'
                    }`}
                    style={{ listStyle: 'none' }}
                  >
                    {sidebarExpanded ? section.title : '...'}
                  </li>

                  {/* Section Items */}
                  {section.items.map((item, itemIndex) => {
                    const isActive = location.pathname === item.route
                    return (
                      <li key={itemIndex}>
                        <Link
                          to={item.route}
                          className={`side-menu__link flex items-center ${
                            isActive
                              ? 'bg-[#f8f8ff] border-[e2e8f0cc] shadow-[0_2px_3px_rgba(0,0,0,0.043)]'
                              : ''
                          }`}
                        >
                          <img
                            src={item.icon}
                            alt={item.name}
                            className={`transition-all ${sidebarExpanded ? 'ml-0' : 'ml-1.5'}`}
                          />
                          <div
                            className={`truncate text-[#475569] text-sm ml-3 transition-all ${
                              sidebarExpanded ? 'opacity-100 w-fit' : 'opacity-0 w-0'
                            }`}
                          >
                            {item.name}
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </React.Fragment>
              ))}
            </ul>
          </ScrollPanel>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

