import atob from 'atob';
import cookie from 'cookie';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext, NextPageContext } from 'next';

type UserToken = {
    id: string,
    email: string
}

const parseJwtJavascript = (token: string) => {
    try {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

const parseJwtNode = (token: string) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const getTokenCSRAndSSR = (ctx?: NextPageContext | GetServerSidePropsContext): [string, UserToken] => {
    let token = '';
    let userToken = null;
    if (typeof(window) === "undefined") {
		//SSR
		const cookiesStr = ctx?.req?.headers?.cookie || '';
        
		token = cookie.parse(cookiesStr).token;
		userToken = parseJwtJavascript(token);
        
	} else {
		//CSR
		token = Cookies.get('token') || '';
	}

    return [token, userToken]
}

const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    return re.test(String(email).toLowerCase());
}

const hightlightText = (originStr: string, queryStr: string) => {
    const indexStart = originStr.toLowerCase().indexOf(queryStr.toLowerCase());

    if (indexStart === -1) return originStr;

    const beforeStr = originStr.substring(0, indexStart);
    const middle = originStr.substring(beforeStr.length, beforeStr.length + queryStr.length)
    const afterStr = originStr.substring(beforeStr.length + queryStr.length);

    return beforeStr + '<strong>' + middle + '</strong>' + afterStr;
}

const isEmptyObj = (obj: Object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export {
    parseJwtJavascript,
    parseJwtNode,
    getTokenCSRAndSSR,
    validateEmail,
    hightlightText,
    isEmptyObj
}