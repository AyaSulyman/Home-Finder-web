import React, { useEffect, useState } from "react";
import { message } from "antd";
import HouseIllustration from "../property-details/shared/HouseIllustration";
import {
  createPropertyAction,
  deletePropertyAction,
  type PropertyPayload,
} from "../actions/propertyActions";
import {
  getBuyerDashboardAction,
  getSellerDashboardAction,
  type BuyerDashboardData,
  type SellerDashboardData,
} from "../actions/dashboardActions";
import { updateAppointmentStatusAction } from "../actions/appointmentActions";
import styles from "./SellerDashboard.module.scss";

type Role = "buyer" | "seller";
type RequestStatus = "Pending" | "Confirmed";
type AppointmentStatus = "Confirmed" | "Pending" | "Rejected" | "Visited";
type PropertyStatus = "Active" | "Draft" | "Sold";

interface StatCard {
  label: string;
  value: string;
  note: string;
  alert?: boolean;
}

const SELLER_STATS: StatCard[] = [
  { label: "Active listings", value: "9", note: "2 pending review" },
  { label: "Total views", value: "4,820", note: "+12% this month" },
  { label: "Pending requests", value: "4", note: "Needs response", alert: true },
  { label: "Confirmed viewings", value: "17", note: "Next 14 days" },
];

const BUYER_STATS: StatCard[] = [
  { label: "Saved homes", value: "12", note: "+3 this week" },
  { label: "Upcoming viewings", value: "2", note: "Next: Sat, 11:30 AM" },
  { label: "Pending requests", value: "1", note: "Awaiting seller response" },
  { label: "Past viewings", value: "6", note: "Since Jan 2026" },
];

const sellerRequests = [
  {
    initials: "JE",
    buyer: "Jordan Ellis",
    property: "Archer House",
    time: "Sat, Jul 18 - 11:30 AM",
    status: "Pending" as RequestStatus,
    respond: true,
  },
  {
    initials: "RS",
    buyer: "Riya Sen",
    property: "House Fifth Street",
    time: "Mon, Jul 20 - 3:00 PM",
    status: "Pending" as RequestStatus,
    respond: true,
  },
  {
    initials: "TW",
    buyer: "Tom Wu",
    property: "Cedar Ridge Home",
    time: "Wed, Jul 22 - 10:00 AM",
    status: "Confirmed" as RequestStatus,
    respond: false,
  },
];

const buyerAppointments = [
  {
    title: "Archer House",
    address: "1120 Maple Ave",
    time: "Sat, Jul 18 - 11:30 AM",
    agent: "Dana Marlowe",
    status: "Confirmed" as AppointmentStatus,
    action: "Cancel",
  },
  {
    title: "Villa One Hyde Park",
    address: "88 Hyde Park Rd",
    time: "Wed, Jul 22 - 2:00 PM",
    agent: "Marco Reyes",
    status: "Pending" as AppointmentStatus,
    action: "Cancel",
  },
  {
    title: "House Fifth Street",
    address: "5th St, Riverside",
    time: "Jun 30 - 9:00 AM",
    agent: "Dana Marlowe",
    status: "Rejected" as AppointmentStatus,
    action: "Rebook",
  },
  {
    title: "Oakwood Residence",
    address: "22 Oakwood Dr",
    time: "Jun 12 - 4:30 PM",
    agent: "Priya Shah",
    status: "Visited" as AppointmentStatus,
    action: "View details",
  },
];

const sellerProperties = [
  {
    title: "Archer House",
    address: "1120 Maple Ave, Lakeview",
    price: "$675,000",
    type: "House",
    views: "612",
    status: "Active" as PropertyStatus,
  },
  {
    title: "House Fifth Street",
    address: "5th St, Riverside",
    price: "$915,500",
    type: "House",
    views: "390",
    status: "Active" as PropertyStatus,
  },
  {
    title: "Cedar Ridge Home",
    address: "Lakeview",
    price: "$598,000",
    type: "House",
    views: "210",
    status: "Draft" as PropertyStatus,
  },
  {
    title: "Harbor View Estate",
    address: "3 Harbor Way",
    price: "$1,120,000",
    type: "Villa",
    views: "1,105",
    status: "Sold" as PropertyStatus,
  },
];

const savedHomes = [
  {
    label: "FOR SALE",
    price: "$675,000",
    title: "Archer House",
    location: "Lakeview",
    rent: false,
  },
  {
    label: "FOR RENT",
    price: "$2,300/mo",
    title: "Villa One Hyde Park",
    location: "Northgate",
    rent: true,
  },
  {
    label: "FOR SALE",
    price: "$915,500",
    title: "House Fifth Street",
    location: "Riverside",
    rent: false,
  },
];

const amenities = [
  { label: "Air conditioning", active: true },
  { label: "Hardwood floors", active: true },
  { label: "Garage", active: true },
  { label: "Pool", active: false },
  { label: "Fireplace", active: false },
  { label: "Garden", active: true },
  { label: "Solar panels", active: false },
  { label: "+ Add custom", active: false },
];

const Sidebar: React.FC<{ role: Role; active: string }> = ({ role, active }) => {
  const isSeller = role === "seller";
  const nav = isSeller
    ? [
        ["Overview", "/seller-dashboard", "overview"],
        ["My Listings", "/seller-dashboard", "listings"],
        ["Add New Listing", "/add-listing", "add"],
        ["Appointment Requests", "/seller-dashboard", "requests"],
        ["Profile Settings", "#", "profile"],
      ]
    : [
        ["Overview", "/buyer-dashboard", "overview"],
        ["Browse Properties", "/browse-properties", "browse"],
        ["Saved Homes", "/buyer-dashboard", "saved"],
        ["Appointments", "/buyer-dashboard", "appointments"],
        ["Profile Settings", "#", "profile"],
      ];

  return (
    <aside className={styles.sidebar}>
      <a href={isSeller ? "/seller-dashboard" : "/buyer-dashboard"} className={styles.brand}>
        <span className={styles.logoBox} />
        <span>HomeFinder</span>
      </a>

      <div className={styles.role}>{isSeller ? "Seller / Agent" : "Buyer"}</div>

      <nav className={styles.nav} aria-label={`${role} navigation`}>
        {nav.map(([label, href, key]) => (
          <a
            href={href}
            key={label}
            className={active === key ? styles.navItemActive : styles.navItem}
          >
            <span className={styles.navMark}>{label.slice(0, 1)}</span>
            {label}
          </a>
        ))}
      </nav>

      <div className={styles.profile}>
        <div className={styles.avatar}>{isSeller ? "DM" : "JE"}</div>
        <div>
          <strong>{isSeller ? "Dana Marlowe" : "Jordan Ellis"}</strong>
          <span>{isSeller ? "Agent" : "Buyer"}</span>
        </div>
      </div>
      <a href="#" className={styles.logout}>
        {"<- Log out"}
      </a>
    </aside>
  );
};

const DashboardShell: React.FC<{
  role: Role;
  active: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ role, active, title, subtitle, action, children }) => (
  <div className={styles.shell}>
    <Sidebar role={role} active={active} />
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
  <section className={styles.statsGrid} aria-label="Dashboard summary">
    {stats.map((stat) => (
      <article className={styles.statCard} key={stat.label}>
        <span>{stat.label}</span>
        <strong>{stat.value}</strong>
        <small className={stat.alert ? styles.alertNote : undefined}>{stat.note}</small>
      </article>
    ))}
  </section>
);

const statusClassName = (status: RequestStatus | AppointmentStatus | PropertyStatus) => {
  if (status === "Pending") return styles.statusPending;
  if (status === "Rejected") return styles.statusRejected;
  if (status === "Draft") return styles.statusDraft;
  if (status === "Sold") return styles.statusSold;
  return styles.statusActive;
};

const StatusPill: React.FC<{ status: RequestStatus | AppointmentStatus | PropertyStatus }> = ({
  status,
}) => <span className={statusClassName(status)}>{status}</span>;

const SellerDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<SellerDashboardData | null>(null);
  const [dashboardError, setDashboardError] = useState("");

  const loadDashboard = async () => {
    try {
      setDashboardError("");
      setDashboard(await getSellerDashboardAction());
    } catch (error) {
      setDashboardError(error instanceof Error ? error.message : "Could not load dashboard");
    }
  };

  useEffect(() => {
    getSellerDashboardAction().then(setDashboard).catch((error) => {
      setDashboardError(error instanceof Error ? error.message : "Could not load dashboard");
    });
  }, []);

  const stats: StatCard[] = dashboard ? [
    { label: "Active listings", value: String(dashboard.stats.activeListings), note: "Currently published" },
    { label: "Total views", value: dashboard.stats.totalViews.toLocaleString(), note: "Across your listings" },
    { label: "Pending requests", value: String(dashboard.stats.pendingRequests), note: "Needs response", alert: dashboard.stats.pendingRequests > 0 },
    { label: "Confirmed viewings", value: String(dashboard.stats.confirmedViewings), note: "Upcoming" },
  ] : SELLER_STATS;

  const requests = dashboard?.recentRequests.map((request) => {
    const buyer = request.buyerId;
    const property = request.propertyId ?? {};
    return {
      id: request._id as string,
      initials: `${buyer?.firstName?.[0] ?? "B"}${buyer?.lastName?.[0] ?? ""}`,
      buyer: `${buyer?.firstName ?? "Buyer"} ${buyer?.lastName ?? ""}`.trim(),
      property: property.title ?? "Property",
      time: new Date(request.scheduledAt).toLocaleString(),
      status: (request.status === "accepted" ? "Confirmed" : "Pending") as RequestStatus,
      respond: request.status === "pending",
    };
  }) ?? sellerRequests.map((request) => ({ ...request, id: request.buyer }));

  const properties = dashboard?.properties.map((property) => ({
    id: property._id as string,
    title: property.title as string,
    address: [property.address?.street, property.address?.city].filter(Boolean).join(", "),
    price: `$${Number(property.price ?? 0).toLocaleString()}`,
    type: property.propertyType as string,
    views: String(property.views ?? 0),
    status: `${String(property.status ?? "draft")[0].toUpperCase()}${String(property.status ?? "draft").slice(1)}` as PropertyStatus,
  })) ?? sellerProperties.map((property) => ({ ...property, id: property.title }));

  const respond = async (id: string, status: "accepted" | "rejected") => {
    try {
      await updateAppointmentStatusAction(id, status);
      message.success(`Appointment ${status}`);
      await loadDashboard();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Could not update appointment");
    }
  };

  const removeProperty = async (id: string) => {
    try {
      await deletePropertyAction(id);
      message.success("Property deleted");
      await loadDashboard();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Could not delete property");
    }
  };

  return (
  <DashboardShell
    role="seller"
    active="overview"
    title="Your listings"
    subtitle="Manage properties and review viewing requests."
    action={
      <a className={styles.primaryButton} href="/add-listing">
        + Add new listing
      </a>
    }
  >
    {dashboardError && <p role="alert">{dashboardError}</p>}
    <StatsGrid stats={stats} />

    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Appointment requests</h2>
        <div className={styles.tabs}>
          <button className={styles.tabActive} type="button">Pending (4)</button>
          <button type="button">Confirmed</button>
          <button type="button">All</button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.requestsHead}>
          <span>Buyer</span>
          <span>Property</span>
          <span>Requested time</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {requests.map((request) => (
          <div className={styles.requestRow} key={request.id}>
            <div className={styles.personCell}>
              <span className={styles.initials}>{request.initials}</span>
              <strong>{request.buyer}</strong>
            </div>
            <span>{request.property}</span>
            <span>{request.time}</span>
            <StatusPill status={request.status} />
            {request.respond ? (
              <div className={styles.actions}>
                <button onClick={() => respond(request.id, "accepted")} className={styles.acceptButton} type="button">Accept</button>
                <button onClick={() => respond(request.id, "rejected")} className={styles.declineButton} type="button">Decline</button>
              </div>
            ) : (
              <a className={styles.detailsLink} href="#">View details</a>
            )}
          </div>
        ))}
      </div>
    </section>

    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>My properties</h2>
        <select aria-label="Filter properties by status">
          <option>All statuses</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Sold</option>
        </select>
      </div>

      <div className={styles.table}>
        <div className={styles.propertiesHead}>
          <span>Property</span>
          <span>Price</span>
          <span>Type</span>
          <span>Views</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {properties.map((property) => (
          <div className={styles.propertyRow} key={property.id}>
            <PropertySummary title={property.title} address={property.address} />
            <span>{property.price}</span>
            <span>{property.type}</span>
            <span>{property.views}</span>
            <StatusPill status={property.status} />
            <div className={styles.iconActions}>
              <button type="button" aria-label={`Edit ${property.title}`}>E</button>
              <button onClick={() => removeProperty(property.id)} type="button" aria-label={`Delete ${property.title}`}>D</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </DashboardShell>
  );
};

const PropertySummary: React.FC<{ title: string; address: string }> = ({ title, address }) => (
  <div className={styles.propertyCell}>
    <div className={styles.thumb}>
      <HouseIllustration variant="thumb" />
    </div>
    <div>
      <strong>{title}</strong>
      <span>{address}</span>
    </div>
  </div>
);

export const BuyerDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<BuyerDashboardData | null>(null);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    getBuyerDashboardAction().then(setDashboard).catch((error) => {
      setDashboardError(error instanceof Error ? error.message : "Could not load dashboard");
    });
  }, []);

  const stats: StatCard[] = dashboard ? [
    { label: "Saved homes", value: String(dashboard.stats.savedHomes), note: "In your favorites" },
    { label: "Upcoming viewings", value: String(dashboard.stats.upcomingViewings), note: "Confirmed" },
    { label: "Pending requests", value: String(dashboard.stats.pendingRequests), note: "Awaiting seller response" },
    { label: "Past viewings", value: String(dashboard.stats.pastViewings), note: "Appointment history" },
  ] : BUYER_STATS;

  const appointments = dashboard?.appointments.map((appointment) => {
    const property = appointment.propertyId ?? {};
    const seller = appointment.sellerId;
    const status = `${String(appointment.status)[0].toUpperCase()}${String(appointment.status).slice(1)}` as AppointmentStatus;
    return {
      id: appointment._id as string,
      title: property.title ?? "Property",
      address: [property.address?.street, property.address?.city].filter(Boolean).join(", "),
      time: new Date(appointment.scheduledAt).toLocaleString(),
      agent: `${seller?.firstName ?? "Seller"} ${seller?.lastName ?? ""}`.trim(),
      status,
      action: ["pending", "accepted"].includes(appointment.status) ? "Cancel" : "View details",
    };
  }) ?? buyerAppointments.map((appointment) => ({ ...appointment, id: appointment.title }));

  const homes = dashboard?.favorites.map((favorite) => {
    const property = favorite.propertyId ?? {};
    return {
      label: property.listingType === "rent" ? "FOR RENT" : "FOR SALE",
      price: property.listingType === "rent"
        ? `$${Number(property.price ?? 0).toLocaleString()}/mo`
        : `$${Number(property.price ?? 0).toLocaleString()}`,
      title: property.title ?? "Saved property",
      location: property.address?.city ?? "",
      rent: property.listingType === "rent",
    };
  }) ?? savedHomes;

  const cancelAppointment = async (id: string) => {
    try {
      await updateAppointmentStatusAction(id, "cancelled");
      setDashboard(await getBuyerDashboardAction());
      message.success("Appointment cancelled");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Could not cancel appointment");
    }
  };

  return (
  <DashboardShell
    role="buyer"
    active="overview"
    title="Welcome back, Jordan"
    subtitle="Here's what's happening with your home search."
    action={
      <a className={styles.primaryButton} href="/browse-properties">
        Browse new listings
      </a>
    }
  >
    {dashboardError && <p role="alert">{dashboardError}</p>}
    <StatsGrid stats={stats} />

    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Your appointments</h2>
        <div className={styles.tabs}>
          <button className={styles.tabActive} type="button">All</button>
          <button type="button">Upcoming</button>
          <button type="button">Past</button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.appointmentsHead}>
          <span>Property</span>
          <span>Date & Time</span>
          <span>Agent</span>
          <span>Status</span>
          <span />
        </div>

        {appointments.map((appointment) => (
          <div className={styles.appointmentRow} key={appointment.id}>
            <PropertySummary title={appointment.title} address={appointment.address} />
            <span>{appointment.time}</span>
            <span>{appointment.agent}</span>
            <StatusPill status={appointment.status} />
            <a
              className={
                appointment.action === "Cancel" ? styles.cancelLink : styles.detailsLink
              }
              href="#"
              onClick={(event) => {
                if (appointment.action === "Cancel") {
                  event.preventDefault();
                  void cancelAppointment(appointment.id);
                }
              }}
            >
              {appointment.action}
            </a>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.savedSection}>
      <div className={styles.savedHeader}>
        <h2>Saved homes</h2>
        <a href="/favorites">{"View all ->"}</a>
      </div>
      <div className={styles.savedGrid}>
        {homes.map((home) => (
          <article className={styles.homeCard} key={home.title}>
            <div className={styles.cardImage}>
              <HouseIllustration variant="card" />
              <span className={home.rent ? styles.badgeRent : styles.badgeSale}>
                {home.label}
              </span>
              <button type="button" aria-label={`Remove ${home.title} from saved homes`}>
                H
              </button>
            </div>
            <div className={styles.homeBody}>
              <strong>{home.price}</strong>
              <span>{home.title}</span>
              <small>{home.location}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  </DashboardShell>
  );
};

const Field: React.FC<{
  label: string;
  value: string;
  wide?: boolean;
  textarea?: boolean;
  select?: boolean;
}> = ({ label, value, wide, textarea, select }) => (
  <label className={wide ? styles.fieldWide : styles.field}>
    <span>{label}</span>
    {textarea ? (
      <textarea defaultValue={value} />
    ) : select ? (
      <select defaultValue={value}>
        <option>{value}</option>
      </select>
    ) : (
      <input defaultValue={value} />
    )}
  </label>
);

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className={styles.formPanel}>
    <h2>{title}</h2>
    <div className={styles.formBody}>{children}</div>
  </section>
);

const initialListing: PropertyPayload = {
  title: "",
  description: "",
  listingType: "sale",
  propertyType: "house",
  price: 0,
  address: { street: "", city: "", state: "", zipCode: "" },
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  amenities: [],
  availability: [],
  status: "draft",
};

export const AddListingPage: React.FC = () => {
  const [form, setForm] = useState<PropertyPayload>(initialListing);
  const [slotDate, setSlotDate] = useState("");
  const [slotTimes, setSlotTimes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setValue = (key: keyof PropertyPayload, value: unknown) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const setAddress = (key: keyof PropertyPayload["address"], value: string) => {
    setForm((current) => ({
      ...current,
      address: { ...current.address, [key]: value },
    }));
  };

  const toggleAmenity = (label: string) => {
    setForm((current) => ({
      ...current,
      amenities: current.amenities.includes(label)
        ? current.amenities.filter((item) => item !== label)
        : [...current.amenities, label],
    }));
  };

  const submit = async (status: "draft" | "active") => {
    setSubmitting(true);
    try {
      const times = slotTimes.split(",").map((time) => time.trim()).filter(Boolean);
      await createPropertyAction({
        ...form,
        status,
        availability: slotDate && times.length ? [{ date: slotDate, times }] : [],
      });
      message.success(status === "draft" ? "Draft saved" : "Listing published");
      setForm(initialListing);
      setSlotDate("");
      setSlotTimes("");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Could not save listing");
    } finally {
      setSubmitting(false);
    }
  };

  return <DashboardShell
    role="seller"
    active="add"
    title="Add a new listing"
    subtitle="Fill in the details below - you can save as a draft any time."
    action={
      <div className={styles.topActions}>
        <button className={styles.secondaryButton} type="button">Cancel</button>
        <button disabled={submitting} onClick={() => submit("draft")} className={styles.outlineButton} type="button">Save Draft</button>
        <button disabled={submitting} onClick={() => submit("active")} className={styles.primaryButton} type="button">Publish Listing</button>
      </div>
    }
  >
    <div className={styles.formStack}>
      <FormSection title="Basic information">
        <label className={styles.fieldWide}><span>Listing title</span><input required value={form.title} onChange={(event) => setValue("title", event.target.value)} /></label>
        <label className={styles.field}><span>Listing type</span><select value={form.listingType} onChange={(event) => setValue("listingType", event.target.value)}><option value="sale">For Sale</option><option value="rent">For Rent</option></select></label>
        <label className={styles.field}><span>Property type</span><select value={form.propertyType} onChange={(event) => setValue("propertyType", event.target.value)}><option value="house">House</option><option value="apartment">Apartment</option><option value="villa">Villa</option><option value="land">Land</option><option value="townhouse">Townhouse</option></select></label>
        <label className={styles.fieldWide}><span>Description</span><textarea required value={form.description} onChange={(event) => setValue("description", event.target.value)} /></label>
      </FormSection>

      <FormSection title="Location">
        <label className={styles.fieldWide}><span>Street address</span><input value={form.address.street} onChange={(event) => setAddress("street", event.target.value)} /></label>
        <label className={styles.field}><span>City</span><input value={form.address.city} onChange={(event) => setAddress("city", event.target.value)} /></label>
        <label className={styles.field}><span>State</span><input value={form.address.state} onChange={(event) => setAddress("state", event.target.value)} /></label>
        <label className={styles.field}><span>ZIP code</span><input value={form.address.zipCode} onChange={(event) => setAddress("zipCode", event.target.value)} /></label>
      </FormSection>

      <FormSection title="Property details">
        <label className={styles.field}><span>Price</span><input min="0" type="number" value={form.price} onChange={(event) => setValue("price", Number(event.target.value))} /></label>
        <label className={styles.field}><span>Square footage</span><input min="0" type="number" value={form.area} onChange={(event) => setValue("area", Number(event.target.value))} /></label>
        <label className={styles.field}><span>Bedrooms</span><input min="0" type="number" value={form.bedrooms} onChange={(event) => setValue("bedrooms", Number(event.target.value))} /></label>
        <label className={styles.field}><span>Bathrooms</span><input min="0" step="0.5" type="number" value={form.bathrooms} onChange={(event) => setValue("bathrooms", Number(event.target.value))} /></label>
        <div className={styles.amenities}>
          <span>Amenities</span>
          <div>
            {amenities.map((amenity) => (
              <button
                className={amenity.active ? styles.chipActive : styles.chip}
                type="button"
                key={amenity.label}
                onClick={() => toggleAmenity(amenity.label)}
              >
                {amenity.label}
              </button>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title="Viewing availability">
        <label className={styles.field}><span>Date</span><input type="date" value={slotDate} onChange={(event) => setSlotDate(event.target.value)} /></label>
        <label className={styles.fieldWide}><span>Times (comma separated, 24-hour format)</span><input placeholder="10:00, 11:30, 14:00" value={slotTimes} onChange={(event) => setSlotTimes(event.target.value)} /></label>
      </FormSection>

      <FormSection title="Photos">
        <div className={styles.photos}>
          {[1, 2, 3].map((item) => (
            <div className={styles.photo} key={item}>
              <HouseIllustration variant="card" />
            </div>
          ))}
          <button className={styles.uploadBox} type="button">
            <strong>+</strong>
            <span>Upload photos</span>
          </button>
        </div>
        <p className={styles.helpText}>
          Upload up to 20 images. Drag to reorder - the first photo becomes the cover image.
        </p>
      </FormSection>

      <FormSection title="Contact information">
        <Field label="Contact name" value="Dana Marlowe" />
        <Field label="Phone number" value="+1 (312) 555-0148" />
        <Field label="Email" value="dana@lakeviewrealty.com" wide />
      </FormSection>

      <div className={styles.bottomActions}>
        <button className={styles.secondaryButton} type="button">Cancel</button>
        <button disabled={submitting} onClick={() => submit("draft")} className={styles.outlineButton} type="button">Save Draft</button>
        <button disabled={submitting} onClick={() => submit("active")} className={styles.primaryButton} type="button">Publish Listing</button>
      </div>
    </div>
  </DashboardShell>;
};

export default SellerDashboard;
