import * as React from 'react';
import { useMemo } from 'react';
import {DataGrid,} from '@mui/x-data-grid';
import cx from 'classnames'

import { Avatar} from '@mui/material'
import CallMadeIcon from '../../Shared/Icons/CallMadeIcon';


export default function AntDesignGrid() {
  const rows =[{
    id:'1232',
    volume:'30',
    quality:'Good',
    date: '20/2/2022',
    address: 'Binod nagar dhanbad',
    category: 'Drop',
    rider:{
      name:'sunny',
      photoURL:'https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
    },
     status: 'Delievered',
  },
  {
    id:'1237672',
    volume:'30',
    quality:'Good',
    date: '20/2/2022',
    address: 'Binod nagar dhanbad',
    category: 'Drop',
    rider:{
      name:'sunny',
      photoURL:'https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
    },
     status: 'Delayed',
  },]
  const columns = useMemo(
    () => [
  { field: 'id', headerName: 'Order ID', width: 70 },
  { field: 'volume', headerName: 'Volume (ml)', width: 90 },
  { field: 'quality', headerName: 'Quality', width: 130 },
  {field: 'date',headerName: 'Delivery Date',width: 130,},
  {field: 'address',headerName: 'Delivery Address',sortable: false,width: 260,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'category',
    headerName: 'Category',
    renderCell: (params) => (
      <div className='text-gs-blue text-sm font-semibold'>
       {params.row.category}
      </div>
    ),
  },
      {
        field: 'rider',
        headerName: 'Rider',
        width: 140,
        renderCell: (params) => (
          <div className='flex items-center justify-between'>
           <Avatar sx={{ width: 21, height: 21 }} src={params.row.rider.photoURL} />
           <h4 className='mx-2'>{params.row.rider.name}</h4>
           <CallMadeIcon />
          </div>
        ),
      },
      {
        field: 'status',
        headerName: 'Status',
        renderCell: (params) => (
          <div className={cx('bg-[#0F5223] text-white py-1 px-2 rounded-md',{'bg-[#B3261E]':params.row.status==='Delayed','bg-[#706D64]':params.row.status==='Out for delivery'})}>
           <h4>{params.row.status}</h4>
          </div>
        ),
      },
    ],
  );
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
