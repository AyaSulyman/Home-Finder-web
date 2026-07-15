# My Listings Page Design

## Goal

Create a dedicated seller-only My Listings page that displays only properties created by the authenticated seller and matches the existing seller dashboard table style.

## Architecture

The frontend will add a `/my-listings` route and a focused `MyListingsPage` component. The component will reuse the existing dashboard shell, sidebar, property table styling, and `getMyPropertiesAction()` API action. The seller sidebar's My Listings item will navigate to the new route.

The backend will continue using `GET /api/properties/mine`, which is protected by authentication and seller-role authorization. Its route declaration will move above `GET /api/properties/:id` so Express does not interpret `mine` as a property ID. The existing service query filters by the authenticated user's seller ID and sorts newest first.

## Page Behavior

- Show a loading state while seller properties are requested.
- Show a clear error state when the request fails.
- Show an empty state with an Add New Listing link when the seller has no properties.
- Show a dashboard-style table when properties exist.
- Display each property's primary image when available, with the existing house illustration as fallback.
- Display title, address, price, property type, views, status, and a delete control.
- After a successful delete, remove the property from the page by fetching the seller's properties again.
- Keep the Add New Listing action linked to `/add-listing`.

## Data And Security

The browser will not send a seller ID. The API obtains the seller ID from the authenticated user stored by the existing authentication middleware. MongoDB is queried with `{ sellerId: authenticatedUserId }`, preventing one seller's listings from appearing on another seller's page.

## Testing

- Add a backend route test proving `/api/properties/mine` reaches the protected seller route instead of the `/:id` route.
- Add focused frontend tests if the current frontend test setup supports component routing and API mocking without adding a new test framework.
- Run backend tests and builds for both backend and frontend.

## Files

- Modify `Backend/src/routes/property.routes.ts` for route ordering.
- Modify `Backend/src/routes/property.routes.test.ts` for seller-route coverage.
- Modify `Frontend/src/App.tsx` to register `/my-listings`.
- Modify `Frontend/src/seller-dashboard/SellerDashboard.tsx` to add the page and correct sidebar navigation.
- Modify `Frontend/src/seller-dashboard/SellerDashboard.module.scss` only for page-specific loading, empty, or image presentation styles that are not already available.
