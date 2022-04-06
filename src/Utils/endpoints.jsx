const HOST = import.meta.env.VITE_API_URL;
const UIHOST = import.meta.env.VITE_OWN_URL;
const endpoints = {
  HOST: HOST,
  mrSignup: HOST + "/api/auth/medical-representative/register/email",
  mrLogin: HOST + "/api/auth/medical-representative/login/email",
  mrFetchDocs: HOST + "/api/medical-representative/doctors",
  mrAddDoc: HOST + "/api/medical-representative/doctors",
  mrDocEdit: HOST + "/api/medical-representative/doctors/",
  mrGetAuth: HOST + "/api/auth/medical-representative/verify/email/",
  mrSetPass: HOST + "/api/auth/medical-representative/password",
  docLogin: HOST + "/api/auth/doctor/login/email",
  redirectPath: UIHOST + "/setpass",
};

export default endpoints;
