import { createContext } from 'react';

export const UserContext = createContext({username:'', name: '', email: '', role:'', csrftoken:''});