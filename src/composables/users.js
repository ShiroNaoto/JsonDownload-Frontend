import { ref, inject } from "vue";
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

export default function useUsers() {

    const swal = inject('$swal');
    const showMessage = (icon, title, text, html) => swal.fire({ icon, title, text, html, showConfirmButton: false, timer: 2500 });
    const users = ref([]);
    const user = ref([]);
    const errors = ref([]);

    const getUsers = async () => {
        const response = await axios.get(`users`);
        users.value = response.data;
    };

    const getUser = async (id) => {
        const response = await axios.get("users/" + id);
        user.value = response.data.data;
    };

    const storeUser = async (data) => {
        const modalRemoveButton = document.getElementById('modalremove');
        try {
            await axios.post("users", data);
            showMessage('success', 'Succesfully Registered!');
            modalRemoveButton.click();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const updateUser = async (id) => {
        const modalRemoveButton = document.getElementById(`modalremove${id}`);
        try {
            await axios.put("users/" + id, user.value);
            showMessage('success', 'User Updated!');
            modalRemoveButton.click();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const destroyUser = async (id) => {
        swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete("users/" + id);
                await getUsers();
                swal.fire("Deleted!", "The user has been deleted.", "success");
            }
        })
    };

    const authorizeUser = async (id) => {
        swal.fire({
            title: "Give Authorization?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, give access!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post("users/" + id +"/access");
                await getUsers();
                swal.fire("Granted!", "The user has been authorized", "success");
            }
        })
    };

    return {
        user,
        users,
        getUser,
        getUsers,
        storeUser,
        updateUser,
        destroyUser,
        authorizeUser,
        errors
    };
}