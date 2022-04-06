const HOST = import.meta.env.VITE_API_URL,
  endpoints = {
    HOST: HOST,
    mrLogin: HOST + "/api/auth/medical-representative/login/email",
    mrFetchDocs: HOST + "/api/medical-representative/doctors",
    mrAddDoc: HOST + "/api/medical-representative/doctors",
    docLogin: HOST + "/api/auth/doctor/login/email",
  };

export default endpoints;
