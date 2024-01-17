// CalendarSimple.js
import React, { useState, useEffect } from 'react';
import './CalendarSimple.css';

const CalendarSimple = ({ onDaySelect, selectedDays = [] }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartingDay = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startingDay = getStartingDay(year, month);
    const today = new Date().getDate();

    const calendar = [];

    // Fill the previous month's days
    const previousMonth = month - 1 < 0 ? 11 : month - 1;
    const previousMonthYear = month - 1 < 0 ? year - 1 : year;
    const previousMonthDays = getDaysInMonth(previousMonthYear, previousMonth);
    const startingDayPrevMonth = getStartingDay(previousMonthYear, previousMonth);

    for (let i = previousMonthDays - startingDayPrevMonth + 1; i <= previousMonthDays; i++) {
      calendar.push({
        day: i,
        isCurrentMonth: false,
        isCurrentDay: false,
        isSelectedDay: selectedDay && selectedDay.getDate() === i && selectedDay.getMonth() === previousMonth,
      });
    }

    // Fill the current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay = i === today && month === new Date().getMonth();
      const isSelectedDay = selectedDays.includes(i) && month === date.getMonth();

      calendar.push({
        day: i,
        isCurrentMonth: true,
        isCurrentDay: isCurrentDay,
        isSelectedDay: isSelectedDay,
      });
    }

    // Fill the next month's days
    const totalDays = calendar.length;
    const remainingDays = 42 - totalDays;

    for (let i = 1; i <= remainingDays; i++) {
      calendar.push({
        day: i,
        isCurrentMonth: false,
        isCurrentDay: false,
        isSelectedDay: selectedDay && selectedDay.getDate() === i && selectedDay.getMonth() === (month + 1) % 12,
      });
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDay(selectedDate);
    onDaySelect(selectedDate);
  };

  useEffect(() => {
    console.log('Selected Day:', selectedDay);
  }, [selectedDay]);

  return (
    <div className="calendar-simple" >
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div className="current-month">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className="days-container">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-week">
            {day}
          </div>
        ))}
        {generateCalendar().map((item, index) => (
          <div
            key={index}
            className={`day ${item.isCurrentMonth ? 'current-month' : 'other-month'} ${item.isCurrentDay ? 'current-day' : ''
              } ${item.isSelectedDay ? 'selected-day' : ''}`}
            onClick={() => handleDayClick(item.day)}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSimple;
