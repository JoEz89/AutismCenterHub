import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import AppointmentList from '@/components/appointments/AppointmentList';
import ConfirmationModal from '@/components/appointments/ConfirmationModal';
import { Helmet } from 'react-helmet';

// Mock appointment data
const mockAppointments = [
  { 
    id: 1, 
    patient: "Alex Morgan", 
    patientAr: "أليكس مورغان", 
    date: "2023-08-10", 
    time: "10:00 AM", 
    type: "Initial Consultation", 
    typeAr: "استشارة أولية", 
    status: "Confirmed", 
    statusAr: "مؤكد",
    zoomLink: "https://zoom.us/j/123456789"
  },
  { 
    id: 2, 
    patient: "Jamie Smith", 
    patientAr: "جيمي سميث", 
    date: "2023-08-12", 
    time: "2:30 PM", 
    type: "Therapy Session", 
    typeAr: "جلسة علاجية", 
    status: "Confirmed", 
    statusAr: "مؤكد",
    zoomLink: "https://zoom.us/j/987654321"
  }
];

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

interface AppointmentData {
  date: Date;
  timeSlot: TimeSlot;
  type: string;
}

const Appointments: React.FC = () => {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleBookAppointment = (date: Date, timeSlot: TimeSlot, type: string) => {
    setAppointmentData({ date, timeSlot, type });
    setShowConfirmation(true);
    setIsConfirmed(false);
  };

  const handleCloseConfirmation = () => {
    if (isConfirmed) {
      // In a real app, we would save the appointment to the database
      setIsConfirmed(false);
    }
    setShowConfirmation(false);
  };

  const handleReschedule = (id: number) => {
    // In a real app, we would handle rescheduling
    console.log('Reschedule appointment', id);
  };

  const handleCancel = (id: number) => {
    // In a real app, we would handle cancellation
    console.log('Cancel appointment', id);
    
    // For the demo, remove the appointment from the list
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>{t('siteName')} - {t('appointments')}</title>
        <meta name="description" content="Schedule an appointment with our specialists for consultations, therapy sessions, or follow-up meetings." />
        <meta property="og:title" content="Schedule an Appointment - Autism Center" />
        <meta property="og:description" content="Book online appointments with autism specialists for consultations and therapy sessions." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 fade-in">
        <h1 className="text-3xl font-bold mb-8">{t('scheduleAppointment')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Booking Form */}
          <div className="lg:col-span-2">
            <AppointmentForm onBookAppointment={handleBookAppointment} />
          </div>
          
          {/* Upcoming Appointments */}
          <div>
            <AppointmentList 
              appointments={appointments}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
          </div>
        </div>
        
        {/* Confirmation Modal */}
        <ConfirmationModal 
          isOpen={showConfirmation}
          onClose={handleCloseConfirmation}
          appointment={appointmentData}
          isConfirmed={isConfirmed}
        />
      </div>
    </>
  );
};

export default Appointments;
