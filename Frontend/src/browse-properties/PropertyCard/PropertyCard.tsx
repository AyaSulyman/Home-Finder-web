import React, {
    useState
} from "react";


import styles from "./PropertyCard.module.scss";


import {
    LocationPinIcon,
    HeartIcon,
    BedIcon,
    BathIcon,
    AreaIcon,
} from "../../property-details/shared/icons";


import type {
    PropertyListing
} from "../shared/types";



interface PropertyCardProps {

    listing: PropertyListing;

    onFavoriteToggle: (
        propertyId: string,
        isFavorited: boolean
    ) => Promise<void>;

}



type StyleModule = {
    [key:string]:string
};



const badgeClassFor = (

    status:string,

    styles_:StyleModule

)=>{


    if(status === "FOR RENT")
        return styles_.badgeRent;


    if(status === "PENDING")
        return styles_.badgePending;


    return styles_.badge;


};





const PropertyCard:React.FC<PropertyCardProps> = ({
    listing,
    onFavoriteToggle
})=>{


const [
    savingFavorite,
    setSavingFavorite
]=useState(false);


const toggleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement>
)=>{

    event.preventDefault();
    event.stopPropagation();

    if(savingFavorite)
        return;

    setSavingFavorite(true);

    try {
        await onFavoriteToggle(
            listing.id,
            !!listing.favorited
        );
    }
    finally {
        setSavingFavorite(false);
    }
};




return (

<article className={styles.card}>


<div className={styles.imageWrap}>


{

listing.image ?


<img

src={listing.image}

alt={listing.title}

className={styles.propertyImage}

/>


:

<div className={styles.placeholder}>
    No Image
</div>


}




<span
className={
badgeClassFor(
listing.status,
styles
)
}
>

{listing.status}

</span>




<button

type="button"

className={styles.favoriteBtn}

onClick={toggleFavorite}

disabled={savingFavorite}

aria-label={
listing.favorited
?
"Remove from favorites"
:
"Add to favorites"
}

aria-busy={savingFavorite}

>

<HeartIcon
filled={!!listing.favorited}
/>


</button>


</div>





<div className={styles.body}>


<div className={styles.price}>

{listing.price}

</div>



<div className={styles.titleText}>

{listing.title}

</div>




<div className={styles.address}>


<LocationPinIcon
className={styles.pin}
/>


<span>

{listing.address}

</span>


</div>




<hr
className={styles.divider}
/>





<div className={styles.stats}>


<span className={styles.stat}>

<BedIcon
className={styles.statIcon}
/>

{listing.beds} bd

</span>



<span className={styles.stat}>

<BathIcon
className={styles.statIcon}
/>

{listing.baths} ba

</span>




<span className={styles.stat}>

<AreaIcon
className={styles.statIcon}
/>


{listing.sqft.toLocaleString("en-US")} sqft


</span>



</div>


</div>


</article>


);


};



export default PropertyCard;
