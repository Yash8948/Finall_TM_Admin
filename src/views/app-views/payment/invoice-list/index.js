import React, {useState} from 'react'
import "../../client/company/edited.css";
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


const InvoiceList = () => {
	const navigate = useNavigate();
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

    // const handleManageComments = () => {
      
    //   navigate('/app/client/manage_comments')
    // }
    const handleAddNew = () => {
    //   console.log("object");
      navigate('/app/payment/add_invoice')
	  
    }
	
	// const handleManageGroup = () => {
	// 	navigate('/app/client/manage_group')
	// }
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
		<Card title="Invoice List"  > 
			<Flex alignItems="center" className=" mb-3 __card" justifyContent="space-between" mobileFlex={false} >	
				{/* <Flex className="mb-1" mobileFlex={false}> */}
					<div className="mr-md-3 __div_search_box " style={{justifyContent:"start"}} >
						<Input className='__searchbox' placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
					</div>
					{/* <div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="Category"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div> */}				
				{/* </Flex> */}
					<div style={{justifyContent:"end"}}>
						<Row gutter={24}  >
							<Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingLeft:"0"}} >
								<Button onClick={handleAddNew} type="primary" className='__button mx-2' block >Add Invoice</Button>
							</Col>
							{/* <Col xs={24} sm={8} md={8} lg={8} xl={8} style={{paddingLeft:"0"}}>
								<Button onClick={handleManageGroup} type="primary" className='__button mx-2' block >Manage Group</Button>
							</Col>
							<Col xs={24} sm={8} md={8} lg={8} xl={8} style={{paddingLeft:"0"}}>
								<Button onClick={handleManageComments} type="primary" className='__button mx-2 p-1' block>Manage Comments</Button>
							</Col> */}
						</Row>
					</div>
			</Flex>
			
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

export default InvoiceList;
