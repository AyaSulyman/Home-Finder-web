import {
useEffect,
useState
} from "react";


import {
useParams
} from "react-router-dom";


import styles from "./PropertyDetails.module.scss";


import Header from "./Header/Header";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import PropertyInfo from "./PropertyInfo/PropertyInfo";
import AboutProperty from "./AboutProperty/AboutProperty";
import Amenities from "./Amenities/Amenities";
import LocationMap from "./LocationMap/LocationMap";
import ListedBy from "./ListedBy/ListedBy";
import BookingCard from "./BookingCard/BookingCard";
import MortgageEstimate from "./MortgageEstimate/MortgageEstimate";
import SimilarListings from "./SimilarListings/SimilarListings";


const PropertyDetails = ()=>{


const {id}=useParams();


const [property,setProperty]=useState<any>(null);



useEffect(() => {

  if (!id) return;


  const fetchProperty = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/properties/${id}`
      );


      const data = await response.json();


      if(data.success){

        setProperty(data.data);

      }


    } catch(error) {

      console.log(
        "Property details error:",
        error
      );

    }

  };


  fetchProperty();


}, [id]);



if(!property)

return <p>Loading...</p>;



return (

<div className={styles.page}>


<Header active="browse"/>



<div className={styles.container}>


<Breadcrumb
  trail={[
    "Home",
    "Browse Properties"
  ]}
  current={property.title}
/>



<Gallery
  images={
    property.images?.length > 0
      ? property.images
      : [property.image]
  }
/>

<div className={styles.mainGrid}>


<div>


<PropertyInfo

status={
property.listingType==="sale"
?
"FOR SALE"
:
"FOR RENT"
}


title={
property.title
}


price={
`$${property.price.toLocaleString()}`
}


priceSub={
`$${Math.round(
property.price/property.area
)}
/ sqft`
}


address={
`${property.address}, ${property.city}`
}


stats={[
{
label:"Bedrooms",
value:property.bedrooms
},
{
label:"Bathrooms",
value:property.bathrooms
},
{
label:"Sqft",
value:property.area
},
{
label:"Year built",
value:property.yearBuilt || "N/A"
},
{
label:"Garage",
value:property.garage || "N/A"
}

]}


/>



<hr className={styles.divider}/>



<AboutProperty

description={
property.description
}

/>



<hr className={styles.divider}/>



<Amenities

items={
property.amenities || []
}

/>



<hr className={styles.divider}/>



<LocationMap/>



<hr className={styles.divider}/>



<ListedBy

initials={
property.agent?.initials || "AG"
}


name={
property.agent?.name || "HomeFinder Agent"
}


role={
property.agent?.role || "Licensed Agent"
}

/>



</div>



<aside>


<BookingCard

agentName={
property.agent?.name
}

/>



<MortgageEstimate

apr="6.4% APR"

monthlyPayment="$3,420"

note="Based on 20% down, 30-year fixed"

/>



</aside>



</div>


</div>


<SimilarListings

listings={[]}

/>


</div>

)

}



export default PropertyDetails;
