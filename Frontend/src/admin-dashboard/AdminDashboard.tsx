import React, { useEffect, useState } from "react";
import HouseIllustration from "../property-details/shared/HouseIllustration";
import styles from "./AdminDashboard.module.scss";

import {
  getAdminUsersAction,
  getAdminPropertiesAction,
  getAdminAppointmentsAction,
  updateAdminUserAction,
  updateAdminPropertyStatusAction,
  updateAdminAppointmentStatusAction,
  deleteAdminUserAction,
  deleteAdminPropertyAction,
  type AdminUser,
  type AdminProperty
} from "../actions/adminActions";

import type { Appointment } from "../actions/appointmentActions";


type UserStatus = "Active" | "Suspended";
type ListingStatus = "Active" | "Flagged" | "Draft" | "Sold";
type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Rejected";

type StatusValue =
  | UserStatus
  | ListingStatus
  | AppointmentStatus;

interface StatCard {
  label: string;
  value: string;
  note: string;
  alert?: boolean;
}


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

const AdminDashboard: React.FC = () => {

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const [userSearch, setUserSearch] = useState("");
  const [userRole, setUserRole] = useState("");
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const [editingProperty, setEditingProperty] =
    useState<AdminProperty | null>(null);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  const loadData = async () => {

    try {

      const [
        usersResponse,
        propertiesResponse,
        appointmentsResponse
      ] = await Promise.all([
        getAdminUsersAction(),
        getAdminPropertiesAction(),
        getAdminAppointmentsAction()
      ]);

      setUsers(usersResponse);
      setProperties(propertiesResponse);
      setAppointments(appointmentsResponse);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };
  const handleDeleteUser = async (id: string) => {

    const confirmed = window.confirm(
      "Delete this user?"
    );

    if (!confirmed) return;

    try {

      await deleteAdminUserAction(id);

      await loadData();

    } catch (error) {

      console.error(error);

      alert("Failed to delete user.");

    }

  };

  const handleSaveUser = async () => {
    if (!editingUser) return;

    try {
      await updateAdminUserAction(editingUser._id, {
        role: editingUser.role,
        status: editingUser.status
      });

      setEditingUser(null);
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  };

  const handleDeleteProperty = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this property?"
    );

    if (!confirmed) return;

    try {
      await deleteAdminPropertyAction(id);
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete property.");
    }
  };

  const handleSaveProperty = async () => {
    if (!editingProperty) return;

    try {
      await updateAdminPropertyStatusAction(
        editingProperty._id,
        editingProperty.status
      );

      setEditingProperty(null);
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to update property.");
    }
  };
  const handleSaveAppointment = async () => {
    if (!editingAppointment) return;

    try {
      await updateAdminAppointmentStatusAction(
        editingAppointment._id,
        editingAppointment.status
      );

      setEditingAppointment(null);
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to update appointment.");
    }
  };
  useEffect(() => {

    loadData();

  }, []);

  if (loading) {

    return <p>Loading...</p>;

  }

  return (
    <AdminShell
      active="overview"
      title="Platform overview"
      subtitle="System-wide activity across users, listings, and appointments."
    >
      <StatsGrid
        stats={[
          {
            label: "Total users",
            value: users.length.toString(),
            note: "Registered users"
          },
          {
            label: "Active listings",
            value: properties
              .filter((p) => p.status === "active")
              .length.toString(),
            note: "Currently active"
          },
          {
            label: "Appointments booked",
            value: appointments.length.toString(),
            note: "Total appointments"
          },
        ]}
      />
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Manage users</h2>

          <div className={styles.panelControls}>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search by name or email"
              aria-label="Search users by name or email"
              value={userSearch}
              onChange={(event) => setUserSearch(event.target.value)}
            />

            <select
              aria-label="Filter users by role"
              value={userRole}
              onChange={(event) => setUserRole(event.target.value)}
            >
              <option value="">All roles</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller / Agent</option>
              <option value="admin">Admin</option>
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

          {users
            .filter((user) => {
              const matchesSearch =
                `${user.firstName} ${user.lastName}`
                  .toLowerCase()
                  .includes(userSearch.toLowerCase()) ||
                user.email
                  .toLowerCase()
                  .includes(userSearch.toLowerCase());

              const matchesRole =
                !userRole || user.role === userRole;

              return matchesSearch && matchesRole;
            })
            .map((user) => (
              <div className={styles.userRow} key={user._id}>
                <div className={styles.personCell}>
                  <span className={styles.initials}>
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </span>

                  <div>
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>

                    <span className={styles.subtext}>
                      {user.email}
                    </span>
                  </div>
                </div>

                <span>{user.role}</span>
                <span>{user.listingsCount}</span>

                <span>
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>

                <StatusPill
                  status={user.status === "suspended" ? "Suspended" : "Active"}
                />

                <div className={styles.iconActions}>
                  <button
                    type="button"
                    aria-label={`Edit ${user.firstName} ${user.lastName}`}
                    onClick={() => setEditingUser(user)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    aria-label={`Delete ${user.firstName} ${user.lastName}`}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
      {editingUser && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
          >
            <div className={styles.modalHeader}>
              <h2 id="edit-user-title">Edit user</h2>
              <p>
                {editingUser.firstName} {editingUser.lastName}
              </p>
            </div>

            <div className={styles.modalFields}>
              <div className={styles.modalField}>
                <label htmlFor="edit-user-role">Role</label>

                <select
                  id="edit-user-role"
                  value={editingUser.role}
                  onChange={(event) =>
                    setEditingUser({
                      ...editingUser,
                      role: event.target.value as AdminUser["role"]
                    })
                  }
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller / Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className={styles.modalField}>
                <label htmlFor="edit-user-status">Status</label>

                <select
                  id="edit-user-status"
                  value={editingUser.status}
                  onChange={(event) =>
                    setEditingUser({
                      ...editingUser,
                      status: event.target.value as AdminUser["status"]
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>

              <button
                className={styles.saveButton}
                type="button"
                onClick={handleSaveUser}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Manage listings</h2>
        </div>

        <div className={styles.table}>
          <div className={styles.listingsHead}>
            <span>Property</span>
            <span>Seller</span>
            <span>Price</span>
            <span>Status</span>

            <span>Actions</span>
          </div>

          {properties.map((property) => (
            <div className={styles.listingRow} key={property._id}>
              <PropertyThumb title={property.title} />
              <span>
                {property.sellerId
                  ? `${property.sellerId.firstName} ${property.sellerId.lastName}`
                  : "-"}
              </span>
              <span>
                ${property.price.toLocaleString()}
              </span>
              <StatusPill
                status={
                  property.status === "sold"
                    ? "Sold"
                    : property.status === "draft"
                      ? "Draft"
                      : "Active"
                }
              />

              <div className={styles.iconActions}>
                <button
                  type="button"
                  aria-label={`Edit ${property.title}`}
                  onClick={() => setEditingProperty(property)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${property.title}`}
                  onClick={() => handleDeleteProperty(property._id)}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editingProperty && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Edit Property</h2>
              <p>{editingProperty.title}</p>
            </div>

            <div className={styles.modalFields}>
              <div className={styles.modalField}>
                <label>Status</label>

                <select
                  value={editingProperty.status}
                  onChange={(event) =>
                    setEditingProperty({
                      ...editingProperty,
                      status: event.target.value as AdminProperty["status"]
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setEditingProperty(null)}
              >
                Cancel
              </button>

              <button
                className={styles.saveButton}
                onClick={handleSaveProperty}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editingAppointment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Edit Appointment</h2>
              <p>{editingAppointment.propertyId?.title ?? "Appointment"}</p>
            </div>

            <div className={styles.modalFields}>
              <div className={styles.modalField}>
                <label>Status</label>

                <select
                  value={editingAppointment.status}
                  onChange={(event) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      status: event.target.value as Appointment["status"]
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Confirmed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={() => setEditingAppointment(null)}
              >
                Cancel
              </button>

              <button
                className={styles.saveButton}
                type="button"
                onClick={handleSaveAppointment}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
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
            <span>Actions</span>
          </div>

          {appointments.map((appointment) => (
            <div
              className={styles.appointmentRow}
              key={appointment._id}
            >
              <span>
                {appointment.buyerId
                  ? `${appointment.buyerId.firstName} ${appointment.buyerId.lastName}`
                  : "-"}
              </span>

              <span>
                {appointment.sellerId
                  ? `${appointment.sellerId.firstName} ${appointment.sellerId.lastName}`
                  : "-"}
              </span>

              <span>
                {appointment.propertyId?.title ?? "-"}
              </span>

              <span>
                {new Date(appointment.scheduledAt).toLocaleDateString()}
              </span>

              <StatusPill
                status={
                  appointment.status === "accepted"
                    ? "Confirmed"
                    : appointment.status === "rejected"
                      ? "Rejected"
                      : "Pending"
                }
              />

              <div className={styles.iconActions}>
                <button
                  className={styles.moreButton}
                  type="button"
                  onClick={() => setEditingAppointment(appointment)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
};


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