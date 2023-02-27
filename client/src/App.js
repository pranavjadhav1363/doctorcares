import { ColorModeContxext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Topbar } from "./components/Hospital/global/Topbar";
import { Sidebar } from "./components/Hospital/global/Sidebar";
import { Dashboard } from "./components/Hospital/Dashboard";
import { Route, Routes } from "react-router-dom";
import { TodaysAppointment } from "./components/Hospital/Scenes/Appointments/TodaysAppointment";
import { UpcomingAppointments } from "./components/Hospital/Scenes/Appointments/UpcomingAppointments";
import { PastAppointments } from "./components/Hospital/Scenes/Appointments/PastAppointments";
import BankDetails from "./components/Hospital/Scenes/Details/BankDetails";
import Recharge from "./components/Hospital/Scenes/Details/Recharge";
import { Doctors } from "./components/Hospital/Scenes/Details/Doctors";
import HospitalInfo from "./components/Hospital/Scenes/Details/HospitalInfo/HospitalInfo";
import AppointmentDetails from "./components/Hospital/Scenes/Pages/AppointmentDetails/AppointmentDetails";
import DoctorDetail from "./components/Hospital/Scenes/Pages/Doctors/DoctorInfo";
import DoctorInfo from "./components/Hospital/Scenes/Pages/Doctors/DoctorInfo";
import Random from "./Random";
import ScheduleAppointments from "./components/Hospital/Scenes/Pages/ScheduleAppointments";
import AddDoctor from "./components/Hospital/Scenes/Pages/AddDoctor";
import Register from "./components/Hospital/Register";
import Login from "./components/Hospital/Login";
// import { Login } from "@mui/icons-material";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContxext.Provider value={colorMode} >
        <ThemeProvider theme={theme}>
          <CssBaseline>
            {/* <div className="app">
              <Sidebar />
              <main className="content">
                <Topbar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="hospital" element={<Dashboard />}>
                <Route path="alldoctors" element={<Doctors />} />
                <Route path="hospitalinfo" element={<HospitalInfo />} />
                <Route path="todaysappointment" element={<TodaysAppointment />} />
                <Route path="upcomingappointments" element={<UpcomingAppointments />} />
                <Route path="pastappointments" element={<PastAppointments />} />
                <Route path="bankdetails" element={<BankDetails />} />
                <Route path="recharge" element={<Recharge />} />
                <Route path="appointmentdetails" element={<AppointmentDetails />} />
                <Route path="scheduleappointments" element={<ScheduleAppointments />} />
                <Route path="doctor" element={<DoctorInfo />} />
                <Route path="adddoctor" element={<AddDoctor />} />


              </Route>
              {/* <Route path="/" element={<Dashboard />} /> */}

            </Routes>
            {/* </main>
            </div> */}
          </CssBaseline>
        </ThemeProvider>
      </ColorModeContxext.Provider >
      <Routes>
        <Route path="/random" element={<Random />} />

      </Routes>
    </>
  );
}

export default App;
