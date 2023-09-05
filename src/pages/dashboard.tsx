import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Edge, AppointmentDto, PageInfo } from '@/utils/types';
import { getAppointmentsBefore, getAppointmentsAfter, getAvailability } from '../api/appointments'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

// Add your import statements for availability and appointment data fetching

const Dashboard: React.FC = () => {
  const router = useRouter();

  const [pageInfo, setPageInfo] = useState<PageInfo>({hasNextPage: false, hasPreviousPage: false, previousCursor: "", nextCursor: ""});

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Edge<AppointmentDto>[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(moment(new Date()).add(1, 'days').toDate());

  useEffect(() => {
    // Check if the token exists in local storage or state management
    const token = localStorage.getItem('token'); // Example: stored in local storage as 'token'

    if (!token) {
      // If token doesn't exist, redirect to login page
      router.push('/login');
    } else {
      const fetchAppointments = async () => {
        try {
          const result = await getAppointmentsAfter(6, "");
          //result.pageInfo
          setPageInfo(result.pageInfo);
          setAppointments(result.edges);
        } catch (error) {
          console.log('Error fetching appointments:', error);
        }
      };

      fetchAppointments();
    }
  }, []);

  useEffect(() => {
    // Check if the token exists in local storage or state management
    const token = localStorage.getItem('token'); // Example: stored in local storage as 'token'

    if (!token) {
      // If token doesn't exist, redirect to login page
      router.push('/login');
    } else {
      const fetchAvailability = async () => {
        try {
          const times = await getAvailability(moment(selectedDate).format('yyyy-MM-DD'));
          setAvailableTimes(times);
        } catch (error) {
          console.log('Error fetching availability:', error);
        }
      };
      fetchAvailability();
    }
  }, [selectedDate]);


  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // select time
  };

  const goToAfterPage = async () => {
    // //setCurrentPage(page);
    if (pageInfo.hasNextPage) {
        const result = await getAppointmentsAfter(6, pageInfo.nextCursor);
        setPageInfo(result.pageInfo);
        setAppointments(result.edges);
    }
  };

  const goToPrevPage = async () => {
    //setCurrentPage(page);
    if (pageInfo.hasPreviousPage) {
        const result = await getAppointmentsBefore(6, pageInfo.previousCursor);
        setPageInfo(result.pageInfo);
        setAppointments(result.edges);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <h2>Your Availabilities</h2>
      <div className="flex">
        <div>
          <label htmlFor="dateSelect">Select Date:</label>
          <DatePicker 
            className="appointment-datepicker"
            selected={selectedDate} 
            minDate={moment(new Date()).add(1, 'days').toDate()}
            onChange={(date) => setSelectedDate(date)} />
        </div>
        <div className="ml-5">
          <label htmlFor="timeSelect">Select Time:</label>
          <select id="timeSelect" onChange={handleTimeChange}>
              {availableTimes.map((time, idx) => (
                <option key={idx} value={time}>
                  {moment(time).format('hh:mm a')}
                </option>
              ))}
          </select>
        </div>
      </div>
      
      <h2 className='mt-5'>Your Appointments</h2>
      <ul className="appointments-list">
      {appointments.map((appointment) => (
        <li className="border-[1px] border-stone-400 pb-4" key={appointment.node.scheduledTime}>
            <div className="list-header py-4 border-b-[1px] border-stone-400 px-4">
                <span className="text-xl"><FontAwesomeIcon icon={faCalendarCheck} /></span>
                <span className="ml-2">{moment(appointment.node.scheduledTime).format('MMMM D, YYYY')}</span>
            </div>
            <div className="px-4 pt-4">
              <p>
                {appointment.node.status == "COMPLETE" ? (
                  <span className="item-status">Started / Completed</span>
                ) : (
                  <span className="item-status">{appointment.node.status}</span>
                )}
              </p>
              <p className="pt-1">{moment(appointment.node.scheduledTime).format('h:mma')} - {moment(appointment.node.scheduledTime).add(moment.duration(appointment.node.duration, 'minutes')).format('h:mma')}</p>
            </div>
            <div className="px-4 pt-4">
              <p>Duration: {appointment.node.duration} minutes</p>
              <p>Service: {appointment.node.workOrder.service}</p>
            </div>
        </li>
      ))}
      </ul>

      <div className="mt-4 flex justify-between">
        <button  className="w-24" onClick={() => goToPrevPage()} disabled={!pageInfo.hasPreviousPage}>
          Prev
        </button>

        <button className="w-24" onClick={() => goToAfterPage()} disabled={!pageInfo.hasNextPage}>
          Next
        </button>
      </div>

    </div>
  );
};

export default Dashboard;