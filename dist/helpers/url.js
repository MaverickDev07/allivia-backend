"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlDoctorPhotoServer = exports.urlPatientPhotoServer = void 0;
const urlPatientPhotoServer = () => {
    return 'http://104.154.164.119:8080/api/downloadFile/PACIENTE';
};
exports.urlPatientPhotoServer = urlPatientPhotoServer;
const urlDoctorPhotoServer = () => {
    return 'http://104.154.164.119:8080/api/downloadFile/DOCTOR';
};
exports.urlDoctorPhotoServer = urlDoctorPhotoServer;
//# sourceMappingURL=url.js.map