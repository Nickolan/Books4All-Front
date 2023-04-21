import axios from "axios";

export const postPicture = async ( name, pictureUrl ) => {
    const response = await axios.put(`http://localhost:3001/users/updateProfilePic/${name}`, {picture: pictureUrl} );
    return 0;
}
