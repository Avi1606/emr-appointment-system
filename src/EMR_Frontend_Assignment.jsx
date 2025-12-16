import React, { useState, useEffect } from 'react';

// Mock data - same as backend, simulating API call
const mockAppointments = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "2025-12-16",
    time: "09:00",
    duration: 30,
    doctorName: "Dr. Rajesh Kumar",
    status: "Confirmed",
    mode: "In-Person",
    reason: "Diabetes Management",
    phone: "+91 98765 43210",
    email: "sarah.j@email.com",
    notes: "Patient needs prescription refill"
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "2025-12-16",
    time: "10:00",
    duration: 45,
    doctorName: "Dr. Priya Sharma",
    status: "Scheduled",
    mode: "In-Person",
    reason: "Annual Physical Examination",
    phone: "+91 98765 43211",
    email: "m.chen@email.com",
    notes: ""
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    date: "2025-12-16",
    time: "11:30",
    duration: 30,
    doctorName: "Dr. Rajesh Kumar",
    status: "Confirmed",
    mode: "Video Call",
    reason: "Cold and Flu Symptoms",
    phone: "+91 98765 43212",
    email: "emily.r@email.com",
    notes: "Video consultation requested"
  },
  {
    id: 4,
    name: "Rahul Sharma",
    date: "2025-12-17",
    time: "09:00",
    duration: 30,
    doctorName: "Dr. Priya Sharma",
    status: "Upcoming",
    mode: "In-Person",
    reason: "General Checkup",
    phone: "+91 98765 43213",
    email: "rahul.s@email.com",
    notes: ""
  },
  {
    id: 5,
    name: "Anita Desai",
    date: "2025-12-17",
    time: "14:00",
    duration: 45,
    doctorName: "Dr. Amit Patel",
    status: "Upcoming",
    mode: "Video Call",
    reason: "Follow-up Consultation",
    phone: "+91 98765 43214",
    email: "anita.d@email.com",
    notes: ""
  },
  {
    id: 6,
    name: "Vikram Singh",
    date: "2025-12-15",
    time: "10:00",
    duration: 30,
    doctorName: "Dr. Rajesh Kumar",
    status: "Confirmed",
    mode: "In-Person",
    reason: "Blood Pressure Check",
    phone: "+91 98765 43215",
    email: "vikram.s@email.com",
    notes: "Regular checkup"
  },
  {
    id: 7,
    name: "Priya Nair",
    date: "2025-12-15",
    time: "15:30",
    duration: 45,
    doctorName: "Dr. Amit Patel",
    status: "Cancelled",
    mode: "In-Person",
    reason: "Skin Consultation",
    phone: "+91 98765 43216",
    email: "priya.n@email.com",
    notes: "Patient cancelled"
  },
  {
    id: 8,
    name: "Deepak Malhotra",
    date: "2025-12-18",
    time: "09:30",
    duration: 30,
    doctorName: "Dr. Priya Sharma",
    status: "Scheduled",
    mode: "In-Person",
    reason: "Vaccination",
    phone: "+91 98765 43217",
    email: "deepak.m@email.com",
    notes: ""
  },
  {
    id: 9,
    name: "Sunita Verma",
    date: "2025-12-18",
    time: "11:00",
    duration: 60,
    doctorName: "Dr. Rajesh Kumar",
    status: "Upcoming",
    mode: "In-Person",
    reason: "Complete Health Checkup",
    phone: "+91 98765 43218",
    email: "sunita.v@email.com",
    notes: ""
  },
  {
    id: 10,
    name: "Kiran Joshi",
    date: "2025-12-16",
    time: "16:00",
    duration: 30,
    doctorName: "Dr. Amit Patel",
    status: "Confirmed",
    mode: "Phone Call",
    reason: "Test Results Discussion",
    phone: "+91 98765 43219",
    email: "kiran.j@email.com",
    notes: ""
  }
];

// simulating the backend functions
const getAppointments = (date = null, status = null) => {
  let result = [...mockAppointments];
  if (date) {
    result = result.filter(apt => apt.date === date);
  }
  if (status) {
    result = result.filter(apt => apt.status === status);
  }
  return result;
};

const updateAppointmentStatus = (id, newStatus) => {
  const apt = mockAppointments.find(a => a.id === id);
  if (apt) {
    apt.status = newStatus;
    return apt;
  }
  return null;
};

// Sidebar component
const Sidebar = () => {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 h-screen fixed left-0 top-0">
      <div className="space-y-4">
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        <button className="p-3 bg-blue-50 rounded-lg">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      
      <div className="mt-auto space-y-4">
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Stats Card component
const StatsCard = ({ icon, count, label, badgeText, badgeColor }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${icon.bg}`}>
          {icon.svg}
        </div>
        {badgeText && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800">{count}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

// Calendar component
const Calendar = ({ selectedDate, onDateSelect, currentMonth, onMonthChange }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days = [];
  // previous month days
  const prevMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  // current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  // next month days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }
  
  const formatDateString = (day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <div className="text-lg font-semibold mb-4 text-gray-800">Calendar</div>
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => onMonthChange(-1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-medium text-gray-700">{monthNames[month]} {year}</span>
        <button 
          onClick={() => onMonthChange(1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="py-2 text-gray-500 font-medium">{d}</div>
        ))}
        {days.map((d, i) => {
          const dateStr = d.isCurrentMonth ? formatDateString(d.day) : '';
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === today;
          
          return (
            <button
              key={i}
              onClick={() => d.isCurrentMonth && onDateSelect(dateStr)}
              className={`py-2 rounded-lg text-sm
                ${!d.isCurrentMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}
                ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                ${isToday && !isSelected ? 'bg-blue-100 text-blue-600' : ''}
              `}
            >
              {d.day}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-gray-600">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-gray-600">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

// Appointment Card
const AppointmentCard = ({ appointment, onStatusUpdate }) => {
  const statusColors = {
    'Confirmed': 'bg-green-100 text-green-700',
    'Scheduled': 'bg-blue-100 text-blue-700',
    'Upcoming': 'bg-orange-100 text-orange-700',
    'Cancelled': 'bg-red-100 text-red-700'
  };
  
  const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
  const avatarColor = avatarColors[appointment.id % avatarColors.length];
  
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold`}>
            {appointment.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{appointment.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>📅 {appointment.date}</span>
              <span>⏰ {appointment.time}</span>
              <span>• {appointment.duration} min</span>
            </div>
            <div className="text-sm text-gray-500">
              👨‍⚕️ {appointment.doctorName} • 📍 {appointment.mode}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[appointment.status]}`}>
          {appointment.status}
        </span>
      </div>
      
      <div className="mt-3 pl-13">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-600">🏥 {appointment.mode === 'Video Call' ? 'Telemedicine' : appointment.mode === 'Phone Call' ? 'Phone Consultation' : 'Follow-up'}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Reason:</span> {appointment.reason}
        </div>
        {appointment.notes && (
          <div className="text-sm text-gray-500 mt-1">
            <span className="font-medium">Note:</span> {appointment.notes}
          </div>
        )}
      </div>
      
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>📞 {appointment.phone}</span>
          <span>✉️ {appointment.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onStatusUpdate(appointment.id, 'Confirmed')}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
            title="Confirm"
          >
            ✓
          </button>
          <button 
            onClick={() => onStatusUpdate(appointment.id, 'Cancelled')}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Cancel"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AppointmentManagementView = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [doctorFilter, setDoctorFilter] = useState('All Doctors');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // load appointments on mount
  useEffect(() => {
    const data = getAppointments();
    setAppointments(data);
    setFilteredAppointments(data);
  }, []);
  
  // filter when date/tab/search changes
  useEffect(() => {
    let result = [...appointments];
    const today = new Date().toISOString().split('T')[0];
    
    // tab filter
    if (activeTab === 'Today') {
      result = result.filter(apt => apt.date === today);
    } else if (activeTab === 'Upcoming') {
      result = result.filter(apt => apt.date > today);
    } else if (activeTab === 'Past') {
      result = result.filter(apt => apt.date < today);
    }
    
    // date filter from calendar
    if (selectedDate) {
      result = result.filter(apt => apt.date === selectedDate);
    }
    
    // search filter
    if (searchTerm) {
      result = result.filter(apt => 
        apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // status dropdown filter
    if (statusFilter !== 'All Status') {
      result = result.filter(apt => apt.status === statusFilter);
    }
    
    // doctor dropdown filter
    if (doctorFilter !== 'All Doctors') {
      result = result.filter(apt => apt.doctorName === doctorFilter);
    }
    
    setFilteredAppointments(result);
  }, [appointments, selectedDate, activeTab, searchTerm, statusFilter, doctorFilter]);
  
  const handleDateSelect = (date) => {
    if (selectedDate === date) {
      setSelectedDate(''); // toggle off
    } else {
      setSelectedDate(date);
    }
  };
  
  const handleMonthChange = (delta) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };
  
  const handleStatusUpdate = (id, newStatus) => {
    // call backend function
    updateAppointmentStatus(id, newStatus);
    // refresh local state
    setAppointments(getAppointments());
  };
  
  // calculate stats
  const today = new Date().toISOString().split('T')[0];
  const todayCount = appointments.filter(a => a.date === today).length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const upcomingCount = appointments.filter(a => a.date > today).length;
  const virtualCount = appointments.filter(a => a.mode === 'Video Call').length;
  
  // get unique doctors for filter dropdown
  const doctors = [...new Set(appointments.map(a => a.doctorName))];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-16 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Appointment Management</h1>
            <p className="text-gray-500">Schedule and manage patient appointments</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <span>📤</span> Export
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600">
              <span>+</span> New Appointment
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard 
            icon={{
              bg: 'bg-blue-100',
              svg: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }}
            count={todayCount}
            label="Today's Appointments"
            badgeText="Today"
            badgeColor="bg-blue-100 text-blue-600"
          />
          <StatsCard 
            icon={{
              bg: 'bg-green-100',
              svg: <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }}
            count={confirmedCount}
            label="Confirmed Appointments"
            badgeText="Confirmed"
            badgeColor="bg-green-100 text-green-600"
          />
          <StatsCard 
            icon={{
              bg: 'bg-blue-100',
              svg: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }}
            count={upcomingCount}
            label="Upcoming Appointments"
            badgeText="Upcoming"
            badgeColor="bg-orange-100 text-orange-600"
          />
          <StatsCard 
            icon={{
              bg: 'bg-pink-100',
              svg: <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }}
            count={virtualCount}
            label="Telemedicine Sessions"
            badgeText="Virtual"
            badgeColor="bg-pink-100 text-pink-600"
          />
        </div>
        
        {/* Main Content */}
        <div className="flex gap-6">
          {/* Left - Calendar */}
          <div className="w-72">
            <Calendar 
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
            />
          </div>
          
          {/* Right - Appointments List */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex items-center gap-6 mb-4 border-b">
              {['Upcoming', 'Today', 'Past', 'All'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === tab 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Scheduled</option>
                <option>Upcoming</option>
                <option>Cancelled</option>
              </select>
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Doctors</option>
                {doctors.map(doc => (
                  <option key={doc}>{doc}</option>
                ))}
              </select>
            </div>
            
            {/* Appointments */}
            <div className="space-y-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(apt => (
                  <AppointmentCard 
                    key={apt.id} 
                    appointment={apt} 
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No appointments found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagementView;
