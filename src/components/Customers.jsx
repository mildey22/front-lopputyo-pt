import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import { fetchCustomers } from "../customerapi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer"

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
        { field: 'postcode', filter: true, headerName: "Post code", width: 120 },
        { field: 'city', filter: true, width: 120 },
        { field: 'email', filter: true },
        { field: 'phone', filter: true, headerName: "Phone number", width: 150 },
        {
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer}/>,
                width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => handleDelete(params.data._links.customer.href)}>
                    Delete
                </Button>, width: 120
        }
    ]);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const handleAdd = (newCustomer) => {
        fetch(import.meta.env.VITE_API_CUSTOMERS, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in adding a customer: " + response.statusText)

                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }

    //Page has to be reloaded after deleting a customer, not sure why
    const handleDelete = (url) => {
        if (window.confirm("Are you sure? Deleting a customer deletes all trainings assigned to that customer!")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error in deleting customer: " + response.statustext);

                    return response.json();
                })
                .then(() => setCustomers())
                .catch(err => console.error(err))
        }
    }

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type' : 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in updating customer: " + response.statusText)

            return response.json();
        })
        .then(() => handleFetch())
            .catch(err => console.error(err))
    }


    return (
        <>
            <AddCustomer handleAdd={handleAdd} />
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