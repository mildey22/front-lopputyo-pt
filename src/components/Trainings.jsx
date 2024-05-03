import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { parseISO } from "date-fns";
import format from "date-fns/format";
//import Button from '@mui/material/Button';
import { fetchTrainings } from "../trainingapi";
//import AddTraining from "./AddTraining";
//import EditTraining from "./EditTraining";

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
    ]);

    const handleFetch = () => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    function formatDate(params) {
        return format(parseISO(params.value), "dd-MM-yyy HH:mm");
      }

    return (
        <>
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