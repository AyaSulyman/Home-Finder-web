import React from "react";
import HouseIllustration from "../property-details/shared/HouseIllustration";
import styles from "./AdminDashboard.module.scss";

type UserRole = "Buyer" | "Seller / Agent";
type UserStatus = "Active" | "Suspended";
type ListingStatus = "Active" | "Flagged" | "Draft" | "Sold";
type AppointmentStatus = "Confirmed" | "Pending" | "Rejected";
type StatusValue = UserStatus | ListingStatus | AppointmentStatus;

interface StatCard {
  label: string;
  value: string;
  note: string;
  alert?: boolean;
}

interface AdminUserRow {
  initials: string;
  name: string;
  email: string;
  role: UserRole;
  listings: string;
  joined: string;
  status: UserStatus;
}

interface AdminListingRow {
  title: string;
  seller: string;
  price: string;
  status: ListingStatus;
  reports: number;
}

interface AdminAppointmentRow {
  buyer: string;
  seller: string;
  property: string;
  date: string;
  status: AppointmentStatus;
}

const ADMIN_STATS: StatCard[] = [
  { label: "Total users", value: "8,412", note: "+214 this month" },
  { label: "Active listings", value: "3,204", note: "+58 this month" },
  { label: "Appointments booked", value: "1,096", note: "+9.2%" },
  { label: "Flagged listings", value: "7", note: "Needs review", alert: true },
];

const adminUsers: AdminUserRow[] = [
  {
    initials: "JE",
    name: "Jordan Ellis",
    email: "jordan@email.com",
    role: "Buyer",
    listings: "—",
    joined: "Feb 2026",
    status: "Active",
  },
  {
    initials: "DM",
    name: "Dana Marlowe",
    email: "dana@lakeviewrealty.com",
    role: "Seller / Agent",
    listings: "9",
    joined: "Nov 2025",
    status: "Active",
  },
  {
    initials: "MR",
    name: "Marco Reyes",
    email: "marco@primeagents.com",
    role: "Seller / Agent",
    listings: "14",
    joined: "Aug 2025",
    status: "Suspended",
  },
];

const adminListings: AdminListingRow[] = [
  {
    title: "Archer House",
    seller: "Dana Marlowe",
    price: "$675,000",
    status: "Active",
    reports: 0,
  },
  {
    title: "Riverside Duplex",
    seller: "Marco Reyes",
    price: "$450,000",
    status: "Flagged",
    reports: 3,
  },
  {
    title: "Harbor View Estate",
    seller: "Priya Shah",
    price: "$1,120,000",
    status: "Active",
    reports: 0,
  },
];

const adminAppointments: AdminAppointmentRow[] = [
  {
    buyer: "Jordan Ellis",
    seller: "Dana Marlowe",
    property: "Archer House",
    date: "Jul 18",
    status: "Confirmed",
  },
  {
    buyer: "Riya Sen",
    seller: "Dana Marlowe",
    property: "House Fifth Street",
    date: "Jul 20",
    status: "Pending",
  },
  {
    buyer: "Tom Wu",
    seller: "Priya Shah",
    property: "Cedar Ridge Home",
    date: "Jul 22",
    status: "Confirmed",
  },
];

const adminNav: Array<[string, string, string]> = [
  ["Overview", "/admin-dashboard", "overview"],
  ["Manage Users", "/admin-dashboard/users", "users"],
  ["Manage Listings", "/admin-dashboard/listings", "listings"],
  ["Monitor Appointments", "/admin-dashboard/appointments", "appointments"],
  ["Flagged Content", "/admin-dashboard/flagged", "flagged"],
  ["Platform Settings", "#", "settings"],
];

const AdminSidebar: React.FC<{ active: string }> = ({ active }) => (
  <aside className={styles.sidebar}>
    <a href="/admin-dashboard" className={styles.brand}>
      <span className={styles.logoBox} />
      <span>HomeFinder</span>
    </a>

    <div className={styles.role}>Admin</div>

    <nav className={styles.nav} aria-label="Admin navigation">
      {adminNav.map(([label, href, key]) => (
        <a
          href={href}
          key={key}
          className={active === key ? styles.navItemActive : styles.navItem}
        >
          <span className={styles.navMark}>{label.slice(0, 1)}</span>
          {label}
        </a>
      ))}
    </nav>

    <div className={styles.profile}>
      <div className={styles.avatar}>AD</div>
      <div>
        <strong>Amina Diallo</strong>
        <span>Admin</span>
      </div>
    </div>
    <a href="#" className={styles.logout}>
      {"<- Log out"}
    </a>
  </aside>
);

const AdminShell: React.FC<{
  active: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ active, title, subtitle, action, children }) => (
  <div className={styles.shell}>
    <AdminSidebar active={active} />
    <main className={styles.main}>
      <header className={styles.topbar}>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {action}
      </header>
      <div className={styles.content}>{children}</div>
    </main>
  </div>
);

const StatsGrid: React.FC<{ stats: StatCard[] }> = ({ stats }) => (
  <section className={styles.statsGrid} aria-label="Platform summary">
    {stats.map((stat) => (
      <article className={styles.statCard} key={stat.label}>
        <span>{stat.label}</span>
        <strong>{stat.value}</strong>
        <small className={stat.alert ? styles.alertNote : undefined}>{stat.note}</small>
      </article>
    ))}
  </section>
);

const statusClassName = (status: StatusValue) => {
  if (status === "Suspended") return styles.statusSuspended;
  if (status === "Flagged") return styles.statusFlagged;
  if (status === "Draft") return styles.statusDraft;
  if (status === "Sold") return styles.statusSold;
  if (status === "Pending") return styles.statusPending;
  if (status === "Rejected") return styles.statusRejected;
  return styles.statusActive;
};

const StatusPill: React.FC<{ status: StatusValue }> = ({ status }) => (
  <span className={statusClassName(status)}>{status}</span>
);

const PropertyThumb: React.FC<{ title: string }> = ({ title }) => (
  <div className={styles.propertyCell}>
    <div className={styles.thumb}>
      <HouseIllustration variant="thumb" />
    </div>
    <strong>{title}</strong>
  </div>
);

const AdminDashboard: React.FC = () => (
  <AdminShell
    active="overview"
    title="Platform overview"
    subtitle="System-wide activity across users, listings, and appointments."
    action={
      <select className={styles.rangeSelect} aria-label="Date range">
        <option>Last 30 days</option>
        <option>Last 7 days</option>
        <option>Last 90 days</option>
      </select>
    }
  >
    <StatsGrid stats={ADMIN_STATS} />

    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Manage users</h2>
        <div className={styles.panelControls}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search by name or email"
            aria-label="Search users by name or email"
          />
          <select aria-label="Filter users by role">
            <option>All roles</option>
            <option>Buyer</option>
            <option>Seller / Agent</option>
          </select>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.usersHead}>
          <span>User</span>
          <span>Role</span>
          <span>Listings</span>
          <span>Joined</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {adminUsers.map((user) => (
          <div className={styles.userRow} key={user.email}>
            <div className={styles.personCell}>
              <span className={styles.initials}>{user.initials}</span>
              <div>
                <strong>{user.name}</strong>
                <span className={styles.subtext}>{user.email}</span>
              </div>
            </div>
            <span>{user.role}</span>
            <span>{user.listings}</span>
            <span>{user.joined}</span>
            <StatusPill status={user.status} />
            <button className={styles.moreButton} type="button" aria-label={`More actions for ${user.name}`}>
              ...
            </button>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Manage listings</h2>
        <div className={styles.tabs}>
          <button className={styles.tabActive} type="button">All</button>
          <button type="button">Flagged</button>
          <button type="button">Draft</button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.listingsHead}>
          <span>Property</span>
          <span>Seller</span>
          <span>Price</span>
          <span>Status</span>
          <span>Reports</span>
          <span>Actions</span>
        </div>

        {adminListings.map((listing) => (
          <div className={styles.listingRow} key={listing.title}>
            <PropertyThumb title={listing.title} />
            <span>{listing.seller}</span>
            <span>{listing.price}</span>
            <StatusPill status={listing.status} />
            <span>{listing.reports}</span>
            <div className={styles.iconActions}>
              <button type="button" aria-label={`View ${listing.title}`}>
                <EyeIcon />
              </button>
              <button type="button" aria-label={`Delete ${listing.title}`}>
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Appointment activity</h2>
      </div>

      <div className={styles.table}>
        <div className={styles.appointmentsHead}>
          <span>Buyer</span>
          <span>Seller</span>
          <span>Property</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {adminAppointments.map((appointment, index) => (
          <div className={styles.appointmentRow} key={`${appointment.property}-${index}`}>
            <span>{appointment.buyer}</span>
            <span>{appointment.seller}</span>
            <span>{appointment.property}</span>
            <span>{appointment.date}</span>
            <StatusPill status={appointment.status} />
          </div>
        ))}
      </div>
    </section>
  </AdminShell>
);

const EyeIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
    <path
      d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const TrashIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
    <path
      d="M4 6h12M8 6V4.5h4V6M5.5 6l.6 9.2a1 1 0 0 0 1 .9h5.8a1 1 0 0 0 1-.9L14.5 6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AdminDashboard;