export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_TRAININGS)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);

            return response.json();
        })
}