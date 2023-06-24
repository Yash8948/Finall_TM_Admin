// import AddTaskForm from '../AddTaskForm'
// {/* <AddTaskForm mode="ADD"/> */}
import React, { useEffect } from "react";
import {
	Input,
	Row,
	Col,
	Card,
	Form,
	Upload,
	InputNumber,
	message,
	Select,
	Switch,
	Button,
	DatePicker,
	Space,
	Radio
} from "antd";
import { useNavigate } from "react-router-dom";

import ApiSnippets from "../../../../../constants/ApiSnippet";
import { useState } from "react";

const TaskADD = (props) => {
	const [loading, setLoading] = useState(false);
	const { Dragger } = Upload;
	const { RangePicker } = DatePicker;
	const { Option } = Select;
	const dateFormatList = ["DD/MM/YYYY"];
	const [clientName, setClientName] = useState(null);
	const [departmentName, setDepartmentNames] = useState(null);
	const [fileNames, setFileNames] = useState([]);
	const [companyData, setCompanyData] = useState([]);
	const [cardCounts, setCardCounts] = useState(null);
	const [isCLnameSelected, setIsCLnameSelected] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);
	const [glo_data_id, setGlo_data_id] = useState(null)
	let number = 0;
	const [selectedClientID, setSelectedClientID] = useState(null)
	const options = [];

	const navigate = useNavigate();

	const [messageApi, contextHolder] = message.useMessage();





	const successMsg = (msg) => {

		messageApi.success(msg);
	};
	const errorMsg = (msg) => {

		messageApi.error(msg);
	};


	const addfileinstialsValues = {
		addclientfile: ""
	};
	const addfilerules = {
		addclientfile: [
			{
				required: true,
				message: "Please enter file name",

			}
		]
	};

	const rules = {
		taskname: [
			{
				required: true,
				message: "Please enter task name",
			},
		],
		description: [
			{
				required: true,
				message: "Please enter task description",
			},
		],
		CLname: [
			{
				required: true,
				message: "Please enter Client Name",
			},
		],
		Sdate: [
			{
				required: true,
				message: "Please enter starting date",
			},
		],
		Ddate: [
			{
				required: true,
				message: "Please enter Deadline date",
			},
		],
		DEPname: [
			{
				required: true,
				message: "Please enter Department name",
			},
		],
		amount: [
			{
				required: true,
				message: "Please enter Amount",
			},
		],
		Auto_Complete:[
			{
				required: true,
				message: "Please select your any one !",
			},
		],
		Auto_Invoice:[
			{
				required: true,
				message: "Please select your any one !",
			},
		],

	};

	function onChange(value) {
		// console.log(`selected ${value}`);
	}

	function onBlur() {
		// console.log("blur");
	}

	function onFocus() {
		// console.log("focus");
	}

	function onSearch(val) {
		// console.log("search:", val);
	}
	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must be smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};
	const handleDatePicker = (date, dateString) => {
		// console.log(date, dateString);
	};
	function disabledDate(current) {
		// Can not select days before today and today
		// return current && current < dayjs().startOf("day");
	}
	const categories = ["Cloths", "Bags", "Shoes", "Watches", "Devices"];
	const tags = [
		"Cotton",
		"Nike",
		"Sales",
		"Sports",
		"Outdoor",
		"Toys",
		"Hobbies",
	];

	const handleClientSelectFile = async (value) => {
		setIsCLnameSelected(!!value)
		// console.log(value);
		setSelectedClient(value);

		

		if (value) {
			setSelectedClientID(value)
			setGlo_data_id(value);
			let data_id = {
				id: value
			}
			console.log("object");
			// console.log(data_id)
			let response = await ApiSnippets("/GetAllFileforTask", data_id);
			let data = response.data;
			// console.log(response)
			// let fileNames = data.map(item => item.id, item => item.text);
			// setFileNames(fileNames);
			// for (let index = 0; index < data.length; index++) {
			// 	selectfile.push({
			// 		id: data[index].id,
			// 		name: data[index].text
			// 	});
			// }
			// setFileNames(selectfile)
			// console.log(myObj[0].id);
			// console.log(selectfile);
		}
		
	};

	const handleSelectFileOnly = async () => {
		setLoading(true);
		var selectfile = []
		let id = {
			id: selectedClientID
		}
		let response = await ApiSnippets("/GetAllFileforTask", id);
		let data = response.data;
		console.log(data);
		let fileNames = data.map(item => item.id, item => item.text);
			setFileNames(fileNames);
			// console.log(data[0].id)
			for (let index = 0; index < data.length; index++) {
				selectfile.push({
					id: data[index].id,
					name: data[index].text
				});
			}
			setFileNames(selectfile)
		setLoading(false);
			
	}


	// useEffect((value) => {
	// 	if (dynamicChange) {
	// 		handleSelectFile(value);
	// 		console.log(dynamicChange);
	// 	}
	// 	}, [dynamicChange])
	// -=============================== get dashboard client id =================================================- //
	// var company = [
	// ];

	useEffect(() => {
		var company = [
		];
		const getAllData = async () => {
			let response = await ApiSnippets("/Company", null);
			let data = response.data;
			let clientName = data.map(item => item.name, item => item.id);
			setClientName(clientName);
			// console.log(data[0].id)
			for (let index = 0; index < data.length; index++) {
				company.push({
					id: data[index].id,
					name: data[index].name
				});
			}
			setCompanyData(company)
			// console.log(myObj[0].id);
			// console.log(company);
		};

		getAllData();

	}, []);
	// console.log(companyData)
	// -=============================== get all departments =================================================- //
	useEffect(() => {

		var depart = []

		const getAllData = async () => {
			let response = await ApiSnippets("/Department", null);
			let data = response.data;

			let departmentNames = data.map(item => item.name, index => index);
			setDepartmentNames(departmentNames);

			for (let index = 0; index < data.length; index++) {
				depart.push({
					id: data[index].id,
					name: data[index].name
				});
			}
			setDepartmentNames(depart)
			console.log(depart)
		};

		getAllData();

	}, []);
	// ==================================================
	var myfile = [];
	for (let index = 0; index < myfile.length; index++) {
		// myfile.push({id: response.data.client,
		// 	text:"heelo" });

	}



	const [form] = Form.useForm();
	const handleSubmit = async (value) => {
		let ApiData = {
			txtTaskname: value.taskname,
			Client: value.CLname,
			startingdate: value["Sdate"].format("YYYY-MM-DD"),
			deadlinedate: value["Ddate"].format("YYYY-MM-DD"),
			Department: value.DEPname,
			file: value.S_file,
			txtamount: value.amount,
			auto_cmplt: value.Auto_Complete === '1' ? "true" : "false" , 
			auto_inc: value.Auto_Invoice === '1' ? "true" : "false",
			txtComment: value.description,
		};


		let response = await ApiSnippets("/AddTask", ApiData);
		let AddTaskData = await response;


		if (AddTaskData.status === true) {
			successMsg(AddTaskData.message)
			setTimeout(() => {
				// form.resetFields();
			}, 500);
			navigate('/app/dashboards/task/taskonboard')


		} else {

			errorMsg(AddTaskData.message)
		}

		setLoading(false);



	};
	const handleAddFile = async (value) => {
		setSelectedClient(value);
		if (selectedClient) {

			let ApiData = {
				"client_id": glo_data_id,
				"name": document.querySelector('input[name="addclientfile"]').value
			};
			let jsonData = JSON.stringify(ApiData);

			console.log(jsonData);

			try {
				let response = await ApiSnippets("/InsertDataintoFile", ApiData);
				let addfile = await response;
				console.log(addfile)
				// console.log(countObj);
				// console.log(ApiData);

				setLoading(true);

				if (!response.status) {
					message.error(response.message);
					// handleSelectFile(value);
				}
				else {
					setTimeout(() => {
						// resetFields();
						// document.querySelector('input[name="addclientfile"]').resetFields();
						form.resetFields(["addclientfile"]);
						setLoading(false);
					}, 500);
					message.success(response.message)
				}

			} catch (error) {
				console.log(error);
				// message.error("Form submission failed");

			}
		}
	};







	return (
		<Form layout="vertical" onFinish={handleSubmit} form={form} className="w-100">

			{/* <Row gutter={16}> */}
				{/* <Col xs={24} sm={24} md={24} lg={24}> */}
					<Card title="Add Task">
						<Row gutter={16} justify="start">
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="taskname" label="Task Name" rules={rules.taskname}>
									<Input placeholder="Task Name" />
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="CLname" label="Client Name" rules={rules.CLname}>
									<Select
										showSearch
										style={{ width: "100%" }}
										placeholder="Select a Client"
										optionFilterProp="children"
										onChange={handleClientSelectFile}
										onFocus={onFocus}
										onBlur={onBlur}
										onSearch={onSearch}
										filterOption={(input, option) =>
											option.props.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										{companyData &&
											companyData.map((item, index) => (
												<Option key={index} value={item.id}>
													{item.name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="S_file" label="Select File" rules={[
										{
											required: true,
											message: "Please select your any one !",
										},
									]}>
									<Select
										disabled={!isCLnameSelected}
										mode="multiple"
										// onChange={(value) => {
										// 	value = { selectedClient }
										// }}
										onClick={handleSelectFileOnly}
									>
										{fileNames &&
											fileNames.map(item => (
												<Option key={item.id} value={item.id}>
													{item.name}
												</Option>
											))}

									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="addclientfile" label="Add File">
									<Space.Compact style={{ width: '100%' }}>
										<Input  placeholder="enter file name" disabled={!isCLnameSelected} name="addclientfile" />
										<Button type="primary" onClick={handleAddFile} disabled={!isCLnameSelected}>Add File</Button>
									</Space.Compact>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item label="Starting Date : " name="Sdate" rules={rules.Sdate} >
									<DatePicker
										// defaultValue={dayjs()}
										format={dateFormatList}
										disabledDate={disabledDate}
										onChange={handleDatePicker}
										style={{ width: "100%" }}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item label=" Deadline Date : " name="Ddate" rules={rules.Ddate} >
									<DatePicker
										// defaultValue={dayjs()}
										format={dateFormatList}
										disabledDate={disabledDate}
										onChange={handleDatePicker}
										style={{ width: "100%" }}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="DEPname" label="Department Name" rules={[
										{
											required: true,
											message: "Please select your any one !",
										},
									]}>
									<Select
										showSearch
										style={{ width: "100%" }}
										placeholder="Select a Department"
										optionFilterProp="children"
										onChange={onChange}
										onFocus={onFocus}
										onBlur={onBlur}
										onSearch={onSearch}
										filterOption={(input, option) =>
											option.props.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										{departmentName &&
											departmentName.map((item, index) => (
												<Option key={index} value={item.id}>
													{item.name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="amount" label="Amount" rules={rules.amount}>
									<Input
										type="NumberFormat"
										onKeyPress={(event) => {
											if (!/[0-9]/.test(event.key)) {
												event.preventDefault();
											}
										}}
										className='w-100 ' />
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item
									label="Auto Complete "
									name="Auto_Complete"
									rules={[
										{
											required: true,
											message: "Please select your any one !",
										},
									]}
								>
								<Radio.Group initialValues="" buttonStyle="solid">
									<Radio.Button name="active" value="1" >Yes</Radio.Button>
									<Radio.Button name="deactive" value="0" >No</Radio.Button>
								</Radio.Group>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item
									label="Auto Invoice"
									name="Auto_Invoice"
									rules={[
										{
											required: true,
											message: "Please select your any one !",
										},
									]}
								>
								<Radio.Group initialValues="0" buttonStyle="solid">
									<Radio.Button name="active" value="1" >Yes</Radio.Button>
									<Radio.Button name="deactive" value="0" >No</Radio.Button>
								</Radio.Group>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<Form.Item
									name="description"
									label="Description"
									rules={rules.description}
								>
									<Input.TextArea rows={4} />
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item>
									{contextHolder}
									<Button
										type="primary" htmlType="submit" className="w-100"
									>Submit</Button>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item>
									{contextHolder}
									<Button
										danger type="primary"  className="w-100"
									>Cancel</Button>
								</Form.Item>
							</Col>
						</Row>
					</Card>
				{/* </Col> */}
			{/* </Row > */}

		</Form>
	);
};

export default TaskADD;
