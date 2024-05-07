import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { parseISO } from "date-fns";
import format from "date-fns/format";
import Button from '@mui/material/Button';
import { fetchTrainings } from "../trainingapi";
import AddTraining from "./AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Trainings() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const [colDef] = useState([
        { field: 'date', filter: true, headerName: "Date", valueFormatter: formatDate },
        { field: 'duration', filter: true, headerName: "Duration (min)", width: 150 },
        { field: 'activity', filter: true, headerName: "Activity" },
        { headerName: "Customer", filter: true,  
        valueGetter: (p) =>
        p.data.customer.firstname + " " + p.data.customer.lastname 
        },
        //I'm not sure how to get ID from the gettrainings endpoint because it doesn't have a href link
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => handleDelete(params.data.id)}>
                    Delete
                </Button>, width: 120
        }
    ]);

    const handleFetch = () => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const handleAdd = (newTraining) => {
        fetch(import.meta.env.VITE_API_TRAININGS, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newTraining)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in adding a training: " + response.statusText)

                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }

    //Can't unfortunately get delete function to work here 
    const handleDelete = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error in deleting training: " + response.statustext);

                    return response.json();
                })
                .then(() => setTrainings())
                .catch(err => console.error(err))
        }
    }

    function formatDate(params) {
        return format(parseISO(params.value), "dd-MM-yyy HH:mm");
      }

    return (
        <>
        <AddTraining handleAdd={handleAdd} />
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}

export default Trainings;