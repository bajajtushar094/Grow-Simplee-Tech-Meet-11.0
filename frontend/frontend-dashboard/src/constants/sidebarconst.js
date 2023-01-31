export const routePaths = {
    dashboard: '/dashboard',
    ridermanagement: '/ridermanagement',
    warehouse: '/warehouse',
    inventory: '/warehouse/inventory',
    history:  '/warehouse/history',
    inhouse:  '/warehouse/inhouse',
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
        id: 'gs_warehouse',
        label: 'Warehouse',
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
        id: 'gs_history',
        label: 'History',
        value: routePaths.history,
    },
    {
        id: 'gs_inhouse',
        label: 'Inhouse',
        value: routePaths.inhouse,
    },
]
export const LHS_TABS_VOL = [
    {
        id: 'gs_live_feed_1',
        label: 'Live Feed 1',
        value: routePaths.livefeed1,
    },
    {
        id: 'gs_live_feed_2',
        label: 'Live Feed 2',
        value: routePaths.livefeed2,
    },
    {
        id: 'gs_live_feed_3',
        label: 'Live Feed 3',
        value: routePaths.livefeed3,
    },
    {
        id: 'gs_live_feed_4',
        label: 'Live Feed 4',
        value: routePaths.livefeed4,
    },
    {
        id: 'gs_live_feed_5',
        label: 'Live Feed 5',
        value: routePaths.livefeed5,
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