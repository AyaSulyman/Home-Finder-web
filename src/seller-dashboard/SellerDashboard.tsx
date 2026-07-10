import React from "react";
import HouseIllustration from "../property-details/shared/HouseIllustration";
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

const SellerDashboard: React.FC = () => (
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
    <StatsGrid stats={SELLER_STATS} />

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

        {sellerRequests.map((request) => (
          <div className={styles.requestRow} key={request.buyer}>
            <div className={styles.personCell}>
              <span className={styles.initials}>{request.initials}</span>
              <strong>{request.buyer}</strong>
            </div>
            <span>{request.property}</span>
            <span>{request.time}</span>
            <StatusPill status={request.status} />
            {request.respond ? (
              <div className={styles.actions}>
                <button className={styles.acceptButton} type="button">Accept</button>
                <button className={styles.declineButton} type="button">Decline</button>
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

        {sellerProperties.map((property) => (
          <div className={styles.propertyRow} key={property.title}>
            <PropertySummary title={property.title} address={property.address} />
            <span>{property.price}</span>
            <span>{property.type}</span>
            <span>{property.views}</span>
            <StatusPill status={property.status} />
            <div className={styles.iconActions}>
              <button type="button" aria-label={`Edit ${property.title}`}>E</button>
              <button type="button" aria-label={`Delete ${property.title}`}>D</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </DashboardShell>
);

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

export const BuyerDashboard: React.FC = () => (
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
    <StatsGrid stats={BUYER_STATS} />

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

        {buyerAppointments.map((appointment) => (
          <div className={styles.appointmentRow} key={appointment.title}>
            <PropertySummary title={appointment.title} address={appointment.address} />
            <span>{appointment.time}</span>
            <span>{appointment.agent}</span>
            <StatusPill status={appointment.status} />
            <a
              className={
                appointment.action === "Cancel" ? styles.cancelLink : styles.detailsLink
              }
              href="#"
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
        <a href="#">{"View all ->"}</a>
      </div>
      <div className={styles.savedGrid}>
        {savedHomes.map((home) => (
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

export const AddListingPage: React.FC = () => (
  <DashboardShell
    role="seller"
    active="add"
    title="Add a new listing"
    subtitle="Fill in the details below - you can save as a draft any time."
    action={
      <div className={styles.topActions}>
        <button className={styles.secondaryButton} type="button">Cancel</button>
        <button className={styles.outlineButton} type="button">Save Draft</button>
        <button className={styles.primaryButton} type="button">Publish Listing</button>
      </div>
    }
  >
    <div className={styles.formStack}>
      <FormSection title="Basic information">
        <Field label="Listing title" value="Archer House" wide />
        <Field label="Listing type" value="For Sale" select />
        <Field label="Property type" value="House" select />
        <Field
          label="Description"
          value="A sun-filled four-bedroom home set on a quiet, tree-lined street in Lakeview..."
          textarea
          wide
        />
      </FormSection>

      <FormSection title="Location">
        <Field label="Street address" value="1120 Maple Ave" wide />
        <Field label="City" value="Lakeview" />
        <Field label="State" value="IL" />
        <Field label="ZIP code" value="60045" />
      </FormSection>

      <FormSection title="Property details">
        <Field label="Price" value="$675,000" />
        <Field label="Square footage" value="2,150 sqft" />
        <Field label="Bedrooms" value="4" />
        <Field label="Bathrooms" value="3" />
        <Field label="Year built" value="2018" />
        <div className={styles.amenities}>
          <span>Amenities</span>
          <div>
            {amenities.map((amenity) => (
              <button
                className={amenity.active ? styles.chipActive : styles.chip}
                type="button"
                key={amenity.label}
              >
                {amenity.label}
              </button>
            ))}
          </div>
        </div>
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
        <button className={styles.outlineButton} type="button">Save Draft</button>
        <button className={styles.primaryButton} type="button">Publish Listing</button>
      </div>
    </div>
  </DashboardShell>
);

export default SellerDashboard;
