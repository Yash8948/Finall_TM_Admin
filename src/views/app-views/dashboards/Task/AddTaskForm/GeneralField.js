import React from 'react';
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, Switch, Button } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Dragger } = Upload;
const { Option } = Select;

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
	name: [
		{
			required: true,
			message: 'Please enter task name',
		}
	],
	description: [
		{
			required: true,
			message: 'Please enter task description',
		}
	],
	CLname: [
		{
			required: true,
			message: 'Please enter Client Name',
		}
	],
	Sdate: [
		{
			required: true,
			message: 'Please enter starting date',
		}
	],
	Ddate: [
		{
			required: true,
			message: 'Please enter DeadLine date',
		}
	],
	DEPname: [
		{
			required: true,
			message: 'Please enter Department name',
		}
	],
	ammount: [
		{
			required: true,
			message: 'Please enter Amount',
		}
	],
	switchValue: false
};

const imageUploadProps = {
	name: 'file',
	multiple: true,
	listType: "picture-card",
	showUploadList: false,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
};

const beforeUpload = file => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must be smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices'];
const tags = ['Cotton', 'Nike', 'Sales', 'Sports', 'Outdoor', 'Toys', 'Hobbies'];


const onFinish = (values) => {
	const myHeaders = new Headers();
	myHeaders.append('Xtoken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Im1va3NoZXMiLCJwYXNzd29yZCI6IiQyYSQxMiRRem1TZkFZalhGR0E0RzZWREdZblRPM2dXM21xdEJJWnlYM3VhRUNyUW12WGVSN1I0QVNOYSJ9.N9AFKPmku7qScJaRwIBMsiOIyr6Cx6Bfjf_n2Q05Df4');
	myHeaders.append('Content-Type', 'text/plain');
	myHeaders.append('Cookie', 'ci_session=a2be498892beaf505fd5bf0e816b70bf');

	const raw = JSON.stringify({
		txtTaskname: values.name,
		Client: values.CLname,
		file: [7, 2], // Replace with the actual file IDs
		fileadd: '',
		startingdate: values.Sdate,
		deadlinedate: values.Ddate,
		Department: values.DEPname,
		auto_cmplt: values.switchValue ? '1' : '0',
		txtamount: values.ammount,
		auto_inc: values.switchValue ? '1' : '0',
		txtComment: values.description
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch('https://task.mysyva.net/backend/AddTask', requestOptions)
		.then((response) => response.text())
		.then((result) => {
			// Handle the API response
			console.log(result);
			message.success('Form submitted successfully');
		})
		.catch((error) => {
			// Handle the API error
			console.log('error', error);
			message.error('Form submission failed');
		});
};

const GeneralField = (props) => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={14} lg={16} xl={16}>
			<Card title="Add Task">
				<Form layout="vertical" initialValues={instialsValues} onFinish={onFinish}>
					<Row gutter={16} justify="start">
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="name" label="Task Name" rules={rules.name}>
								<Input placeholder="Task Name" />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="CLname" label="Client Name">
								<Select>
									<Option>test</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16} justify="start">
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="Sdate" label="Starting Date" rules={rules.Sdate}>
								<Input type="date" placeholder="" />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="Ddate" label="Deadline Date" rules={rules.Ddate}>
								<Input type="date" placeholder="" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16} justify="start">
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="DEPname" label="Department Name">
								<Select>
									<Option>test</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="ammount" label="Amount" rules={rules.ammount}>
								<InputNumber
									formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									className='w-100'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16} justify="start">
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="switchValue1" label="Auto Complete" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
								<Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item name="switchValue2" label="Auto Invoice" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
								<Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name="description" label="Description" rules={rules.description}>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Row gutter={16} justify="end">
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item>
								<Button type="primary" htmlType="submit">Submit</Button>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item>
								<Button>Cancle</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>

			</Card>
		</Col>
		<Col xs={24} sm={24} md={10} lg={8} xl={8}>
			<Card title="Add File">
				<Dragger {...imageUploadProps} beforeUpload={beforeUpload} onChange={e => props.handleUploadChange(e)}>
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
			<Card title="Organization">
				<Form layout="vertical">
					<Form.Item name="category" label="Category">
						<Select placeholder="Category">
							{categories.map(elm => (
								<Option key={elm} value={elm}>
									{elm}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="tags" label="Tags">
						<Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
							{tags.map(elm => (
								<Option key={elm}>{elm}</Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Card>
		</Col>
	</Row>
);

export default GeneralField;
