import React, {
    useEffect,
    useState
} from "react";


import styles from "./BrowseProperties.module.scss";


import Header from "../property-details/Header/Header";
import Breadcrumb from "../property-details/Breadcrumb/Breadcrumb";
import SearchBar from "./SearchBar/SearchBar";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import PropertyGrid from "./PropertyGrid/PropertyGrid";
import Pagination from "./Pagination/Pagination";


import {
    getProperties
} from "../actions/propertyActions";

import {
    useSearchParams
} from "react-router-dom";

import type {
    PropertyListing
} from "./shared/types";



const BrowseProperties:React.FC = ()=>{

const [searchParams] = useSearchParams();


const urlKeyword =
    searchParams.get("keyword") || "";

const [listings,setListings] =
useState<PropertyListing[]>([]);


const [total,setTotal] =
useState(0);


const [pages,setPages] =
useState(1);


const [loading,setLoading] =
useState(false);



const [filters,setFilters] =
useState<any>({

    page:1,

    limit:6,

    sort:"newest",

    keyword: urlKeyword || undefined

});
useEffect(()=>{

    const keyword =
        searchParams.get("keyword");


    setFilters((prev:any)=>({

        ...prev,

        page:1,

        keyword: keyword || undefined

    }));


},[searchParams]);




const loadProperties = async()=>{


try{


setLoading(true);



const response =
await getProperties(filters);



const formatted =
response.properties.map(
(item:any)=>({


id:item._id,


status:
item.listingType === "rent"
?
"FOR RENT"
:
"PENDING",



price:
item.listingType === "rent"
?
`$${item.price}/mo`
:
`$${item.price.toLocaleString()}`,



title:item.title,



address:
`${item.address}, ${item.city}`,



beds:item.bedrooms,



baths:item.bathrooms,



sqft:item.area,



image:item.image



})
);



setListings(formatted);



setTotal(
response.pagination.totalProperties
);



setPages(
response.pagination.totalPages
);



}
catch(error){

console.log(
"Properties loading error",
error
);

}
finally{

setLoading(false);

}


};





useEffect(()=>{


loadProperties();


},[filters]);







const handleSearch = (
data:any
)=>{


setFilters({


page:1,


limit:6,


sort:"newest",



keyword:
data.location || undefined,



propertyType:
data.propertyType !== "all"
?
data.propertyType
:
undefined,



bedrooms:
data.bedrooms !== "any"
?
data.bedrooms
:
undefined



});


};







const handleFilters = (
data:any
)=>{



setFilters({


...filters,


page:1,



minPrice:
data.priceMin,



maxPrice:
data.priceMax,



propertyType:
data.propertyType !== "all"
?
data.propertyType
:
undefined,



bedrooms:
data.bedrooms !== "Any"
?
data.bedrooms.replace("+","")
:
undefined,



bathrooms:
data.bathrooms !== "Any"
?
data.bathrooms.replace("+","")
:
undefined,



listingType:

data.forSale && data.forRent

?
undefined

:

data.forSale

?
"sale"

:

data.forRent

?
"rent"

:

undefined



});



};






return (

<div className={styles.page}>


<Header active="browse"/>



<div className={styles.toolbarSection}>


<div className={styles.container}>


<Breadcrumb

trail={[
"Home"
]}

current="Browse Properties"

/>



<SearchBar

defaultLocation="Lakeview, IL"

onSearch={handleSearch}

/>



</div>


</div>





<div className={styles.container}>


<div className={styles.mainGrid}>


<aside>


<FiltersSidebar

onApply={handleFilters}

/>


</aside>





<div>



<ResultsHeader


resultCount={total}


location="Lakeview, IL"


onSortChange={
(sort)=>{


let backendSort="newest";


if(sort==="price-asc")
backendSort="priceAsc";


if(sort==="price-desc")
backendSort="priceDesc";



setFilters({

...filters,

sort:backendSort

});


}

}


/>






{
loading

?

<p>
Loading properties...
</p>


:

<PropertyGrid

listings={listings}

/>


}





<Pagination


totalPages={pages}


onPageChange={
(page)=>

setFilters({

...filters,

page

})

}


/>




</div>



</div>


</div>


</div>


);


};


export default BrowseProperties;