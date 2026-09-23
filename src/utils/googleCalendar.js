export const generateGoogleCalendarLink = (event) => {
  const { title, date, startTime, endTime, location, description } = event;

  // Format dates to YYYYMMDDTHHmmssZ
  const formatDate = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return '';
    const dateObj = new Date(`${dateStr}T${timeStr}`);
    // Convert to UTC
    return dateObj.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const startDateTime = formatDate(date, startTime);
  // Default to 2 hours later if end time is not provided
  let endDateTime = '';
  if (endTime) {
     endDateTime = formatDate(date, endTime);
  } else if (startDateTime) {
      const startDate = new Date(`${date}T${startTime}`);
      startDate.setHours(startDate.getHours() + 2);
      endDateTime = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  }

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(title || 'Agendamento JHS Climatizar');
  const dates = startDateTime && endDateTime ? `&dates=${startDateTime}/${endDateTime}` : '';
  const details = encodeURIComponent(description || '');
  const loc = encodeURIComponent(location || '');

  return `${baseUrl}&text=${text}${dates}&details=${details}&location=${loc}`;
};

