import axios from "../axios"

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (idInput) => {
    return axios.get(`/api/get-all-users?id=${idInput}`, {
        id: idInput
    })
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUSerService = (id) => {
    return axios.delete('/api/delete-user', { data: { id: id } });

}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
}

const getAllCodeService = (data) => {
    return axios.get(`/api/allcode?type=${data}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = (limit) => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctorsService = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}

const getDetailInfoDoctors = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}




export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUSerService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorsService,
    getDetailInfoDoctors
}

