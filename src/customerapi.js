export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_CUSTOMERS)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);

            return response.json();
        })
}