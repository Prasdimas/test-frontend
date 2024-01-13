import axios from "axios";
export const Image = async (photo)=>{
    try {
        const formData = new FormData();
        formData.append('file', photo);
        const response = await axios.post('https://recruitment-test.gltkdev.com/user/photo/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (userData) =>{
    const photofilename = await Image(userData.photo);
    const userDataRegister = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        password: userData.password,
        age: userData.age,
        photos: [photofilename]
    };
    try {
        const url = 'https://recruitment-test.gltkdev.com/user';
        const response = await axios.post(url, userDataRegister,{
            headers:{
                'Content-Type':'application/json',
                },
        });
        return response;
    } catch (error) {
       const msg = error.response.data.detail;
       return msg;
    }
}