import { useEffect } from "react";
import { parseJwtJavascript } from ".";
import { useRouter } from "next/router";
import { useGlobalState } from "../state";

//Bat buoc dang nhap
//page: Create Post, User Detail...
const useAuthen = () => {
    const router = useRouter();
    const [token, ] = useGlobalState('token');

    useEffect(() => {
        if (token) {
            const userToken = parseJwtJavascript(token);
            if (!(userToken && userToken.id && userToken.email)) {
                router.push('/login');
            }
        } else {
            router.push('/login');
        }
    }, [token])
}

//Chua dang nhap mới cho vào
//Dang nhap roi redirect qua homepage
const useNotAuthen = () => {
    const router = useRouter();
    const [token] = useGlobalState('token');

    useEffect(() => {
        if (token) {
            const userToken = parseJwtJavascript(token);
            if (userToken && userToken.id && userToken.email) {
                router.push('/');
            }
        }
    }, [token])
}

export {
    useAuthen,
    useNotAuthen
}