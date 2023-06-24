import React, { Component, useRef, useEffect, useState } from 'react'
import { PrinterOutlined, PayCircleFilled } from '@ant-design/icons';
import { Card, Table, Button } from 'antd';
// import { invoiceData } from './invoiceData';
import NumberFormat from 'react-number-format';
import { useReactToPrint } from 'react-to-print';
import { useNavigate, useParams } from "react-router-dom";
import ApiSnippets from "constants/ApiSnippet";
import logo from './ca.png'
import Tasklogo from './TaskImage.jpg'
const { Column } = Table;

const ViewClientInvoice = () => {

    // total() {
    // 	let total = 0;
    // 	invoiceData.forEach((elm) => {
    // 		total += elm.price;
    // 	})
    // 	return total
    // }
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Invoice-File ",
        onAfterPrint: () => alert("print done")

    })
    const [invoiceData, setInvoiceData] = useState()
    const [onDate, setOnDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const viewInvoiceDataId = id.slice(1, id.length);
    const [data, setData] = useState();
    const [total, setTotal] = useState(0);
    const [totalInWords, setTotalInWords] = useState();


    const InvoiceDataTable = [
        {
            title: "Particular",
            dataIndex: "particular",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "start",

        },
        {
            title: "Amount (₹)",
            dataIndex: "amount",
            // filterSearch: true,
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "end",
            // render: (amount) => (
            //     <NumberFormat
            //         displayType={'text'}
            //         value={amount}
            //         prefix={'₹'}
            //         thousandSeparator={true}
            //     />
            // ),

        },
    ]
    function convertAmountToWords(amount) {
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if (amount === 0) {
            return 'Zero';
        }

        const scales = ['', 'Thousand', 'Million', 'Billion'];
        let scaleCounter = 0;
        let amountInWords = '';

        while (amount > 0) {
            const threeDigitChunk = amount % 1000;
            let chunkInWords = '';

            if (threeDigitChunk > 0) {
                const hundreds = Math.floor(threeDigitChunk / 100);
                const tensAndUnits = threeDigitChunk % 100;

                if (hundreds > 0) {
                    chunkInWords += units[hundreds] + ' Hundred ';
                }

                if (tensAndUnits > 0 && tensAndUnits < 10) {
                    chunkInWords += units[tensAndUnits];
                } else if (tensAndUnits >= 10 && tensAndUnits < 20) {
                    chunkInWords += teens[tensAndUnits - 10];
                } else if (tensAndUnits >= 20) {
                    const tensDigit = Math.floor(tensAndUnits / 10);
                    const unitsDigit = tensAndUnits % 10;

                    chunkInWords += tens[tensDigit] + ' ' + units[unitsDigit];
                }
            }

            if (chunkInWords !== '') {
                amountInWords = chunkInWords + ' ' + scales[scaleCounter] + ' ' + amountInWords;
            }

            scaleCounter++;
            amount = Math.floor(amount / 1000);
        }

        return amountInWords.trim() + ' Only /-';
    }



    const getClientById = async () => {
        // console.log(viewInvoiceDataId)
        // console.log(id)

        let ApiData = {
            "id": viewInvoiceDataId,
            // "type": 2
        };
        // console.log(ApiData);
        let response = await ApiSnippets("/generate_invoice", ApiData);
        // console.log(response.data);

        let ClientInvoiceData = await response.data;
        const InvoiceTableData = ClientInvoiceData.task_particulars
        console.log(InvoiceTableData)
        setData(InvoiceTableData)

        // Calculate the total amount
        let totalAmount = 0;
        InvoiceTableData.forEach((item) => {
            totalAmount += parseInt(item.amount);
        });
        console.log(totalAmount)
        setTotal(totalAmount);
        const totalAmountInWords = convertAmountToWords(totalAmount);
        console.log(totalAmountInWords);
        setTotalInWords(totalAmountInWords)

        // Convert the totalAmount to the desired format
        // const formattedTotalAmount = (totalAmount / 100).toFixed(2);

        // setTotal(formattedTotalAmount);

        const unixTime = await ClientInvoiceData.date_of_create;
        const date = new Date(unixTime * 1000);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;


        const dueDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()); // Adding 1 month to the date

        const formattedDueDate = `${dueDate.getDate()}-${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
        console.log(formattedDate);
        console.log(formattedDueDate);
        console.log(ClientInvoiceData)


        setOnDate(formattedDate);
        setDueDate(formattedDueDate)
        setInvoiceData(ClientInvoiceData)
        // console.log(invoiceData.company.mobile)


    }
    useEffect(() => {
        getClientById();
    }, []);

    return (
        <Card className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h1> Invoice </h1>
                </div>
                <div className="">
                    <Button type="primary" onClick={handlePrint}>
                        <PrinterOutlined type="printer" />
                        <span className="ml-1">Print</span>
                    </Button>

                    {/* <Button type="primary" onClick={handlePrint} style={{marginLeft: "10px"}}> */}
                    {/* <PayCircleFilled type="button" /> */}
                    {/* <span>Paid</span>
                    </Button> */}

                </div>
            </div>
            {invoiceData &&
                <Card ref={componentRef} title={<h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem' }}>INVOICE</h1>}>
                    <div >

                        <div className="d-md-flex justify-content-md-between">
                            <div>
                                {/* <div>
                                    <img src={logo} alt="" style={{ width: "30%", height: "30%" }} />
                                </div> */}
                                <address>
                                    <p>
                                        <span className="font-weight-semibold text-dark font-size-md">CHARTERED ACCOUNTANTS</span><br />
                                        {/* <span>9498 Harvard Street</span><br />
                                    <span>Fairfield, Chicago Town 06824</span><br /> */}
                                        <span className="text-dark" title="Phone"> Phone:</span>

                                        <span> {invoiceData.company.mobile} </span> <br />
                                        <span className="text-dark" title="Email"> Email:</span>
                                        <span> {invoiceData.company.email} </span>
                                    </p>
                                </address>
                            </div>
                            <div className="mt-3 text-right">
                                <img src={Tasklogo} alt="" style={{ width: "30%", height: "50%" }} />
                            </div>
                        </div>
                        <Card>
                            <div className="d-md-flex justify-content-md-between">
                                <div className="mt-3 text-left">
                                    <h4 className="mb-1 font-weight-semibold">To</h4>
                                    <p className="font-weight-semibold text-dark font-size-md">{invoiceData.company.name}</p>
                                    <address>
                                        <p>
                                            <span className="font-weight-semibold text-dark font-size-sm">{invoiceData.company.proprietor_name}</span><br />
                                            <span className="text-dark font-size-sm">{invoiceData.company.add1}</span><br />
                                            <span className="text-dark font-size-sm">{invoiceData.company.add2}</span><br />
                                            <span className="text-dark font-size-sm">{invoiceData.company.state}</span><br />
                                            <span className="text-dark font-size-sm">{invoiceData.company.mobile}</span><br />
                                        </p>
                                    </address>
                                </div>
                                <div className="mt-3 text-right">
                                    <h4 className="mb-5 font-weight-semibold">ORIGINAL / DUPLICATE</h4>
                                    <address>
                                        <p>
                                            <h4>Bill No: 1</h4>
                                            <span className="text-dark" title="Date"> Date: </span>

                                            <span className="font-weight-semibold text-dark font-size-md">{onDate}</span><br />

                                            <span className="text-dark" title="DueDate"> Due Date: </span>

                                            <span className="font-weight-semibold text-dark font-size-md">{dueDate}</span><br />
                                        </p>
                                    </address>
                                </div>
                            </div>

                            <div>
                                <Table
                                    columns={InvoiceDataTable}
                                    dataSource={data}
                                    pagination={false}
                                />

                                <div className="d-flex justify-content-end">
                                    <h2 className="font-weight-semibold mt-3">
                                        <span className="mr-1">Grand Total: </span>
                                        <NumberFormat
                                            displayType={'text'}
                                            // value={((Math.round((this.total()) * 100) / 100) - (this.total() / 100) * 10).toFixed(2)}
                                            value={total}
                                            prefix={'₹'}
                                            thousandSeparator={true}
                                        />
                                    </h2>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <h4> Amount in Words: Rs.  {totalInWords} </h4>

                                </div>
                            </div>

                        </Card>


                        <div className="mt-4">
                            <p className="mt-5">
                                <small>
                                    In exceptional circumstances, Financial Services can provide an urgent manually processed special cheque.
                                    Note, however, that urgent special cheques should be requested only on an emergency basis as manually
                                    produced cheques involve duplication of effort and considerable staff resources. Requests need to be
                                    supported by a letter explaining the circumstances to justify the special cheque payment
                                </small>
                            </p>
                        </div>
                        <hr className="d-print-none" />
                    </div>
                </Card >
            }


        </Card >
    );
}


export default ViewClientInvoice