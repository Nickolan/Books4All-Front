
const emailRegex =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const validation = (updatedUser) => {

    let errors = {};
  
    if (updatedUser.alterName?.length > 20) {
      errors.alterNme = "Name cannot exceed 20 characters";
    }
  
    if (!emailRegex.test(updatedUser.email)) {
      errors.email = "Invalid email";
    }
  
    if (updatedUser.about?.length > 110) {
      errors.about = "about cannot exceed 110 chracters";
    }

    return errors;

}