import api from './api';

export default function ApiAuthorization(){
  api.defaults.headers.common['Authorization'] = localStorage.getItem('AuthorizationToken');
}