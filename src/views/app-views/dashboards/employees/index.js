import React, { useEffect, useState, useRef, useCallback } from 'react'
import "../../client/company/edited.css"
import { Select, Input, Button, Badge, Menu, Row, Col, Dropdown, Tooltip, Tag } from 'antd';

import { useReactToPrint } from "react-to-print";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Card from "components/shared-components/Card";
import Flex from 'components/shared-components/Flex'

import { EyeOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
// import { DownloadOutlined, EditOutlined, MessageOutlined } from "@ant-design/icons";
import { MdPassword } from "react-icons/md";
//datatable imports
// import { Table } from 'antd';
import { Table } from "ant-table-extensions";
import { SPACER } from "constants/ThemeConstant";
import {
	UserAddOutlined,
	FileExcelOutlined,
	PrinterOutlined,
	PlusOutlined,
	EllipsisOutlined,
	StopOutlined,
	ReloadOutlined,
} from "@ant-design/icons";

// import { Admin_Dashboard } from '../../../../services/AllDataService'
import ApiSnippets from "../../../../constants/ApiSnippet";
import { useNavigate } from "react-router-dom";
import Utils from 'utils';

const CardDropdown = ({ items }) => {
	return (
		<Dropdown
			menu={{ items }}
			trigger={["click"]}
			placement="bottomRight"
			arrow={{ pointAtCenter: true }}
		>
			<a
				href="/#"
				className="text-gray font-size-lg"
				onClick={(e) => e.preventDefault()}
			>
				<EllipsisOutlined />
			</a>
		</Dropdown>
	);
};


const Employees = () => {
	const navigate = useNavigate();
	const handleAddNew = () => {
		navigate('/app/dashboards/employees/add_employee')
	}




	const editEmployee = (elm) => {
		// console.log(elm.ID);

		navigate(`/app/dashboards/employees/edit_employee/:${elm.ID}`)
		
	}
	const deleteUser = async (userID) => {
		// console.log(userID);
		setLoading(true)
		let ApiData = {
			id: userID,
		};
		// console.log(ApiData);
		let response = await ApiSnippets("/Delete_Employee", ApiData);
		setLoading(false)
		fetchData();
		// console.log(response);
	}
	const resetPassword = (elm) => {
		console.log(elm);

		navigate(`/app/dashboards/employees/reset_password/:${elm}`)
	}
	const messageUser = (elm) => {
		console.log(elm);

		navigate(`/app/apps/chat/:${elm}`)
		
	}
	const permission = (elm) => {
		console.log(elm);

		navigate(`/app/dashboards/employees/permission/:${elm}`)
		
	}



	const columns = [
		// dataIndex: 'id',
		{
			title: "SrNo",
			dataIndex: "srno",
			defaultSortOrder: "ascend",
			// sorter:(a, b) => a.id - b.id,
			// render: (id, record, index) => {
			//   ++index;
			//   return index;
			// },
			width: "20%",
		},
		{
		  title: "ID",
		  dataIndex: "ID",
		  defaultSortOrder: "ascend",
		  // sorter:(a, b) => a.id - b.id,
		  // render: (id, record, index) => {
		  //   ++index;
		  //   return index;
		  // },
		  width: "20%",
		},
		{
			title: "User Name",
			dataIndex: "username",
			sorter: (a, b) => Utils.antdTableSorter(a, b, 'username'),
			width: "20%",
		},
		{
			title: "First Name",
			dataIndex: "first_name",
			sorter: (a, b) => Utils.antdTableSorter(a, b, 'first_name'),
			width: "20%",
		},
		{
			title: "Last Name",
			dataIndex: "last_name",
			sorter: (a, b) => Utils.antdTableSorter(a, b, 'last_name'),
			width: "20%",
		},
		{
			title: "Email ID",
			dataIndex: "email",
			filterSearch: true,
			//   onFilter: (value, record) => record.address.startsWith(value),
		},
		{
		  title: "Status",
		  dataIndex: "active",
		  // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
		  render: active => (
			<Tag className ="text-capitalize" color={active === '1'? 'cyan' : 'red'}>{active === '1' ? 'Active' : 'deactive'}</Tag>
		),
		},
		{
		  title: "Action",
		  dataIndex: "",
		  render: (elm) => (
			<div className="text-right d-flex ">
				<Tooltip title="View">
					<Button type="primary" className="mx-1" icon={<EyeOutlined />} onClick={() => editEmployee(elm)} size="small"/>
				</Tooltip>
				<Tooltip title="Delete">
					<Button danger className='mx-1' icon={<DeleteOutlined />} onClick={()=> deleteUser(elm.ID)} size="small"/>
				</Tooltip>
				<Tooltip title="Reset Password">
					<Button danger className='mx-1' icon={<MdPassword />} onClick={()=> resetPassword(elm.ID)} size="small"/>
				</Tooltip>
			</div>
		),
		  width: "20%",
		},
	];



	const componentRefPrint = useRef(null);
	const [tLsearchalue, setTLsearchalue] = useState(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	//table task list
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	//client log table api
	const fetchData = async (value) => {
		var offset = 0;

		setLoading(true);
		if (tableParams.pagination.current > 1) {
			offset =
				(tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
		}
		let ApiData = {
			type: 1,
			limit: tableParams.pagination.pageSize,
			offset: offset,
			search: value ? value : "",
		};
		// console.log(ApiData);
		let response = await ApiSnippets("/GetUsers", ApiData);
		let countObj = await response.data;

		for (let i = 0; i < countObj.length; i++) {
			// limit * currentpage - (limit -1)
			let current_page = tableParams.pagination.current;
			let page_limit = tableParams.pagination.pageSize;
			countObj[i].srno = page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
			countObj[i].on_date = new Date(
				countObj[i].on_date * 1000
			).toLocaleDateString("en-GB");
		}
		// console.log(countObj);
		// setClientTableData(countObj);
		// console.log(srno_array);
		// console.log(response.count);
		setData(response.data);
		// console.log(data);
		// setData(PclientLogData);
		setLoading(false);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: response.count,
				// total: 100,
				// 200 is mock data, you should read it from server
				// total: data.totalCount,
			},
		});
	};

	const reactToPrintContent = useCallback(() => {
		return componentRefPrint.current;
	}, [componentRefPrint.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "AwesomeFileName",
	});
	//pdf
	const exportPDFWithMethod = () => {
		let element = document.querySelector(".k-grid") || document.body;
		savePDF(element, {
			paperSize: "A4",
		});
	};

	//export csv
	const handleExport = () => {
		// console.log(exportBtnRef.current);
	};

	const latestTransactionOption = [
		{
			key: "Refresh",
			label: (
				<Flex alignItems="center" gap={SPACER[2]} onClick={fetchData}>
					<ReloadOutlined />
					<span className="ml-2">Refresh</span>
				</Flex>
			),
		},
		{
			key: "Print",
			label: (
				<Flex alignItems="center" gap={SPACER[2]} onClick={handlePrint}>
					<PrinterOutlined />
					<span className="ml-2">Print</span>
				</Flex>
			),
		},
		{
			key: "Export",
			label: (
				<Flex alignItems="center" gap={SPACER[2]} onClick={handleExport}>
					<FileExcelOutlined />
					<span className="ml-2">Export</span>
				</Flex>
			),
		},
		{
			key: "pdf",
			label: (
				<Flex alignItems="center" gap={SPACER[2]} onClick={exportPDFWithMethod}>
					<FileExcelOutlined />
					<span className="ml-2">PDFmethod</span>
				</Flex>
			),
		},
	];

	//on delete refresh 







	useEffect(() => {
		let value = tLsearchalue;
		fetchData(value);
		// console.log("in useeffect");
		// console.log(tLsearchalue);
		console.log(JSON.stringify(tableParams));
	  }, [JSON.stringify(tableParams)]);
	  // console.log("bare useeffect");
	  // console.log(JSON.stringify(tableParams));
	  const handleTableChange = (pagination, sorter) => {
		setTableParams({
			pagination,
			...sorter,
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};


	const onSelectChange = (newSelectedRowKeys) => {
		// console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	//task list table selected drop down
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
			{
				key: "odd",
				text: "Select Odd Row",
				onSelect: (changeableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return false;
						}
						return true;
					});
					setSelectedRowKeys(newSelectedRowKeys);
				},
			},
			{
				key: "even",
				text: "Select Even Row",
				onSelect: (changeableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return true;
						}
						return false;
					});
					setSelectedRowKeys(newSelectedRowKeys);
				},
			},
		],
	};


	const hanldeSearch_tasklist = (value, event) => {
		setTLsearchalue(value);
		const fetchDataOnSearch = async (value) => {
		  var offset = 0;
		  setLoading(true);
		  if (tableParams.pagination.current > 1) {
			offset =
			  (tableParams.pagination.current - 1) *
			  tableParams.pagination.pageSize;
		  }
		  let ApiData = {
			type:1,
			limit: tableParams.pagination.pageSize,
			offset: offset,
			search: value,
		  };
		  let response = await ApiSnippets("/GetUsers", ApiData);
		  let countObj = await response.data;
		  for (let i = 0; i < countObj.length; i++) {
			// limit * currentpage - (limit -1)
			let current_page = tableParams.pagination.current;
			let page_limit = tableParams.pagination.pageSize;
			countObj[i].srno = page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
			countObj[i].on_date = new Date(
			  countObj[i].on_date * 1000
			).toLocaleDateString("en-GB");
		  }
		  // console.log(countObj);
		  // setClientTableData(countObj);
		  // console.log(srno_array);
		  // console.log(response.count);
		  setData(response.data);
		  console.log(data);
		  setLoading(false);
		  setTableParams({
			...tableParams,
			pagination: {
			  ...tableParams.pagination,
			  total: response.count,
			  // total: 100,
			  // 200 is mock data, you should read it from server
			  // total: data.totalCount,
			},
		  });
		};
		fetchDataOnSearch(value);
	};




















	// const tableColumns = [
	// 	{
	// 		title: 'ID',
	// 		dataIndex: 'id'
	// 	},
	// 	{
	// 		title: 'Product',
	// 		dataIndex: 'name',
	// 		render: (_, record) => (
	// 			<div className="d-flex">
	// 				<AvatarStatus size={60} type="square" src={record.image} name={record.name}/>
	// 			</div>
	// 		),
	// 		sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
	// 	},
	// 	{
	// 		title: 'Category',
	// 		dataIndex: 'category',
	// 		sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
	// 	},
	// 	{
	// 		title: 'Price',
	// 		dataIndex: 'price',
	// 		render: price => (
	// 			<div>
	// 				<NumberFormat
	// 					displayType={'text'} 
	// 					value={(Math.round(price * 100) / 100).toFixed(2)} 
	// 					prefix={'$'} 
	// 					thousandSeparator={true} 
	// 				/>
	// 			</div>
	// 		),
	// 		sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
	// 	},
	// 	{
	// 		title: 'Stock',
	// 		dataIndex: 'stock',
	// 		sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
	// 	},
	// 	{
	// 		title: 'Status',
	// 		dataIndex: 'stock',
	// 		render: stock => (
	// 			// <Flex alignItems="center">{getStockStatus(stock)}</Flex>
	//     <div></div>
	// 		),
	// 		sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
	// 	},
	// 	{
	// 		title: '',
	// 		dataIndex: 'actions',
	// 		render: (_, elm) => (
	// 			<div className="text-right">
	// 				{/* <EllipsisDropdown menu={dropdownMenu(elm)}/> */}
	// 			</div>
	// 		)
	// 	}
	// ];





	// const onSearch = e => {
	// 	const value = e.currentTarget.value
	// 	const searchArray = e.currentTarget.value? list : ProductListData
	// 	const data = utils.wildCardSearch(searchArray, value)
	// 	setList(data)
	// 	setSelectedRowKeys([])
	// }



	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24} lg={24} xl={24}>
				<Card
					title="Task List"


				>
					<Flex alignItems="center" className=" mb-3 __card" justifyContent="space-between" mobileFlex={false} >
						{/* <Flex className="mb-1" mobileFlex={false}> */}
						<div className="mr-md-3 __div_search_box " style={{ justifyContent: "start" }} >
							{/* <Input className='__searchbox' placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} /> */}
							<Input.Search allowClear className="__searchbox" onSearch={hanldeSearch_tasklist} style={{ width: "100%" }} />
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
						<div style={{ justifyContent: "end" }}>
							<Row gutter={24}  >
								<Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingLeft: "0" }} >
									<Button onClick={handleAddNew} type="primary" className='__button mx-2' style={{ whiteSpace: "normal" }} block >Add New Employee</Button>
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
					{/* <div ref={componentRefPrint}> */}
					<PDFExport ref={componentRefPrint} paperSize="A4">
						<Table
							//  rowSelection={rowSelection}
							columns={columns}
							rowKey={(record) => record.ID} // id
							dataSource={data}
							pagination={tableParams.pagination}
							loading={loading}
							onChange={handleTableChange}
							// searchable={{fuzzySearch:true}}
							// exportable={}
							exportableProps={{
								showColumnPicker: true,
								fileName: "Task_List",
							}}
							// searchableProps={{ fuzzySearch: true }}
							style={{ overflow: "auto" }}
						/>
					</PDFExport>

					{/* </div> */}
				</Card>
			</Col>
		</Row>

	)
}

export default Employees
