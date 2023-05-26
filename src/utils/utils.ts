export function converteHora(hora: string) {
  const [horas, minutos] = hora.split(":").map(Number);
  const minutosMontante = horas * 60 + minutos;
  return minutosMontante;
}

export function converteMinuto(minutos: number) {
  const hora = Math.floor(minutos / 60);
  const minuto = minutos % 60;
  return `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;
}

export function formatWeekDays(array: string) {
  if (array.length === 0) return "";

  let resultado = "";

  for (let i = 0; i < array.length; i++) {
    resultado += array[i] + ",";
  }

  resultado = resultado.slice(0, -1);
  return resultado;
}
