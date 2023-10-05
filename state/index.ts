import { createGlobalState } from 'react-hooks-global-state';

export type TypeUser = {
    USERID?: string
    email?: string,
    gender?: string,
    description?: string,
    fullname?: string,
    status?: string,
    profilepicture?: string,
    permission?: string
}

type TypeCategory = {
    id: number,
    text: string
}

type TypeInitState = {
    currentUser: TypeUser | null,
    token?: string,
    categories: TypeCategory[]
}

const initialState: TypeInitState = {
    currentUser: null,
    token: '',
    categories: []
}

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };