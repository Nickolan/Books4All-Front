import axios from "axios";

export const postPicture = async ( name, pictureUrl ) => {
    const response = await axios.put(`/users/updateProfilePic/${name}`, {picture: pictureUrl} );
    return 0;
}

export const postBookPicture = async ( book, pictureUrl ) => {
    const response = await axios.put(`/books/updateBookPic/${book}`, {picture: pictureUrl})
    return 0;
}
