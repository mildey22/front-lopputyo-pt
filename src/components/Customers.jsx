import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
//import Button from '@mui/material/Button';
import { fetchCustomers } from "../customerapi";
//import AddTraining from "./AddTraining";
//import EditTraining from "./EditTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const [colDef] = useState([
        { field: 'lastname', filter: true, headerName: "Last name" },
        { field: 'firstname', filter: true, headerName: "First name" },
        { field: 'streetaddress', filter: true, headerName: "Street Address" },
        { field: 'postcode', filter: true, headerName: "Post code" },
        { field: 'city', filter: true },
        { field: 'email', filter: true },
        { field: 'phone', filter: true, headerName: "Phone number" },

    ]);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}

export default Customers;