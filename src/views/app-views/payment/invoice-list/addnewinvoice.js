import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Tabs,
  Form,
  Button,
  message,
  Row,
  Col,
  Card,
  Spin,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  Space,
} from "antd";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";
import { newlineChars } from "pdf-lib";
import { cleanData, type } from "jquery";
import { forIn } from "lodash";
const options = [];

const AddNewInvoice = () => {
  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [companyData, setCompanyData] = useState([]);
  const [clientName, setClientName] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [getSaum, setGetSaum] = useState([{}]);
  const [old_array, setOld_array] = useState([{ id: "Amount[0]", value: "0" }]);
  const [new_array, setNew_array] = useState([]);
  const [num, setNum] = useState(0);
  //console.log(totalAmount);
  const successMsg = (msg) => {
    // message.success(countObj.message);
    messageApi.success(msg);
  };
  const errorMsg = (msg) => {
    // message.success(countObj.message);
    messageApi.error(msg);
  };

  const getTotal = () => {
    let total = 0;
    let check = true;
    console.log(old_array);
    Object.entries(old_array).map(
      ([key, price]) => (
        (check = isNaN(parseInt(price.value))),
        check == false && (total += parseInt(price.value))
      )
    );
    setTotalAmount(parseInt(total));
    // form.setFieldValue([
    //   "TotalAmount"total
    // ])
    form.setFieldsValue({
      TotalAmount: total,
    });
  };
  const hanldeGetValue = (e, index) => {
    let check = true;
    let keys = e.target.name;
    let values = e.target.value;
    Object.entries(old_array).map(
      ([key, price]) =>
        price.id === keys && ((price.value = values), (check = false))
    );
    if (check) {
      old_array.push({ id: keys, value: values });
    }
    getTotal();
  };

  const handleDelete = (name) => {
    console.log(name);
    name += 1;
    let new_name = "";
    let new_price = "";
    let array_index = 0;
    let field_name = "Amount[" + name + "]";
    Object.entries(old_array).map(
      ([key, price]) =>
        price.id != field_name &&
        ((new_name = "Amount[" + array_index + "]"),
        (new_price = price.value),
        new_array.push({ id: new_name, value: new_price }),
        (array_index += 1))
    );

    setOld_array([]);
    setOld_array(new_array);
  };

  useEffect(() => {
    getTotal();
    setNum(null);
  }, [num]);

  const handleform = async (value) => {
    console.log(value);
    setLoading(true);
    let extra_particular = [];
    let extra_amount = [];

    
    let extra = value.AddedFieldsData;
    if (extra) {
      console.log(extra.length);
      
      console.log(value.AddedFieldsData);
      for (let i = 0; i < extra.length; i++) {
        extra_particular.push(extra[i].particular);
        extra_amount.push(extra[i].amount);
      }
    }
      console.log(extra_particular);
      console.log(extra_amount);
    

    let ApiData = {
      Client: value.CLname,
      particular: value.particular,
      amount: value.amount,
      "extra_amount[]": extra_amount.length !== 0 ? extra_amount : null,
      "extra_particular[]": extra_particular.length !== 0 ? extra_particular : null ,
      "btnSave":"Save"
      // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
      // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);

    let response = await await ApiSnippets("/Add_Invoice", ApiData);

    let countObj = await response;

    console.log(countObj);

    if (countObj.status === true) {

          successMsg(countObj.message)
          setTimeout(() => {
            navigate("/app/payment/invoice_list");
            // form.resetFields();
            }, 500);
      }

    // if (btnStatus === 1) {
    //     // console.log("btnStatus: ",btnStatus);
    //     navigate('/app/client/manage_group');
    // }

    // } else {
    //     // message.error(countObj.message);
    //     errorMsg(countObj.message)
    // }

    setLoading(false);
  };

  const handleCancel = () => {
    navigate("/app/payment/invoice_list");
  };
  useEffect(() => {
    var company = [];
    const getAllData = async () => {
      let response = await ApiSnippets("/Company", null);
      let data = response.data;
      let clientName = data.map(
        (item) => item.name,
        (item) => item.id
      );
      setClientName(clientName);
      // console.log(data[0].id)
      for (let index = 0; index < data.length; index++) {
        company.push({
          id: data[index].id,
          name: data[index].name,
        });
      }
      setCompanyData(company);
      // console.log(myObj[0].id);
      // console.log(company);
    };

    getAllData();
  }, []);

  return (
    <>
      <Form layout="vertical" form={form} onFinish={handleform}>
        {/* <PageHeaderAlt className="border-bottom">
          <div className="container">
          onFinish={handleAddClient}
            <Flex
              className="py-0"
              mobileFlex={false}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="mb-0">Add Client</h2>
            </Flex>
          </div>
        </PageHeaderAlt> */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title="Add New Custom Invoice" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="CLname"
                        label="Client Name"
                        rules={[
                          {
                            required: true,
                            message: "Please select your Client!",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a Client"
                          optionFilterProp="children"
                          // onChange={handleClientChange}
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
                    {/* add fields btn moto btn */}
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      {/* <div style={{ marginBottom: 0,textAlign:" center" }}><Form.Item></Form.Item></div> */}
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div>
                        <Form.Item
                          label="Particular  : "
                          name="particular"
                          rules={[
                            {
                              required: true,
                              message: "Please input your message!",
                            },
                          ]}
                        >
                          <Input placeholder="" id="asd" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Row gutter={24}>
                          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                            <Form.Item
                              label="Amount"
                              name="amount"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter Amount!",
                                },
                              ]}
                            >
                              <Input
                                id="Amount"
                                name="Amount"
                                type="NumberFormat"
                                onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                                onChange={hanldeGetValue}
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={4} md={4} lg={4} xl={4}></Col>
                        </Row>
                      </div>
                    </Col>

                    <Form.List name="AddedFieldsData">
                      {(fields, { add, remove }) => (
                        <>
                          {/* <React.Fragment key={key} > */}
                          {fields.map(({ key, name, ...restField }) => (
                            <React.Fragment key={key}>
                              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <div>
                                  <Form.Item
                                    {...restField}
                                    label={`${name + 1}-Particular`}
                                    name={[name, "particular"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please input Particular!",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Enter particular" />
                                  </Form.Item>
                                </div>
                              </Col>
                              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                <div>
                                  <Form.Item
                                    {...restField}
                                    label={`${name + 1}-Amount`}
                                    name={[name, "amount"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please input Amount!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      id="Amounta"
                                      name={`Amount[${name + 1}]`}
                                      type="NumberFormat"
                                      // instialsValues={paymentAmount}
                                      onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                      onChange={hanldeGetValue}
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                </div>
                              </Col>
                              <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                                <div>
                                  <Form.Item label=" ">
                                    <Button
                                      danger
                                      type="primary"
                                      onClick={() => {
                                        setNum(1);
                                        remove(name);
                                        name += 1;
                                        let new_name = "";
                                        let new_price = "";
                                        let array_index = 0;
                                        let field_name = "Amount[" + name + "]";
                                        Object.entries(old_array).map(
                                          ([key, price]) =>
                                            price.id != field_name &&
                                            ((new_name =
                                              "Amount[" + array_index + "]"),
                                            (new_price = price.value),
                                            new_array.push({
                                              id: new_name,
                                              value: new_price,
                                            }),
                                            (array_index += 1))
                                        );
                                        setOld_array([]);
                                        setOld_array(new_array);
                                        setNew_array([]);
                                        getTotal();
                                        getTotal();
                                        getTotal();

                                        // setTotalAmount((prevState) => ({
                                        //   ...prevState,
                                        //   [`Amount[${name + 1}]`]: 0,
                                        // }));
                                      }}
                                      // onClick={()=>handleDelete(name)}
                                      style={{
                                        width: "100%",
                                        whiteSpace: "normal",
                                        boxShadow: "none",
                                      }}
                                    >
                                      <MinusCircleOutlined />
                                    </Button>
                                  </Form.Item>
                                </div>
                              </Col>
                            </React.Fragment>
                          ))}
                          {/* </React.Fragment> */}
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div
                              style={{ marginBottom: 0, textAlign: " center" }}
                            >
                              <Form.Item label=" " rules="">
                                <Button
                                  type="primary"
                                  onClick={() => add()}
                                  style={{
                                    width: "100%",
                                    whiteSpace: "normal",
                                    boxShadow: "none",
                                  }}
                                >
                                  <PlusOutlined /> Add Fields
                                </Button>
                              </Form.Item>
                            </div>
                          </Col>
                        </>
                      )}
                    </Form.List>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item label="Total Amount" name="TotalAmount">
                          <Input
                            // disabled={true}
                            readOnly={true}
                            id="Amount"
                            type="NumberFormat"
                            // instialsValues={paymentAmount}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                          {contextHolder}
                          <Button
                            type="primary"
                            value="0"
                            name="save"
                            htmlType="submit"
                            // onClick={() => setBtnStatus(1)}
                            style={{ width: "100%", whiteSpace: "normal" }}
                          >
                            Save
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                          {contextHolder}
                          <Button
                            danger
                            type="primary"
                            value="0"
                            name="cancel"
                            // htmlType="submit"
                            onClick={handleCancel}
                            // onClick={() => setBtnStatus(1)}
                            style={{
                              width: "100%",
                              whiteSpace: "normal",
                              boxShadow: "none",
                            }}
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </Spin>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddNewInvoice;
