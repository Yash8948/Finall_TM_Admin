import React, { useState, useEffect } from 'react'
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

} from "antd";
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import ApiSnippets from 'constants/ApiSnippet';
import { values } from 'lodash';


const AddReceiptForm = () => {

    const [loading, setLoading] = useState(false);
    const [isCLnameSelected, setIsCLnameSelected] = useState(false);
    const [isInvoiceFileSelcted, setIsInvoiceFileSelected] = useState(false);
    const [invoiceSelect, setinvoiceSelect] = useState(null)
    const [glo_invoice_id, setGlo_invoice_id] = useState(null)
    const [selectedClient, setSelectedClient] = useState(null);
    const [glo_data_id, setGlo_data_id] = useState(null)
    const [invoiceFile, setInvoiceFile] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [clientName, setClientName] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState([])
    const [paymentAmount, setPaymentAmount] = useState(null)
    const [paymentData, setPaymentData] = useState([])
    const [invoiceId, setInvoiceId] = useState("");
    const dateFormatList = ["DD/MM/YYYY"];
    const { Option } = Select;
    const [messageApi, contextHolder] = message.useMessage();



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

        CLname: [
            {
                required: true,
                message: "Please enter Client Name",
            },
        ],
        SInvoice: [
            {
                required: true,
                message: " Select Invoice",
            },
        ],
        Paiddate: [
            {
                required: true,
                message: "Please enter Paid On Date ",
            },
        ],
        Payable_amount: [
            {
                required: true,
                message: "Please enter Payable Amount",
            },
        ],
        description: [
            {
                required: true,
                message: "Please enter task description",
            },
        ],
        Pmethod: [
            {
                required: true,
                message: "Please select payment method",
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
    const handleDatePicker = (date, dateString) => {
        // console.log(date, dateString);
    };
    function disabledDate(current) {
        // Can not select days before today and today
        // return current && current < dayjs().startOf("day");
    }

    const successMsg = (msg) => {

        messageApi.success(msg);
    };
    const errorMsg = (msg) => {

        messageApi.error(msg);
    };
    const [form] = Form.useForm();
    const handleSubmit = async (values) => {
        let ApiData = {
            Client: values.CLname,
            file: values.SInvoice,
            payment: values.Pmethod,
            amt: values.amount,
            pay_amount: values.Payable_amount,
            refer: values.Rnumber,
            paid_on: values["Paiddate"].format("YYYY-MM-DD"),
            desc: values.description,
            save: "save"
        };
        console.log(ApiData);

        let response = await ApiSnippets("/Add_Payment", ApiData);


        let RecepitData = await response;
        console.log(RecepitData)
        if (RecepitData.status === true) {
            successMsg(RecepitData.message)
            setTimeout(() => {
                form.resetFields();
            }, 500);
        } else {

            errorMsg(RecepitData.message)
        }

        setLoading(false);
    };



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
    const handleClientChange = async (value) => {
        setIsCLnameSelected(!!value)
        setSelectedClient(value);

        var selectfile = []

        if (value) {
            setGlo_data_id(value);
            let data_id = {
                id: value
            }
            console.log(data_id)
            let response = await ApiSnippets("/get_all_invoice_by_client", data_id);
            let data = response.data;
            // console.log(response)
            let invoiceFile = data.map(item => item.id, item => item.text);
            setInvoiceFile(invoiceFile);
            // console.log(data[0].id)
            for (let index = 0; index < data.length; index++) {
                selectfile.push({
                    id: data[index].id,
                    name: data[index].text
                });

            }
            setInvoiceFile(selectfile)
            // console.log(myObj[0].id);
            console.log(selectfile);
        };
    };
    useEffect(() => {
        var payment = [
        ];
        const getAllData = async () => {
            let response = await ApiSnippets("/PaymentMethod", null);
            let data = response.data;
            let paymentMethod = data.map(item => item.name, item => item.id);
            setPaymentMethod(paymentMethod)

            // console.log(data[0].id)
            for (let index = 0; index < data.length; index++) {
                payment.push({
                    id: data[index].id,
                    name: data[index].name
                });

            }
            setPaymentData(payment)
            // console.log(myObj[0].id);
            // console.log(payment);
        };

        getAllData();

    }, []);



    const handleInvoiceChange = async (value) => {
        setIsInvoiceFileSelected(!!value);
        setinvoiceSelect(value);
        console.log(value);
        var amount = "";

        if (value) {
            setGlo_invoice_id(value);
            for (let index = 0; index < value.length; index++) {
                amount += value[index];
                amount += ","
            }
            let invoice_id = {
                "id": amount
            }
            let response = await ApiSnippets("/get_amount_by_invoice_id", invoice_id);
            let data = response.data;
            console.log(data.amount);
            form.setFieldsValue({
                amount: data.amount,
                Payable_amount: data.amount
            });
            setPaymentAmount(data.amount);
            console.log(paymentAmount)

            // document.getElementById('Amount').innerHTML = data.amount
            // document.getElementById('PayableAmount').innerHTML = data.amount
            console.log(document.getElementById('Amount'))
            console.log(document.getElementById('PayableAmount'))
        }
    };
    // React.useEffect(() => {
    //     form.setFieldsValue({
    //       amount: "0",
    //     });
    //   }, []);
    return (

        <Row gutter={16}>

            <Card title="Add Recepit"
                className='w-100 '>
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Row gutter={16} justify="start">
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="CLname" label="Client Name" rules={rules.CLname}>
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="Select a Client"
                                    optionFilterProp="children"
                                    onChange={handleClientChange}
                                    // onFocus={onFocus}
                                    // onBlur={onBlur}
                                    // onSearch={onSearch}
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
                            <Form.Item name="SInvoice" label="Select Invoice" rules={rules.SInvoice}>
                                <Select
                                    disabled={!isCLnameSelected}
                                    mode="multiple"
                                    onChange={handleInvoiceChange}
                                >
                                    {invoiceFile &&
                                        invoiceFile.map(item => (
                                            <Option key={item.id} value={item.id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} justify="start">
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="Pmethod" label="Payment Method" rules={rules.Pmethod}>
                                <Select>
                                    {paymentData &&
                                        paymentData.map(item => (
                                            <Option key={item.id} value={item.id}>
                                                {item.name}
                                            </Option>
                                        ))}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Amount" name="amount">

                                <Input
                                    readOnly
                                    id='Amount'
                                    type="NumberFormat"
                                    // instialsValues={paymentAmount}
                                    onChange={handleInvoiceChange}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}

                                    className='w-100 '
                                />



                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} justify="start">
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Payable Amount" name="Payable_amount" rules={rules.Payable_amount}>

                                <Input

                                    type="NumberFormat"
                                    id='PayableAmount'
                                    value={paymentAmount}

                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    // onChange={(value) => {
                                    //     value = { invoiceSelect }
                                    // }}
                                    className='w-100 '
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                            <Form.Item label="Refrence Number" name="Rnumber">
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
                    </Row>


                    <Row gutter={16} justify="start">
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Paid On : " name="Paiddate" rules={rules.Paiddate} >
                                <DatePicker
                                    format={dateFormatList}
                                    disabledDate={disabledDate}
                                    onChange={handleDatePicker}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                            <Form.Item
                                name="description"
                                label="Description"
                                rules={rules.description}
                            >
                                <Input.TextArea rows={1} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button
                            type="primary" htmlType="submit" className='w-100'
                        >Submit</Button>
                    </Form.Item>
                </Form>
            </Card>


        </Row >

    )
}

export default AddReceiptForm
