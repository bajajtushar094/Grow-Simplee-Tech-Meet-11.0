import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    packages: [
/*        {
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E2',
            isInBag: false,
            isCancelled: false,
            isDelivered: false,
            isFailed: false,
            latitude: 26.189605193409417, 
            longitude: 91.69294796870521, 
            type:'delivery',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: false,
        },
        {
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E3',
            isInBag: false,
            isCancelled: false,
            isDelivered: false,
            isFailed: false,
            latitude: 26.166979228463582, 
            longitude: 91.75049812487305, 
            type:'pickup',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: false,
        },
        {
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E4',
            isInBag: false,
            isCancelled: false,
            isDelivered: false,
            isFailed: false,
            latitude: 26.177219357664082, 
            longitude: 91.76409504583465, 
            type:'delivery',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: false,
        },
        {
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E5',
            isInBag: false,
            isCancelled: false,
            isDelivered: false,
            isFailed: false,
            latitude: 26.169605193409417, 
            longitude: 91.61294796870521, 
            type:'pickup',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: true,
        },
        {
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E6',
            isInBag: false,
            isCancelled: false,
            isDelivered: false,
            isFailed: false,
            latitude: 26.180605193409417, 
            longitude: 91.55294796870521, 
            type:'delivery',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India - 781039',
            isNew: false,
        }, */
        
    ],
    loggedIn: false,
    userId: null,
    bagId: null,
    tripId: null,
    isBagScanned: false,
    isAtWarehouse: true,
    totalDelivered: 0,
}

export const riderSlice = createSlice({
    name: 'rider',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
            if(!action.payload.loggedIn)
            {
                state.userId = null;
                state.bagId = null;
                state.isBagScanned = false;
                state.isAtWarehouse = true;
                state.packages = null
                state.totalDelivered = 0;
            }
        },

        setUserId: (state, action) => {
            state.userId = action.payload;
        },

        setBagId: (state, action) => {
            state.bagId = action.payload;
        },

        setTripId: (state, action) => {
            state.tripId = action.payload;
        },

        setIsBagScanned: (state, action) => {
            state.isBagScanned = action.payload;
        },

        setIsAtWarehouse: (state, action) => {
            state.isAtWarehouse = action.payload;
        },

        setIsInBag: (state, action) => {
            state.packages.forEach((item) => {
                if(item.orderId === action.payload.orderId) {
                    item.isInBag = action.payload.isInBag;
                }
            })
        },

        setIsCancelled: (state, action) => {
            state.packages.forEach((item) => {
                if(item.orderId === action.payload.orderId) {
                    item.isCancelled = action.payload.isCancelled;
                }
            })
        },

        setIsDelivered: (state, action) => {
            state.packages.forEach((item) => {
                if(item.orderId === action.payload.orderId) {
                    item.isDelivered = action.payload.isDelivered;
                }
            })
            state.totalDelivered = state.packages.filter((item) => item.isDelivered).length;
        },

        setIsNew: (state, action) => {
            state.packages.forEach((item) => {
                if(item.orderId === action.payload.orderId) {
                    item.isNew = action.payload.isNew;
                }
            })
        },

        setIsFailed: (state, action) => {
            state.packages.forEach((item) => {
                if(item.orderId === action.payload.orderId) {
                    item.isFailed = action.payload.isFailed;
                }
            })
        },

        addPackage: (state, action) => {
            state.packages.push(action.payload);
        },

        removePackage: (state, action) => {
            state.packages = state.packages.filter((item) => item.orderId !== action.payload.orderId);
            state.totalDelivered = state.packages.filter((item) => item.isDelivered).length;
        },

        addPackages: (state, action) => {
            state.packages = action.payload;
        }

    }
});

export const {setLoggedIn, setUserId, setBagId, setTripId, setIsBagScanned, setIsAtWarehouse, setIsInBag, setIsCancelled, setIsDelivered, setIsNew, setIsFailed, addPackage, removePackage, addPackages} = riderSlice.actions;

export const getPackages = (state) => state.rider.packages;
export const getLoggedIn = (state) => state.rider.loggedIn;
export const getUserId = (state) => state.rider.userId;
export const getBagId = (state) => state.rider.bagId;
export const getTripId = (state) => state.rider.tripId;
export const getIsBagScanned = (state) => state.rider.isBagScanned;
export const getTotalDelivered = (state) => state.rider.totalDelivered;
export const getIsAtWarehouse = (state) => state.rider.isAtWarehouse;

export default riderSlice.reducer;