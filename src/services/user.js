import axios from 'axios';
import bcrypt from 'bcryptjs';
import { BASE_API } from 'constant/network';

const updateUser = async (editingUser, editedName, editedEmail, editedPassword, editedStreet, editedCity, editedCountry, editedPostalCode, editedAbout, setIsModalOpen, setEditingUser, refreshUserData) => {
    const isConfirmed = window.confirm("Are you sure you want to save these changes?");
    if (isConfirmed) {
        try {
            let encodedPassword = editingUser.password;

            if (editedPassword !== editingUser.password) {
                encodedPassword = await encodePassword(editedPassword);
            }

            const updatedUser = {
                id: editingUser.id,
                name: editedName,
                email: editedEmail,
                avatarUrl: editingUser.avatarUrl,
                role: editingUser.role,
                status: editingUser.status,
                password: encodedPassword,
                address: {
                    street: editedStreet,
                    city: editedCity,
                    country: editedCountry,
                    postal_code: editedPostalCode
                },
                about: editedAbout,
                token: editingUser.token,
            };

            await axios.put(`http://localhost:3001/users/${editingUser.id}`, updatedUser);

            setIsModalOpen(false);
            setEditingUser(null);
            window.alert("User updated successfully!");
            await refreshUserData();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }


};

const encodePassword = async (password) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error encoding password:', error);
        throw error;
    }
};

export {
    updateUser,
    encodePassword
}