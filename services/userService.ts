import api from './api';

import { URL_GET_USER_BY_ID, URL_POST_CHANGE_PASSWORD, URL_POST_UPDATE_USER, URL_REGISTER } from '../constants';
import { isEmptyObj } from '../helpers';

type RegisterData = {
    fullname: string,
    email: string,
    password: string,
    repassword: string
}

type TypePasswordData = {
    oldPassword: string,
	newPassword: string,
	reNewPassword: string
}

type ProfileData = {
    fullname: string,
    gender: string,
    description: string,
    avatar: File | {}
}

const userService = {
    getUserByID: async (userID:string) => {
        if (!userID) {
            return null;
        }
        return await api.callJson(`${URL_GET_USER_BY_ID}${userID}`)
    },
    register: async (data: RegisterData) => {
        return await api.callJson(URL_REGISTER, {
            method: "POST",
            data
        })
    },
    changePassword: async (data: TypePasswordData, token: string) => {
        return api.callJson(URL_POST_CHANGE_PASSWORD, { 
            method: "POST",
            data,
            token
        })
    },
    updateProfile: async (profileData: ProfileData, token: string ) => {
        const data: FormData = new FormData();
        data.append('fullname', profileData.fullname);
        data.append('description', profileData.description);
        data.append('gender', profileData.gender);
        if (!isEmptyObj(profileData.avatar)) {
            data.append('avatar', profileData.avatar as File);
        }

        return api.callFormData(URL_POST_UPDATE_USER, { data, token });
    }
}

export default userService;