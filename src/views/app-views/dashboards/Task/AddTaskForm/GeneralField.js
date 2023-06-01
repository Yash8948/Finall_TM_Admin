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
	Space
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import ApiSnippets from "../../../../../constants/ApiSnippet";
import { useState } from "react";

const GeneralField = (props) => {
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
	const options = [];







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
	const instialsValues = {
		name: "",
		description: "",
		CLname: "",
		Ddate: "",
		ammount: "",
		DEPname: "",
		Sdate: "",
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
		ammount: [
			{
				required: true,
				message: "Please enter Amount",
			},
		],
		switchValue: false,
	};

	const imageUploadProps = {
		name: "file",
		multiple: true,
		listType: "picture-card",
		showUploadList: false,
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
	const handleClientChange = async (value) => {
		setIsCLnameSelected(!!value)
		setSelectedClient(value);

		var selectfile = []

		if (selectedClient) {
			setGlo_data_id(value);
			let data_id = {
				id: value
			}
			// console.log(data_id)
			let response = await ApiSnippets("/GetAllFileforTask", data_id);
			let data = response.data;
			// console.log(response)
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
			// console.log(myObj[0].id);
			// console.log(selectfile);
		};






		// console.log(value)
	};

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
		const getAllData = async () => {
			let response = await ApiSnippets("/Department", null);
			let data = response.data;

			let departmentNames = data.map(item => item.name, index => index);
			setDepartmentNames(departmentNames);
		};

		getAllData();

	}, []);
	// ==================================================
	var myfile = [];
	for (let index = 0; index < myfile.length; index++) {
		// myfile.push({id: response.data.client,
		// 	text:"heelo" });

	}



	// =============================== all file name ========================//

	// const [value, setValue] = useState([]);
	// const selectProps = {
	// 	mode: 'multiple',
	// 	style: {
	// 		width: '100%',
	// 	},
	// 	value,
	// 	options,
	// 	onChange: (value) => {
	// 		value = { selectedClient }
	// 	},
	// 	placeholder: 'Select File...',
	// 	maxTagCount: 'responsive',
	// };
	const [form] = Form.useForm();
	const handleSubmit = async (values) => {
		let ApiData = {
			txtTaskname: values.taskname,
			Client: values.CLname,
			startingdate: values["Sdate"].format("YYYY-MM-DD"),
			deadlinedate: values["Ddate"].format("YYYY-MM-DD"),
			Department: values.DEPname,
			file: values.S_file,
			auto_cmplt: values.switchValue1,
			txtamount: values.ammount,
			auto_inc: values.switchValue2,
			txtComment: values.description,
		};

		// console.log(ApiData);

		try {
			let response = await ApiSnippets("/AddTask", ApiData);
			let countObj = await response;

			// console.log(countObj);
			// console.log(ApiData);

			setLoading(true);

			setTimeout(() => {
				form.resetFields();
				setLoading(false);
			}, 500);

			message.success("Form submitted successfully");
		} catch (error) {
			console.log(error);
			message.error("Form submission failed");
		}
	};
	const handleAddFile = async (value) => {
		setSelectedClient(value);
		if (selectedClient) {


			let ApiData = {
				"client_id": glo_data_id,
				"name": document.querySelector('input[name="addclientfile"]').value
			};
			let jsonData = JSON.stringify(ApiData);

			// console.log(jsonData);

			try {
				let response = await ApiSnippets("/InsertDataintoFile", ApiData);
				let addfile = await response;
				console.log(addfile)
				// console.log(countObj);
				// console.log(ApiData);

				setLoading(true);

				setTimeout(() => {
					Input.resetFields();
					setLoading(false);
				}, 500);
				if (!response.status) {
					message.error(response.message);
				}
				else{
					message.success(response.message)
				}
				
			} catch (error) {
				console.log(error);
				// message.error("Form submission failed");

			}
		}
	};







	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={14} lg={16} xl={16}>
				<Card title="Add Task">
					<Form layout="vertical" onFinish={handleSubmit} form={form}>
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
										onChange={handleClientChange}
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
						</Row>
						<Row gutter={16} justify="start">
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="S_file" label="Select File" >
									<Select
										disabled={!isCLnameSelected}
										mode="multiple"
										onChange={(value) => {
											value = { selectedClient }
										}}


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
								<Form.Item label="Add File">
									<Space.Compact style={{ width: '100%' }}>
										<Input placeholder="enter file name" disabled={!isCLnameSelected} name="addclientfile" />
										<Button type="primary" onClick={handleAddFile} disabled={!isCLnameSelected}>Add File</Button>
									</Space.Compact>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16} justify="start">
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
						</Row>


						<Row gutter={16} justify="start">
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="DEPname" label="Department Name" >
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
											departmentName.map((name, index) => (
												<Option key={index}>
													{name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="ammount" label="Amount" rules={rules.ammount}>
									<InputNumber
										formatter={(value) =>
											`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
										}
										parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
										className="w-100"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16} justify="start">
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item
								// valuePropName= "sssss"
									name="switchValue1"
									label="Auto Complete"
									labelCol={{ span: 8 }}
									wrapperCol={{ span: 16 }}
									style={{ marginBottom: 0 }}
								>
									<Switch
										name="switchValue1"
										checkedChildren="Yes"
										unCheckedChildren="No"
									// defaultChecked
									/>
								</Form.Item>

							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item
									// valuePropName= "sasas"
									name="switchValue2"
									label="Auto Invoice"
									labelCol={{ span: 8 }}
									wrapperCol={{ span: 16 }}
									style={{ marginBottom: 0 }}
								>
									<Switch
										name="switchValue2"
										checkedChildren="Yes"
										unCheckedChildren="No"

									/>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							name="description"
							label="Description"
							rules={rules.description}
						>
							<Input.TextArea rows={4} />
						</Form.Item>
						{/* <Row gutter={16} justify="end">
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										// style={{ width: "100%" }
									>
										Submit
									</Button>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item>
									<Button>Cancle</Button>
								</Form.Item>
							</Col>
						</Row> */}
						<Form.Item>
							<Button
								type="primary" htmlType="submit"
							>Submit</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={10} lg={8} xl={8}>
				<Card title="Add File">
					<Dragger
						{...imageUploadProps}
						beforeUpload={beforeUpload}
						onChange={(e) => props.handleUploadChange(e)}
					>
						{props.uploadedImg ? (
							<img src={props.uploadedImg} alt="avatar" className="img-fluid" />
						) : (
							<div>
								{props.uploadLoading ? (
									<div>
										<LoadingOutlined className="font-size-xxl text-primary" />
										<div className="mt-3">Uploading</div>
									</div>
								) : (
									<div>
										<CustomIcon className="display-3" svg={ImageSvg} />
										<p>Click or drag file to upload</p>
									</div>
								)}
							</div>
						)}
					</Dragger>
				</Card>
				{/* <Card title="Organization">
					<Form layout="vertical">
						<Form.Item name="category" label="Category">
							<Select placeholder="Category">
								{categories.map((elm) => (
									<Option key={elm} value={elm}>
										{elm}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="tags" label="Tags">
							<Select mode="tags" style={{ width: "100%" }} placeholder="Tags">
								{tags.map((elm) => (
									<Option key={elm}>{elm}</Option>
								))}
							</Select>
						</Form.Item>
					</Form>
				</Card> */}
			</Col>
		</Row >
	);
};

export default GeneralField;

// const GeneralField = () => {
//   return (

//   )
// }

// export default GeneralField
