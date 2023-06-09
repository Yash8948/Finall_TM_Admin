import React, {useState} from 'react'
import "../../client/company/edited.css"
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Row, Col } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import utils from 'utils'

const { Option } = Select


const ManageLocation = () => {
	const navigate = useNavigate();
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const handleViewDispatchFile = () => {
      console.log("object");
      navigate('/app/dashboards/file_manager/view_dispatch_file')
    }
    const handleManageLocation = () => {
      navigate('/app/dashboards/file_manager/add_file_location')
    }
    const handleAddNew = () => {
      navigate('/app/dashboards/file_manager/AddFile')
	  
    }
	
	// const handleManageGroup = () => {
	// 	navigate(`/app/apps/ecommerce/edit-product/${row.id}`)
	// }
	

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Product',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src={record.image} name={record.name}/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Category',
			dataIndex: 'category',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(price * 100) / 100).toFixed(2)} 
						prefix={'$'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		},
		{
			title: 'Stock',
			dataIndex: 'stock',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		},
		{
			title: 'Status',
			dataIndex: 'stock',
			render: stock => (
				// <Flex alignItems="center">{getStockStatus(stock)}</Flex>
        <div></div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					{/* <EllipsisDropdown menu={dropdownMenu(elm)}/> */}
				</div>
			)
		}
	];
	
	

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : ProductListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	

	return (
		<Card title="Manage Location"  extra={  <Button
      type="primary"
      // value="0"
      // name="save"
      // htmlType="submit"
      // onClick={hanldeSaveAndGoToList}
      onClick={() =>   navigate('/app/dashboards/file_manager/add_location')}
      style={{ width: "100%",whiteSpace: "normal" }}
    >
      Add Location
    </Button>} > 
			
			
			<div className="table-responsive">
				<Table 
					columns="" 
					// dataSource={list} 
					rowKey='id' 
				/>
			</div>
		</Card>
	)
}

export default ManageLocation
