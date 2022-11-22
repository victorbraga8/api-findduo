"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converteMinuto = exports.converteHora = void 0;
function converteHora(hora) {
    const [horas, minutos] = hora.split(":").map(Number);
    const minutosMontante = (horas * 60) + minutos;
    return minutosMontante;
}
exports.converteHora = converteHora;
function converteMinuto(minutos) {
    const hora = Math.floor(minutos / 60);
    const minuto = minutos % 60;
    return `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;
}
exports.converteMinuto = converteMinuto;
//# sourceMappingURL=utils.js.map