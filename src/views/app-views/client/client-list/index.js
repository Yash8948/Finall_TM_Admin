import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, Select, Input, Button, Badge, Menu, Form, Modal, Tag, Tooltip } from 'antd';

import { Table } from "ant-table-extensions";

import { SPACER } from "constants/ThemeConstant";

import ProductListData from "assets/data/product-list.data.json"
import {
	EyeOutlined,
	DeleteOutlined,
	SearchOutlined,
	FileExcelOutlined,
	PrinterOutlined,
	PlusOutlined,
	EllipsisOutlined,
	StopOutlined,
	PlusCircleOutlined,
	EditOutlined,
	MessageOutlined,
	ReloadOutlined
} from '@ant-design/icons';
import { useReactToPrint } from "react-to-print";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import { MdPassword } from "react-icons/md";
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import utils from 'utils'
import ApiSnippets from 'constants/ApiSnippet';
import "../company/edited.css"
import { act } from 'react-dom/test-utils';
import "./editbuutton.css"
const { Option } = Select
const ADD = 'ADD'
const EDIT = 'EDIT'


const ClientList = (props) => {
	const { mode = ADD, param } = props

	const navigate = useNavigate();
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [clientTableData, setClientTableData] = useState(null);
	const [statusData, setStatusData] = useState(null);
	const [cLsearchvalue, setCLsearchvalue] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const componentRefPrint = useRef(null);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});
	const [form] = Form.useForm();

	const handleAddClient = () => {
		console.log("object");
		navigate('/app/client/addclientform')
	}

	const viewDetails = row => {
		// navigate(`/app/apps/ecommerce/edit-product/${row.id}`)
	}
	// useEffect(() => {
	// 	if (mode === EDIT) {
	// 		console.log('is edit')
	// 		console.log('props', props)
	// 		const { id } = param
	// 		const produtId = parseInt(id)
	// 		const productData = ProductListData.filter(product => product.id === produtId)
	// 		const product = productData[0]
	// 		form.setFieldsValue({
	// 			comparePrice: 500,
	// 			cost: 0.00,
	// 			taxRate: 6,
	// 			description: 'There are many variations of passages of Lorem Ipsum available.',
	// 			category: product.category,
	// 			name: product.name,
	// 			price: product.price
	// 		})
	// 	}
	// }, [form, mode, param, props]);

	const handleEdit = (elm) => {
		console.log(elm);

		navigate(`/app/client/client_list/edit_clientform/:${elm}`)
	}
	const deleteUser = async (userID) => {
		console.log(userID);	
		setLoading(true)
		let ApiData = {
			id: userID,
		};
		console.log(ApiData);
		let response = await ApiSnippets("/Delete_Client", ApiData);
		setLoading(false)
		fetchData();
		console.log(response);
	}

	const columns = [
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
			title: 'User Name',
			dataIndex: 'username',
			// render: (_, record) => (
			// 	<div className="d-flex">
			// 		<AvatarStatus size={60} type="square" src={record.image} name={record.name}/>
			// 	</div>
			// ),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'username'),
			width: "20%",

		},
		{
			title: 'First Name',
			dataIndex: 'first_name',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'first_name'),
			width: "20%",

		},
		{
			title: 'Last Name',
			dataIndex: 'last_name',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'last_name'),
			width: "20%",

		},
		{
			title: 'Email Id',
			dataIndex: 'email',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'email'),
			width: "20%",

		},
		{
			title: 'Status',
			dataIndex: 'active',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'active'),
			width: '20%',
			render: (_, record) => {
				const activeData = record.active; // Assuming `record.active` contains the active value for the current record
				console.log(activeData)
				if (activeData === '1') {
					return <Tag color="blue">Active</Tag>;
				} else {
					return <Tag color="red">Inactive</Tag>;
				}
			}
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			width: "20%",

			render: (_, elm) => (

				<div className="text-right d-flex justify-content-center">
					<Tooltip title="Edit">
						<Button className="mr-2" icon={<EditOutlined />} onClick={() => handleEdit(elm.ID)} size="small" />
					</Tooltip>
					<Tooltip title="Reset Password">
						<Button className="mr-2" icon={<MdPassword />} onClick={() => { this.deleteUser(elm.id) }} size="small" />
					</Tooltip>
					<Tooltip title="View">
						<Button className="mr-2" icon={<EyeOutlined />} onClick={() => { this.deleteUser(elm.id) }} size="small" />
					</Tooltip>

					<Tooltip title="Message">
						<Button className="mr-2" icon={<MessageOutlined />} onClick={() => { this.deleteUser(elm.id) }} size="small" />
					</Tooltip>
					<Tooltip title="Delete">
						<Button className="mr-2" icon={<DeleteOutlined />} onClick={() => deleteUser(elm.ID)} size="small" />
					</Tooltip>

				</div>

			)
		}
	];
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
	const exportPDFWithComponent = () => {
		if (componentRefPrint.current) {
			componentRefPrint.current.save();
		}
	};
	//export csv
	const handleExport = () => {
		// console.log(exportBtnRef.current);
	};



	const fetchData = async (value) => {
		var offset = 0;
		setLoading(true);
		if (tableParams.pagination.current > 1) {
			offset =
				(tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
		}
		let ApiData = {
			limit: tableParams.pagination.pageSize,
			offset: offset,
			search: value && value,
		};
		let response = await ApiSnippets("/GetUsers", ApiData);
		let countObj = await response.data;

		let activeData = []; // Array to store the active values

		for (let i = 0; i < countObj.length; i++) {
			let active = countObj[i].active;
			activeData.push(active); // Push the active value into the array
		}
		console.log(activeData)
		for (let i = 0; i < countObj.length; i++) {
			let current_page = tableParams.pagination.current;
			let page_limit = tableParams.pagination.pageSize;
			countObj[i].srno = page_limit * current_page - (page_limit - i - 1);
			countObj[i].on_date = new Date(countObj[i].on_date * 1000).toLocaleDateString("en-GB");
		}

		setClientTableData(countObj);
		setData(response.data);
		setLoading(false);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: response.count,
			},
		});

		setStatusData(activeData); // Set the activeData array to the state
	};


	useEffect(() => {
		let value = cLsearchvalue;
		fetchData(value);
		// console.log("in useeffect");
		// console.log(cLsearchvalue);
		// console.log(JSON.stringify(tableParams));
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
	const hanldeSearch_clientlist = (value, event) => {
		setCLsearchvalue(value);
		const fetchDataOnSearch = async (value) => {
			var offset = 0;
			setLoading(true);
			if (tableParams.pagination.current > 1) {
				offset =
					(tableParams.pagination.current - 1) *
					tableParams.pagination.pageSize;
			}
			let ApiData = {
				type: 1,
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
		{
			key: "pdf",
			label: (
				<Flex
					alignItems="center"
					gap={SPACER[2]}
					onClick={exportPDFWithComponent}
				>
					<FileExcelOutlined />
					<span className="ml-2">PDFcomponent</span>
				</Flex>
			),
		},
	];

	// 	  });
	// 	};
	// 	fetchDataOnSearch(value);
	// 	// console.log(typeofvalue);
	//   };
	return (
		<>
			<Card title="Client List">
				<Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input.Search allowClear className="__searchbox" onSearch={hanldeSearch_clientlist} style={{ width: "100%" }} />
						</div>
						<div className="mb-3">
							{/* <Select 
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
						</Select> */}
						</div>
					</Flex>
					<div>
						<Button onClick={handleAddClient} type="primary" icon={<PlusCircleOutlined />} block >Add Client</Button>
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
							fileName: "Client_List",
						}}
						// searchableProps={{ fuzzySearch: true }}
						style={{ overflow: "auto" }}
					/>
				</PDFExport>
				{/* </div> */}
			</Card>
		</>

	)
}

export default ClientList







