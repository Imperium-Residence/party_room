import { Calendar } from '@fullcalendar/core';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import './index.css';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', function () {
  let calendarEl: HTMLElement = document.getElementById('calendar')!;

  let calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin],
    now: Date.now(), // current date
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    initialDate: new Date(), // ou use uma data fixa: '2025-04-01'
    scrollTime: '00:00', // undo default 6am scrollTime
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'dayGridMonth',
    },
    titleFormat: (date) => {
      console.log(date);
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric'
      });

      const parts = date.end ? formatter.formatToParts(date.end.marker) : [];
      const month = parts.find(p => p.type === 'month')?.value;
      const year = parts.find(p => p.type === 'year')?.value;

      return `${capitalize(month!)}/${year}`;
    },
    initialView: 'dayGridMonth',
    views: {
      resourceTimelineThreeDays: {
        type: 'dayGridMonth',
        duration: { days: 1 },
        buttonText: '1 day'
      }
    },
    locale: ptBrLocale,
    // firstDay: 1, // start week on Monday
    events: [
      { id: '1', start: '2025-04-27T08:00:00', title: 'Apartamento 31', allDay: true, backgroundColor: '#ff10f3', borderColor: '#ff10f3', textColor: '#fff' },
      { id: '2', start: '2025-05-01T08:00:00', title: 'Apartamento 35', allDay: true, backgroundColor: '#0000FF', borderColor: '#0000FF', textColor: '#fff' },
      { id: '3', start: '2025-05-05T08:00:00', title: 'Apartamento 34', allDay: true, backgroundColor: '#e67e22', borderColor: '#e67e22', textColor: '#fff' },
      { id: '4', start: '2025-06-14T08:00:00', title: 'Apartamento 11', allDay: true, backgroundColor: '#B22222', borderColor: '#B22222', textColor: '#fff' },
    ],
    themeSystem: 'standard'
  });

  calendar.render();
});
