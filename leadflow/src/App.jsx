import { useMemo, useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
      const [leads, setLeads] = useState([
  {
    id: 1,
    name: "Riya Sharma",
    company: "NextNova Solutions",
    status: "Interested",
    source: "Website",
    nextFollowUp: "Today, 6:00 PM",
  },
  {
    id: 2,
    name: "Karan Patel",
    company: "BluePeak Media",
    status: "Contacted",
    source: "Referral",
    nextFollowUp: "24 Jun, 3:30 PM",
  },
  {
    id: 3,
    name: "Sneha Verma",
    company: "GrowthSpark Labs",
    status: "Follow-up Due",
    source: "LinkedIn",
    nextFollowUp: "Overdue",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    company: "CloudBridge Tech",
    status: "New",
    source: "Website",
    nextFollowUp: "25 Jun, 11:00 AM",
  },
]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    status: "New",
    source: "Website",
    nextFollowUp: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.company.trim()) {
      alert("Please fill in lead name and company.");
      return;
    }

    const newLead = {
      id: Date.now(),
      name: formData.name,
      company: formData.company,
      status: formData.status,
      source: formData.source,
      nextFollowUp: formData.nextFollowUp || "Not scheduled",
    };

    setLeads((prev) => [newLead, ...prev]);

    setFormData({
      name: "",
      company: "",
      status: "New",
      source: "Website",
      nextFollowUp: "",
    });

    setShowModal(false);
  };

  const totalLeads = leads.length;
  const followUpsDue = leads.filter(
    (lead) =>
      lead.status === "Follow-up Due" || lead.nextFollowUp === "Overdue"
  ).length;
  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;
  const responseRate = totalLeads
    ? Math.round((convertedLeads / totalLeads) * 100)
    : 0;

  const recentLeads = useMemo(() => leads.slice(0, 4), [leads]);

  return (
    <div className="app-shell">
      <div className="dashboard">
        {/* Top Bar */}
        <header className="topbar">
          <div className="brand">
            <h1>LeadFlow</h1>
            <p>Lead follow-up automation dashboard</p>
          </div>
        </header>

        {/* Nav */}
        <div className="nav-tabs">
          <button>Dashboard</button>
          <button>Leads</button>
          <button>Follow-ups</button>
          <button>Pipeline</button>
          <button>Analytics</button>
          <button>Settings</button>
        </div>

        {/* AI Banner */}
        <section className="ai-banner">
          <h2>AI Follow-up Assistant</h2>
          <p>
            Generate follow-up messages, reminders, and next-step suggestions
            for every lead.
          </p>
          <button className="secondary-btn">Try AI Assistant</button>
        </section>

        {/* Header */}
        <section className="page-header">
          <p>Lead Management Dashboard</p>
          <h2>Welcome back, Premraj 👋</h2>
        </section>

        {/* Toolbar */}
        <div className="toolbar">
          <input
            className="search-box"
            type="text"
            placeholder="Search leads..."
          />
          <button className="secondary-btn">Export</button>
          <button className="primary-btn" onClick={() => setShowModal(true)}>
            + Add Lead
          </button>
        </div>

        {/* Hero + Stats */}
        <section className="hero-card">
          <div className="hero-left">
            <span className="hero-badge">Smart Follow-up Automation</span>
            <h3>
              Turn missed leads into conversions with automated reminders.
            </h3>
            <p>
              Track every lead, schedule follow-ups, monitor conversions, and
              use AI-powered suggestions to keep your pipeline active.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => setShowModal(true)}>
                Create Follow-up
              </button>
              <button className="secondary-btn">View Pipeline</button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Leads</h4>
              <div className="stat-value">{totalLeads}</div>
              <p>Live lead count</p>
            </div>

            <div className="stat-card">
              <h4>Follow-ups Due</h4>
              <div className="stat-value">{followUpsDue}</div>
              <p>Need attention</p>
            </div>

            <div className="stat-card">
              <h4>Converted Leads</h4>
              <div className="stat-value">{convertedLeads}</div>
              <p>Successful deals</p>
            </div>

            <div className="stat-card">
              <h4>Response Rate</h4>
              <div className="stat-value">{responseRate}%</div>
              <p>Based on conversions</p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="content-grid">
          <div className="panel">
            <h3>Recent Leads</h3>
            <div className="lead-list">
              {recentLeads.map((lead) => (
                <div className="lead-item" key={lead.id}>
                  <h4>{lead.name}</h4>
                  <p>{lead.company}</p>
                  <p>
                    <strong>Status:</strong> {lead.status}
                  </p>
                  <p>
                    <strong>Next follow-up:</strong> {lead.nextFollowUp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3>Pipeline Snapshot</h3>
            <div className="pipeline-list">
              <div className="pipeline-step">
                <strong>New Leads</strong>
                <span>
                  {leads.filter((lead) => lead.status === "New").length} leads
                </span>
              </div>
              <div className="pipeline-step">
                <strong>Interested</strong>
                <span>
                  {leads.filter((lead) => lead.status === "Interested").length}{" "}
                  leads
                </span>
              </div>
              <div className="pipeline-step">
                <strong>Follow-up Due</strong>
                <span>{followUpsDue} leads</span>
              </div>
              <div className="pipeline-step">
                <strong>Converted</strong>
                <span>{convertedLeads} leads</span>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Add New Lead</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              <form className="lead-form" onSubmit={handleAddLead}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Lead Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter lead name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option>New</option>
                      <option>Interested</option>
                      <option>Contacted</option>
                      <option>Follow-up Due</option>
                      <option>Converted</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Source</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                    >
                      <option>Website</option>
                      <option>Referral</option>
                      <option>LinkedIn</option>
                      <option>Instagram</option>
                      <option>WhatsApp</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Next Follow-up</label>
                    <input
                      type="text"
                      name="nextFollowUp"
                      value={formData.nextFollowUp}
                      onChange={handleChange}
                      placeholder="e.g. 25 Jun, 4:30 PM"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-btn">
                    Save Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;