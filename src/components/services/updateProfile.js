import axios from "axios";

export const updateProfile = async ( name, updatedUser ) => {
    const response = await axios.put(`/users/updateProfile/${name}`, updatedUser );
    return response.data.message;
}
