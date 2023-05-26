import React,{useState,useEffect, useRef} from 'react'
import {CSVLink} from "react-csv"
import { useReactToPrint } from 'react-to-print';
import { DeleteOutlined,EditOutlined,FilePdfOutlined} from '@ant-design/icons';
import {Button} from 'antd'
import { Table } from "ant-table-extensions";
import ApiSnippets from 'constants/ApiSnippet'
const TaskReports = () => {
  const [dataSource, setDataSource] = useState([])
  const [data, setData] = useState(null)
const columns=[
  {
  title:'Sr No.',
  dataIndex:'id',
  
  },
  {
  title:'Title',
  dataIndex:'title',
  },
  {
  title:'Description',
  dataIndex:'description',
  },
  {
  title:'Date',
  dataIndex:'date',
  render: (date) => new Date(date * 1000).toLocaleDateString('en-GB'),
  },
];
useEffect(() => {
  const getData = async () => {

    const response = await ApiSnippets("/AdminDashboard",null)
    setDataSource(response.data.holiday)

  }
  getData();
}, [])
console.log(dataSource);
const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
     
            {dataSource && 
      <>
    <div ref={componentRef}>
    <Table
    // rowSelection={rowSelection}
     columns={columns}
     // rowKey={(record) => record.login.uuid}// id
     dataSource={dataSource}
    //  pagination={tableParams.pagination}
    //  loading={loading}
    //  onChange={handleTableChange}
    size="small"
      style={{ overflow: 'auto'}}
      exportableProps={{ showColumnPicker: true}}
      searchableProps={{ fuzzySearch: true }}
   />
     </div>
     </>
   }
    </div>
  )
}

export default TaskReports;
