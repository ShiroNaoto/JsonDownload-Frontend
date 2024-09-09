import { ref, inject } from "vue";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

export default function useRedis() {
    const swal = inject('$swal');
    const showMessage = (icon, title, text, html) => swal.fire({ icon, title, text, html, showConfirmButton: false, timer: 2500 });
    const keys = ref([]);
    const keyItem = ref([]);
    const errors = ref([]);

    // Function to fetch all Redis keys from the server
    const getKeys = async () => {
        try {
            const response = await axios.get('redis/keys');
            keys.value = response.data; // Assign the fetched keys to the reactive variable
        } catch (error) {
            console.error('Failed to fetch Redis keys:', error);
            errors.value.push(error.response ? error.response.data.message : error.message);
            showMessage('error', 'Error', 'Failed to fetch Redis keys');
        }
    };

    // Function to download a specific Redis key's content as a JSON file
    const downloadTerm = async (key) => {
        try {
            const response = await axios.get(`redis/keys/download/term/${key}`, {
                responseType: 'blob' // Set response type to 'blob' for file download
            });
    
            // Create a URL for the downloaded file and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${key}.json`);
            document.body.appendChild(link);
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up the DOM
        } catch (error) {
            console.error('Failed to download Redis key:', error);
            errors.value.push(error.response ? error.response.data.message : error.message);
            showMessage('error', 'Error', 'Failed to download Redis key');
        }
    };

    const downloadSOA = async (key) => {
        try {
            const response = await axios.get(`redis/keys/download/soa/${key}`, {
                responseType: 'blob' // Set response type to 'blob' for file download
            });
    
            // Create a URL for the downloaded file and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${key}.json`);
            document.body.appendChild(link);
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up the DOM
        } catch (error) {
            console.error('Failed to download Redis key:', error);
            errors.value.push(error.response ? error.response.data.message : error.message);
            showMessage('error', 'Error', 'Failed to download Redis key');
        }
    };
    
    return {
        keys,
        keyItem,
        getKeys,
        downloadTerm,
        downloadSOA,
        errors
    };
}
