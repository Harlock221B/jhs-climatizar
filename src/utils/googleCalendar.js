export const generateGoogleCalendarLink = (event) => {
  if (!event) return 'https://calendar.google.com/calendar/render?action=TEMPLATE';

  // Suporta tanto formato genérico quanto o schema do JHS (cliente, servico, data, hora, endereco)
  const title = event.title || `${event.servico || 'Serviço'} - ${event.cliente || 'JHS Climatizar'}`;
  const date = event.date || event.data;
  const startTime = event.startTime || event.hora || '09:00';
  const endTime = event.endTime || event.horaFim;
  const location = event.location || event.endereco || '';
  
  const clientInfo = event.cliente ? `Cliente: ${event.cliente}\n` : '';
  const phoneInfo = event.telefone ? `WhatsApp: ${event.telefone}\n` : '';
  const serviceInfo = event.servico ? `Serviço: ${event.servico}\n` : '';
  const addressInfo = event.endereco ? `Endereço: ${event.endereco}\n` : '';
  const description = event.description || `${clientInfo}${phoneInfo}${serviceInfo}${addressInfo}Agendamento realizado via Painel JHS Climatizar.`;

  // Formata datas para YYYYMMDDTHHmmssZ
  const formatDate = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return '';
    try {
      const cleanTime = timeStr.length === 5 ? timeStr : timeStr.slice(0, 5);
      const dateObj = new Date(`${dateStr}T${cleanTime}:00`);
      if (isNaN(dateObj.getTime())) return '';
      return dateObj.toISOString().replace(/-|:|\.\d\d\d/g, '');
    } catch {
      return '';
    }
  };

  const startDateTime = formatDate(date, startTime);
  let endDateTime = '';
  if (endTime) {
    endDateTime = formatDate(date, endTime);
  } else if (startDateTime) {
    try {
      const cleanTime = startTime.length === 5 ? startTime : startTime.slice(0, 5);
      const startDate = new Date(`${date}T${cleanTime}:00`);
      startDate.setHours(startDate.getHours() + 2); // 2 horas padrão para instalação/manutenção
      endDateTime = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    } catch {
      endDateTime = '';
    }
  }

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(title);
  const dates = startDateTime && endDateTime ? `&dates=${startDateTime}/${endDateTime}` : '';
  const details = encodeURIComponent(description);
  const loc = encodeURIComponent(location);

  return `${baseUrl}&text=${text}${dates}&details=${details}&location=${loc}`;
};


