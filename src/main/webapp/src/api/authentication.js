import axios from "axios";
import { url, token, setToken, getToken, removeToken } from "../api";
import { apiHelper } from "./apiHelper";
import { useDispatch } from "react-redux";

export const authentication = {
    login,
    logout,
    getCurrentUserRole,
    getCurrentUser,
    getCurrentUserDetails,
    userHasRole,
    fetchMe
};

const getRequestOptions = (type) => {
    const jwtToken = getToken()
    return  {
        method: type,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
         },
    };
}

async function login(body, remember) {
    // const requestOptions = getRequestOptions('POST')
    let user;
    let loginResponse;
    await apiHelper
    .postUnauthenticatedResource(`${url}authenticate`, body).then((res) => {
        loginResponse = res
        const token = res.token
        localStorage.setItem('jwt', token);
        setToken(token)
        return res
    })
    .then(async (response) => {
        if (response.token !== null) {
            const token = response.token
            setToken(token)
            localStorage.setItem('jwt', token);
            await axios.get(`${url}users/account`, { 
                'Content-Type': 'application/json',
                headers: { Authorization: `Bearer ${token}` }
            }).then(async (res) => {
                user = res.data
                localStorage.setItem('currentUser_Permission', JSON.stringify(res.data.permissions));
                localStorage.setItem('currentUser_details', JSON.stringify(res.data));
                loginResponse.user = res.data
            }).catch((error) => {
                console.error(error);
            })
        }

        return loginResponse;
    }).catch((error) => {
        console.error(error);
    });
    
    // return user?.isVerified || user?.mfaenabled;
    return loginResponse;
}

function logout(history) {

            localStorage.clear();
            // removeToken()
            window.location.href = "/";
}

function getCurrentUserRole() {

    const currentUserPermissions = localStorage.getItem('currentUser_Permission') != null ? JSON.parse(localStorage.getItem('currentUser_Permission')) : null;
    if(!currentUserPermissions){
        return [];
    }
    // fetch all the permissions of the logged in user
    const permissions = currentUserPermissions;
    if(!permissions || permissions.length < 1){
        return [];
    }
    return permissions;
}

function userHasRole(role){
    const userRoles = getCurrentUserRole();
    if(role && role.length > 0 && userRoles.find(one => one === role) !== null){
        return false;
    }
    return true;
}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
}

async function fetchMe(){
    // const requestOptions = getRequestOptions("GET")
    const user = 
    await apiHelper
        .getResource(`${url}users/account`, {})
        .then((response) => {
            // console.log(response);
            localStorage.setItem('currentUser_Permission', JSON.stringify(response.permissions));
            localStorage.setItem('currentUser_details', JSON.stringify(response));
            return response;
        })
        .catch((error) => {
            // console.log("was error");
            return null;
        });
        return user;
}
async function getCurrentUserDetails(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser_details"))

    if (currentUser !== null && currentUser !== undefined) {
        return currentUser
    } else {
    const user = await fetchMe()
        return user
    }

}