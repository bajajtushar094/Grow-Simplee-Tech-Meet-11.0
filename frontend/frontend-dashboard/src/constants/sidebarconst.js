export const routePaths = {
    dashboard: '/dashboard',
    ridermanagement: '/ridermanagement',
    inventory: '/inventory',
    repository: '/repository',
    raiseissue: 'raiseissue',
    issuestatus: 'issuestatus',
    profile: `/student/profile/`,
    login: '/login',
}
export const TOP_TABS = [
    {
        id: 'gs_dashboard',
        label: 'Dashboard',
        value: routePaths.dashboard,
    },
    {
        id: 'gs_rider_management',
        label: 'Rider Management',
        value: routePaths.ridermanagement,
    },
    {
        id: 'gs_inventory',
        label: 'Inventory',
        value: routePaths.inventory,
    },
]
export const LHS_TABS = [
    {
        id: 'gs_inventory',
        label: 'Inventory',
        value: routePaths.inventory,
    },
    {
        id: 'gs_repository',
        label: 'Repository',
        value: routePaths.repository,
    },
]
export const LHS_BOTTOM_TABS = [
    {
        id: 'gs_raise_issue',
        label: 'Raise Issue',
        value: routePaths.raiseissue,
    },
    {
        id: 'gs_issue_status',
        label: 'Issue Status',
        value: routePaths.issuestatus,
    },
]