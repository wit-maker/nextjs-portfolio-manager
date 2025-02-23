import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <Calendar
        className="w-full border-none shadow-none"
        tileClassName={({ date, view }) => 
          `${view === 'month' ? 'text-gray-700 dark:text-gray-200' : ''} 
           hover:bg-gray-100 dark:hover:bg-gray-700 
           rounded-lg transition-colors duration-200`
        }
        navigationLabel={({ date }) => 
          date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })
        }
        formatDay={(locale, date) => 
          date.toLocaleDateString('ja-JP', { day: 'numeric' })
        }
        formatMonth={(locale, date) => 
          date.toLocaleDateString('ja-JP', { month: 'long' })
        }
        formatYear={(locale, date) => 
          date.toLocaleDateString('ja-JP', { year: 'numeric' })
        }
        formatMonthYear={(locale, date) => 
          date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })
        }
        nextLabel="次へ"
        nextAriaLabel="次の月へ"
        prevLabel="前へ"
        prevAriaLabel="前の月へ"
        showNeighboringMonth={false}
      />
    </div>
  );
};

export default CustomCalendar;