import axios from "axios";
const loginUser = async (formData) => {
    const url = 'https://recruitment-test.gltkdev.com/login';

    try {
        const res = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return res;
    } catch (error) {
        console.error('Error:', error.response.data.detail.code);
        const msg = error.response.data.detail.code;
        return msg;
    }
};

export default loginUser;
