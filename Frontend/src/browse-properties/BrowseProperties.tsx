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


import type {
    PropertyListing
} from "./shared/types";



const BrowseProperties:React.FC = ()=>{


const [listings,setListings] =
useState<PropertyListing[]>([]);


const [total,setTotal] =
useState(0);


const [pages,setPages] =
useState(1);


const [loading,setLoading] =
useState(false);



const [filters,setFilters] = useState<any>({

    page:1,

    limit:6,

    sort:"newest"

});





const loadProperties = async()=>{


try{


setLoading(true);



const response =
await getProperties(filters);



const formatted =
response.properties.map(
(item:any)=>(

{

id:item._id,

status:
item.status === "rent"
?
"FOR RENT"
:
item.status === "pending"
?
"PENDING"
:
"FOR SALE",


price:
item.listingType==="rent"
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


}

)
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

console.log(error);

}
finally{

setLoading(false);

}


};




useEffect(()=>{

loadProperties();

},[filters]);





const handleSearch = (data:any)=>{


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




const handleFilters = (data:any)=>{


const newFilters:any = {


    ...filters,


    page:1,


    minPrice:data.priceMin,


    maxPrice:data.priceMax,



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



    status:
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

};



setFilters(newFilters);


};




return (

<div className={styles.page}>


<Header active="browse" />



<div className={styles.toolbarSection}>


<div className={styles.container}>


<Breadcrumb
trail={["Home"]}
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
(sort)=>
setFilters({
...filters,
sort
})
}

/>



{
loading ?

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