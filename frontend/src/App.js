import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:3000';

// CORS-aware fetch helper
const fetchWithCORS = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...((options.headers) || {})
    },
    credentials: 'include'
  };
  return fetch(url, { ...defaultOptions, ...options });
};

function App() {
  const [appState, setAppState] = useState('login'); // login, register, dashboard
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Clinic registration form
  const [clinicForm, setClinicForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    practitioners: 1
  });

  // Patient form
  const [patientForm, setPatientForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active'
  });

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [patientRes, aptRes, invRes, campRes] = await Promise.all([
        fetchWithCORS(`${API_BASE_URL}/api/patients`),
        fetchWithCORS(`${API_BASE_URL}/api/appointments`),
        fetchWithCORS(`${API_BASE_URL}/api/invoices`),
        fetchWithCORS(`${API_BASE_URL}/api/campaigns`)
      ]);

      setPatients((await patientRes.json()).data || []);
      setAppointments((await aptRes.json()).data || []);
      setInvoices((await invRes.json()).data || []);
      setCampaigns((await campRes.json()).data || []);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser && appState === 'dashboard') {
      fetchAllData();
    }
  }, [currentUser, appState]);

  // Handle clinic registration
  const handleClinicRegister = (e) => {
    e.preventDefault();
    if (clinicForm.name && clinicForm.email) {
      const newClinic = {
        id: Date.now().toString(),
        ...clinicForm,
        createdAt: new Date().toLocaleDateString()
      };
      
      setClinics([...clinics, newClinic]);
      alert(`✅ Clinic "${clinicForm.name}" registered successfully!`);
      
      // Auto login after registration
      setCurrentUser({
        name: clinicForm.name,
        email: clinicForm.email,
        phone: clinicForm.phone,
        clinicId: newClinic.id,
        type: 'clinic'
      });
      
      setClinicForm({ name: '', email: '', phone: '', address: '', practitioners: 1 });
      setAppState('dashboard');
    }
  };

  // Handle clinic login
  const handleClinicLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      const clinic = clinics.find(c => c.email === loginForm.email);
      
      if (clinic) {
        setCurrentUser({
          name: clinic.name,
          email: clinic.email,
          phone: clinic.phone,
          clinicId: clinic.id,
          type: 'clinic'
        });
        setAppState('dashboard');
      } else {
        alert('❌ Clinic not found. Please register first.');
      }
      
      setLoginForm({ email: '', password: '' });
    }
  };

  // Handle add patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithCORS(`${API_BASE_URL}/api/patients`, {
        method: 'POST',
        body: JSON.stringify({
          ...patientForm,
          clinicId: currentUser.clinicId
        })
      });
      const data = await response.json();
      if (data.success) {
        alert('✅ Patient added successfully!');
        setPatientForm({ firstName: '', lastName: '', email: '', phone: '', status: 'active' });
        fetchAllData();
      }
    } catch (error) {
      alert('❌ Error adding patient: ' + error.message);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setAppState('login');
    setCurrentPage('dashboard');
  };

  // ==================== LOGIN/REGISTER PAGE ====================
  if (!currentUser) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>🏥 Clinic Management</h1>
            <p>AI-Powered Platform for Canadian Clinics</p>
          </div>

          {appState === 'login' && (
            <div className="auth-form-container">
              <h2>Clinic Login</h2>
              <form onSubmit={handleClinicLogin}>
                <div className="form-group">
                  <label>Clinic Email</label>
                  <input
                    type="email"
                    placeholder="clinic@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Login
                </button>
              </form>

              <p className="auth-switch">
                Don't have an account?{' '}
                <button 
                  className="link-btn"
                  onClick={() => setAppState('register')}
                >
                  Register your clinic
                </button>
              </p>
            </div>
          )}

          {appState === 'register' && (
            <div className="auth-form-container">
              <h2>Register Your Clinic</h2>
              <form onSubmit={handleClinicRegister}>
                <div className="form-group">
                  <label>Clinic Name *</label>
                  <input
                    type="text"
                    placeholder="My Clinic"
                    value={clinicForm.name}
                    onChange={(e) => setClinicForm({ ...clinicForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="clinic@example.com"
                    value={clinicForm.email}
                    onChange={(e) => setClinicForm({ ...clinicForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    placeholder="416-555-0101"
                    value={clinicForm.phone}
                    onChange={(e) => setClinicForm({ ...clinicForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="123 Main St, Toronto, ON"
                    value={clinicForm.address}
                    onChange={(e) => setClinicForm({ ...clinicForm, address: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Number of Practitioners</label>
                  <input
                    type="number"
                    min="1"
                    value={clinicForm.practitioners}
                    onChange={(e) => setClinicForm({ ...clinicForm, practitioners: parseInt(e.target.value) })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Register Clinic
                </button>
              </form>

              <p className="auth-switch">
                Already registered?{' '}
                <button 
                  className="link-btn"
                  onClick={() => setAppState('login')}
                >
                  Login here
                </button>
              </p>
            </div>
          )}

          <div className="auth-footer">
            <p>Demo: Register a clinic or login to get started</p>
            <p style={{fontSize: '0.8rem', marginTop: '10px', color: '#999'}}>
              ✅ Built with Node.js, React, PostgreSQL, AI
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN DASHBOARD ====================
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🏥 {currentUser.name}</h2>
          <p>{currentUser.email}</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-btn ${currentPage === 'patients' ? 'active' : ''}`}
            onClick={() => setCurrentPage('patients')}
          >
            👥 Patients
          </button>
          <button
            className={`nav-btn ${currentPage === 'add-patient' ? 'active' : ''}`}
            onClick={() => setCurrentPage('add-patient')}
          >
            ➕ Add Patient
          </button>
          <button
            className={`nav-btn ${currentPage === 'appointments' ? 'active' : ''}`}
            onClick={() => setCurrentPage('appointments')}
          >
            📅 Appointments
          </button>
          <button
            className={`nav-btn ${currentPage === 'billing' ? 'active' : ''}`}
            onClick={() => setCurrentPage('billing')}
          >
            💰 Billing
          </button>
          <button
            className={`nav-btn ${currentPage === 'marketing' ? 'active' : ''}`}
            onClick={() => setCurrentPage('marketing')}
          >
            📢 Marketing
          </button>
          <button
            className={`nav-btn ${currentPage === 'clinic-settings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('clinic-settings')}
          >
            ⚙️ Clinic Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <h1>
            {currentPage === 'dashboard' && '📊 Dashboard'}
            {currentPage === 'patients' && '👥 Patients'}
            {currentPage === 'add-patient' && '➕ Add New Patient'}
            {currentPage === 'appointments' && '📅 Appointments'}
            {currentPage === 'billing' && '💰 Billing'}
            {currentPage === 'marketing' && '📢 Marketing'}
            {currentPage === 'clinic-settings' && '⚙️ Clinic Settings'}
          </h1>
        </header>

        {/* DASHBOARD */}
        {currentPage === 'dashboard' && (
          <div className="page-content">
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">👥</div>
                <div className="kpi-text">
                  <p className="kpi-label">Total Patients</p>
                  <h2 className="kpi-value">{patients.length}</h2>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">📅</div>
                <div className="kpi-text">
                  <p className="kpi-label">Appointments</p>
                  <h2 className="kpi-value">{appointments.length}</h2>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">💰</div>
                <div className="kpi-text">
                  <p className="kpi-label">Invoices</p>
                  <h2 className="kpi-value">{invoices.length}</h2>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">📢</div>
                <div className="kpi-text">
                  <p className="kpi-label">Campaigns</p>
                  <h2 className="kpi-value">{campaigns.length}</h2>
                </div>
              </div>
            </div>

            {/* Recent Patients */}
            <section className="data-section">
              <h2>Recent Patients</h2>
              {patients.length > 0 ? (
                <div className="patients-grid">
                  {patients.slice(0, 3).map((p) => (
                    <div key={p.id} className="patient-card">
                      <h3>{p.firstName} {p.lastName}</h3>
                      <p><strong>Email:</strong> {p.email}</p>
                      <p><strong>Phone:</strong> {p.phone}</p>
                      <span className={`badge ${p.status}`}>{p.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty">No patients yet. <button className="link-btn" onClick={() => setCurrentPage('add-patient')}>Add one!</button></p>
              )}
            </section>
          </div>
        )}

        {/* PATIENTS PAGE */}
        {currentPage === 'patients' && (
          <div className="page-content">
            {patients.length > 0 ? (
              <div className="patients-grid">
                {patients.map((p) => (
                  <div key={p.id} className="patient-card">
                    <div className="patient-header">
                      <h3>{p.firstName} {p.lastName}</h3>
                      <span className={`badge ${p.status}`}>{p.status}</span>
                    </div>
                    <p><strong>Email:</strong> {p.email}</p>
                    <p><strong>Phone:</strong> {p.phone}</p>
                    <div className="patient-actions">
                      <button className="btn btn-small">Edit</button>
                      <button className="btn btn-small btn-danger">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No patients found</p>
                <button className="btn btn-primary" onClick={() => setCurrentPage('add-patient')}>
                  Add First Patient
                </button>
              </div>
            )}
          </div>
        )}

        {/* ADD PATIENT PAGE */}
        {currentPage === 'add-patient' && (
          <div className="page-content form-page">
            <form onSubmit={handleAddPatient} className="form-container">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={patientForm.firstName}
                    onChange={(e) => setPatientForm({ ...patientForm, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={patientForm.lastName}
                    onChange={(e) => setPatientForm({ ...patientForm, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="john@email.com"
                    value={patientForm.email}
                    onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    placeholder="416-555-0101"
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={patientForm.status}
                  onChange={(e) => setPatientForm({ ...patientForm, status: e.target.value })}
                >
                  <option>active</option>
                  <option>inactive</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Add Patient
              </button>
            </form>
          </div>
        )}

        {/* APPOINTMENTS */}
        {currentPage === 'appointments' && (
          <div className="page-content">
            {appointments.length > 0 ? (
              <div className="appointments-grid">
                {appointments.map((a) => (
                  <div key={a.id} className="appointment-card">
                    <h3>Appointment #{a.id}</h3>
                    <p><strong>Patient:</strong> Patient {a.patientId}</p>
                    <p><strong>Date:</strong> {new Date(a.dateTime).toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {a.duration} minutes</p>
                    <span className={`badge ${a.status}`}>{a.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty">No appointments scheduled</p>
            )}
          </div>
        )}

        {/* BILLING PAGE */}
        {currentPage === 'billing' && (
          <div className="page-content">
            {invoices.length > 0 ? (
              <div className="invoices-grid">
                {invoices.map((i) => (
                  <div key={i.id} className="invoice-card">
                    <div className="invoice-header">
                      <h3>Invoice #{i.id}</h3>
                      <span className={`badge ${i.status}`}>{i.status}</span>
                    </div>
                    <p><strong>Amount:</strong> ${i.amount.toFixed(2)}</p>
                    <p><strong>Patient ID:</strong> {i.patientId}</p>
                    <p><strong>Due Date:</strong> {i.dueDate}</p>
                    <button className="btn btn-small">View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty">No invoices</p>
            )}
          </div>
        )}

        {/* MARKETING PAGE */}
        {currentPage === 'marketing' && (
          <div className="page-content">
            {campaigns.length > 0 ? (
              <div className="campaigns-grid">
                {campaigns.map((c) => (
                  <div key={c.id} className="campaign-card">
                    <h3>{c.name}</h3>
                    <p><strong>Type:</strong> {c.type}</p>
                    <p><strong>Recipients:</strong> {c.recipientCount}</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${c.completionRate}%` }}></div>
                    </div>
                    <p className="completion">{c.completionRate}% Complete</p>
                    <span className={`badge ${c.status}`}>{c.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty">No campaigns</p>
            )}
          </div>
        )}

        {/* CLINIC SETTINGS */}
        {currentPage === 'clinic-settings' && (
          <div className="page-content form-page">
            <div className="form-container">
              <h2>Clinic Information</h2>
              <div className="settings-info">
                <div className="setting-row">
                  <label>Clinic Name</label>
                  <p>{currentUser.name}</p>
                </div>
                <div className="setting-row">
                  <label>Email</label>
                  <p>{currentUser.email}</p>
                </div>
                <div className="setting-row">
                  <label>Phone</label>
                  <p>{currentUser.phone}</p>
                </div>
                <div className="setting-row">
                  <label>Clinic ID</label>
                  <p>{currentUser.clinicId}</p>
                </div>
              </div>
              
              <div style={{margin: '30px 0', borderTop: '1px solid #ddd'}}></div>
              
              <h2>Quick Stats</h2>
              <div className="settings-stats">
                <div className="stat">
                  <h3>{patients.length}</h3>
                  <p>Total Patients</p>
                </div>
                <div className="stat">
                  <h3>{appointments.length}</h3>
                  <p>Appointments</p>
                </div>
                <div className="stat">
                  <h3>${invoices.reduce((sum, i) => sum + i.amount, 0).toFixed(0)}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
