import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Search, 
  Eye, 
  Video,
  Clock,
  X, 
  Check,
  Filter,
  UserCircle,
  PhoneCall
} from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useMediaQuery } from "@/hooks/use-mobile";

// Mock appointment data
const generateAppointments = () => {
  const now = new Date();
  const statuses = ["scheduled", "confirmed", "completed", "cancelled"];
  const types = ["initialConsultation", "therapySession", "followUp"];
  const patients = [
    { name: "James Wilson", nameAr: "جيمس ويلسون", email: "james.wilson@example.com", phone: "+1 234-567-8901" },
    { name: "Sarah Ahmed", nameAr: "سارة أحمد", email: "sarah.ahmed@example.com", phone: "+1 234-567-8902" },
    { name: "Michael Johnson", nameAr: "مايكل جونسون", email: "michael.johnson@example.com", phone: "+1 234-567-8903" },
    { name: "Emma Thompson", nameAr: "إيما طومسون", email: "emma.thompson@example.com", phone: "+1 234-567-8904" },
    { name: "Ahmed Hassan", nameAr: "أحمد حسن", email: "ahmed.hassan@example.com", phone: "+1 234-567-8905" }
  ];

  // Generate 20 random appointments
  return Array.from({ length: 20 }, (_, i) => {
    const date = addDays(now, Math.floor(Math.random() * 14) - 3); // Random date from 3 days ago to 10 days ahead
    const hour = 9 + Math.floor(Math.random() * 8); // Between 9 AM and 4 PM
    const minutes = [0, 30][Math.floor(Math.random() * 2)]; // Either :00 or :30
    const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const patient = patients[Math.floor(Math.random() * patients.length)];
    
    // Past appointments are typically completed
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    if (date < now) {
      status = Math.random() < 0.8 ? "completed" : "cancelled";
    }
    
    return {
      id: i + 1,
      patientName: patient.name,
      patientNameAr: patient.nameAr,
      patientEmail: patient.email,
      patientPhone: patient.phone,
      date: format(date, 'yyyy-MM-dd'),
      time: timeString,
      type: types[Math.floor(Math.random() * types.length)],
      status: status,
      notes: Math.random() < 0.3 ? "Special accommodations required" : "",
      zoomLink: status !== "cancelled" ? "https://zoom.us/j/123456789?pwd=abc123" : ""
    };
  });
};

const APPOINTMENTS = generateAppointments();

export default function AppointmentManagement() {
  const { t, i18n } = useTranslation();
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Filter appointments based on search query, date, and status
  const filteredAppointments = appointments.filter(appointment => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchLower) ||
      appointment.patientNameAr.includes(searchQuery) ||
      appointment.patientEmail.toLowerCase().includes(searchLower);
    
    const matchesDate = !selectedDate || appointment.date === format(selectedDate, 'yyyy-MM-dd');
    const matchesStatus = selectedStatus === "all" || appointment.status === selectedStatus;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // View appointment details
  const viewAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowDetailsDialog(true);
  };

  // Cancel appointment
  const handleCancelAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowCancelDialog(true);
  };

  // Confirm cancel appointment
  const confirmCancelAppointment = () => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.id === selectedAppointment.id
          ? { ...appt, status: "cancelled", zoomLink: "" }
          : appt
      )
    );
    setShowCancelDialog(false);
  };

  // Update appointment status
  const updateAppointmentStatus = (appointmentId: number, newStatus: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.id === appointmentId
          ? { ...appt, status: newStatus }
          : appt
      )
    );
    setShowDetailsDialog(false);
  };

  // Format the time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    
    return date.toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Group appointments by date for daily view
  const appointmentsByDate = filteredAppointments.reduce((acc: any, appointment) => {
    if (!acc[appointment.date]) {
      acc[appointment.date] = [];
    }
    acc[appointment.date].push(appointment);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.appointments')}</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('admin.searchAppointments')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rtl:pl-4 rtl:pr-9"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="inline-flex items-center rounded-md border border-input px-3">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50 rtl:mr-0 rtl:ml-2" />
            <span className="text-sm">
              {selectedDate 
                ? format(selectedDate, 'PPP', { locale: i18n.language === 'ar' ? ar : enUS })
                : t('admin.selectDate')}
            </span>
          </div>
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder={t('admin.filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.allStatuses')}</SelectItem>
              <SelectItem value="scheduled">{t('admin.statusScheduled')}</SelectItem>
              <SelectItem value="confirmed">{t('admin.statusConfirmed')}</SelectItem>
              <SelectItem value="completed">{t('admin.statusCompleted')}</SelectItem>
              <SelectItem value="cancelled">{t('admin.statusCancelled')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[300px]">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mx-auto"
              locale={i18n.language === 'ar' ? ar : enUS}
              modifiers={{
                hasAppointment: (date) => {
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  return Boolean(appointments.find(a => a.date === formattedDate));
                }
              }}
              modifiersClassNames={{
                hasAppointment: "bg-primary-100 text-primary-700 font-medium dark:bg-primary-900/30 dark:text-primary-400"
              }}
            />
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => setSelectedDate(undefined)}
            >
              {t('admin.clearDate')}
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="list" className="flex-1">{t('admin.listView')}</TabsTrigger>
              <TabsTrigger value="daily" className="flex-1">{t('admin.dailyView')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.patient')}</TableHead>
                      <TableHead>{t('admin.dateTime')}</TableHead>
                      <TableHead>{t('admin.appointmentType')}</TableHead>
                      <TableHead>{t('admin.status')}</TableHead>
                      <TableHead className="text-right rtl:text-left">{t('admin.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                          <p className="text-gray-500 dark:text-gray-400">{t('admin.noAppointmentsFound')}</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            {i18n.language === "en" ? appointment.patientName : appointment.patientNameAr}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {format(new Date(appointment.date), 'MMM dd, yyyy', { 
                                  locale: i18n.language === 'ar' ? ar : enUS 
                                })}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatTime(appointment.time)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {t(`appointments.${appointment.type}`)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                appointment.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : appointment.status === "confirmed"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : appointment.status === "scheduled"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
                              {t(`admin.status${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}`)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right rtl:text-left">
                            <div className="flex justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewAppointmentDetails(appointment)}
                              >
                                <Eye className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                                {t('admin.view')}
                              </Button>
                              {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                  onClick={() => handleCancelAppointment(appointment)}
                                >
                                  <X className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                                  {t('admin.cancel')}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="daily">
              {Object.keys(appointmentsByDate).length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg border">
                  <p className="text-gray-500 dark:text-gray-400">{t('admin.noAppointmentsFound')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(appointmentsByDate)
                    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                    .map(([date, dayAppointments]) => (
                      <div key={date} className="bg-white dark:bg-gray-800 rounded-lg border overflow-hidden">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 font-medium">
                          {format(new Date(date), 'EEEE, MMMM d, yyyy', {
                            locale: i18n.language === 'ar' ? ar : enUS
                          })}
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {Array.isArray(dayAppointments) && dayAppointments
                            .sort((a: any, b: any) => a.time.localeCompare(b.time))
                            .map((appointment: any) => (
                              <div key={appointment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-2 h-10 mr-3 rtl:mr-0 rtl:ml-3 rounded-sm bg-primary"></div>
                                    <div>
                                      <p className="font-medium">
                                        {formatTime(appointment.time)} - {i18n.language === "en" ? appointment.patientName : appointment.patientNameAr}
                                      </p>
                                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        <Badge className="mr-2 rtl:mr-0 rtl:ml-2" variant="outline">
                                          {t(`appointments.${appointment.type}`)}
                                        </Badge>
                                        <Badge
                                          className={`${
                                            appointment.status === "completed"
                                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                              : appointment.status === "confirmed"
                                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                              : appointment.status === "scheduled"
                                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                          }`}
                                        >
                                          {t(`admin.status${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}`)}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => viewAppointmentDetails(appointment)}
                                    >
                                      <Eye className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                                      {t('admin.details')}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Appointment Details Modal/Drawer */}
      {isMobile ? (
        <Drawer open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DrawerContent>
            <AppointmentDetails
              appointment={selectedAppointment}
              onUpdateStatus={updateAppointmentStatus}
              onCancel={() => handleCancelAppointment(selectedAppointment)}
              onClose={() => setShowDetailsDialog(false)}
              isMobile={true}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[550px]">
            <AppointmentDetails
              appointment={selectedAppointment}
              onUpdateStatus={updateAppointmentStatus}
              onCancel={() => handleCancelAppointment(selectedAppointment)}
              onClose={() => setShowDetailsDialog(false)}
              isMobile={false}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirmCancellation')}</DialogTitle>
            <DialogDescription>
              {t('admin.cancelAppointmentConfirmation')}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="py-4">
              <p className="font-medium">
                {i18n.language === "en" ? selectedAppointment.patientName : selectedAppointment.patientNameAr}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {format(new Date(selectedAppointment.date), 'PPP', { 
                  locale: i18n.language === 'ar' ? ar : enUS 
                })} at {formatTime(selectedAppointment.time)}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {t(`appointments.${selectedAppointment.type}`)}
              </p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t('admin.back')}</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmCancelAppointment}
            >
              {t('admin.cancelAppointment')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Appointment Details Component
function AppointmentDetails({ 
  appointment, 
  onUpdateStatus, 
  onCancel, 
  onClose, 
  isMobile 
}: {
  appointment: any;
  onUpdateStatus: (id: number, status: string) => void;
  onCancel: () => void;
  onClose: () => void;
  isMobile: boolean;
}) {
  const { t, i18n } = useTranslation();
  
  if (!appointment) return null;
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP', { 
      locale: i18n.language === 'ar' ? ar : enUS 
    });
  };
  
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    
    return date.toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const Header = isMobile ? (
    <DrawerHeader>
      <DrawerTitle>{t('admin.appointmentDetails')}</DrawerTitle>
    </DrawerHeader>
  ) : (
    <DialogHeader>
      <DialogTitle>{t('admin.appointmentDetails')}</DialogTitle>
    </DialogHeader>
  );
  
  const Footer = isMobile ? (
    <DrawerFooter className="flex flex-row justify-end gap-2">
      <DrawerClose asChild>
        <Button variant="outline">{t('admin.close')}</Button>
      </DrawerClose>
      {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
        <Button variant="destructive" onClick={onCancel}>
          {t('admin.cancelAppointment')}
        </Button>
      )}
    </DrawerFooter>
  ) : (
    <DialogFooter className="gap-2 sm:gap-0">
      <DialogClose asChild>
        <Button variant="outline">{t('admin.close')}</Button>
      </DialogClose>
      {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
        <Button variant="destructive" onClick={onCancel}>
          {t('admin.cancelAppointment')}
        </Button>
      )}
    </DialogFooter>
  );
  
  return (
    <>
      {Header}
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">
              {i18n.language === "en" ? appointment.patientName : appointment.patientNameAr}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t(`appointments.${appointment.type}`)}
            </p>
          </div>
          <Badge
            className={`${
              appointment.status === "completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : appointment.status === "confirmed"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                : appointment.status === "scheduled"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {t(`admin.status${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}`)}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
            <span>{formatTime(appointment.time)}</span>
          </div>
          {appointment.zoomLink && (
            <div className="flex items-center">
              <Video className="h-5 w-5 text-primary mr-2 rtl:mr-0 rtl:ml-2" />
              <a 
                href={appointment.zoomLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                {t('admin.joinZoomMeeting')}
              </a>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
          <h4 className="font-medium mb-3">{t('admin.patientInformation')}</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <UserCircle className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
              <span>{i18n.language === "en" ? appointment.patientName : appointment.patientNameAr}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2"><path d="M22 17.5l-4.8-4.8a1 1 0 0 0-1.4 0l-4 4a1 1 0 0 1-1.4 0L5.6 12a1 1 0 0 0-1.4 0L.8 15.5"></path><path d="M18 7.5V2.2L22.8 7H17.2c.4 0 .8.4.8.5"></path><path d="M2 7h6"></path><path d="M2 11h6"></path><path d="M2 15h6"></path></svg>
              <a href={`mailto:${appointment.patientEmail}`} className="text-primary hover:underline">
                {appointment.patientEmail}
              </a>
            </div>
            <div className="flex items-center">
              <PhoneCall className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
              <a href={`tel:${appointment.patientPhone}`} className="text-primary hover:underline">
                {appointment.patientPhone}
              </a>
            </div>
          </div>
        </div>
        
        {appointment.notes && (
          <div>
            <h4 className="font-medium mb-2">{t('admin.appointmentNotes')}</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {appointment.notes}
            </p>
          </div>
        )}
        
        {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
          <div>
            <h4 className="font-medium mb-2">{t('admin.updateStatus')}</h4>
            <div className="flex flex-wrap gap-2">
              {appointment.status === "scheduled" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-900 dark:hover:border-blue-800 dark:hover:bg-blue-900/20"
                  onClick={() => onUpdateStatus(appointment.id, "confirmed")}
                >
                  <Check className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1 text-blue-600 dark:text-blue-400" />
                  {t('admin.markAsConfirmed')}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-900 dark:hover:border-green-800 dark:hover:bg-green-900/20"
                onClick={() => onUpdateStatus(appointment.id, "completed")}
              >
                <Check className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1 text-green-600 dark:text-green-400" />
                {t('admin.markAsCompleted')}
              </Button>
            </div>
          </div>
        )}
      </div>
      {Footer}
    </>
  );
}
