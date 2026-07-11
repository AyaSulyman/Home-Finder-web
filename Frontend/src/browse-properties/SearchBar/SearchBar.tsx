import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { ChevronDownIcon } from "../../property-details/shared/icons";


interface SearchBarProps {

  defaultLocation?: string;

  onSearch?: (params:{
    location:string;
    propertyType:string;
    bedrooms:string;

  })=>void;

}



const SearchBar:React.FC<SearchBarProps> = ({

  defaultLocation="",

  onSearch,

})=>{


const [location,setLocation] =
useState(defaultLocation);



const [propertyType,setPropertyType] =
useState("all");



const [bedrooms,setBedrooms] =
useState("any");





const handleSearch = ()=>{


  onSearch?.({

    location,

    propertyType,

    bedrooms

  });


};




return (

<div className={styles.searchBar}>


<div className={styles.field}>

<label
className={styles.fieldLabel}
htmlFor="location"
>
Location or keyword
</label>


<input

id="location"

type="text"

className={styles.textInput}

value={location}

onChange={
(e)=>setLocation(e.target.value)
}

placeholder="City, neighborhood, or address"

/>


</div>





<div className={styles.divider}/>






<div className={styles.field}>


<label
className={styles.fieldLabel}
htmlFor="propertyType"
>
Property type
</label>



<div className={styles.selectWrap}>


<select

id="propertyType"

className={styles.select}

value={propertyType}

onChange={
(e)=>setPropertyType(e.target.value)
}

>


<option value="all">
All types
</option>


<option value="House">
House
</option>


<option value="Apartment">
Apartment
</option>


<option value="Villa">
Villa
</option>


<option value="Townhouse">
Townhouse
</option>


<option value="Office">
Office
</option>


</select>


<ChevronDownIcon
className={styles.selectChevron}
/>


</div>


</div>





<div className={styles.divider}/>





<div className={styles.field}>


<label
className={styles.fieldLabel}
htmlFor="bedrooms"
>
Bedrooms
</label>



<div className={styles.selectWrap}>


<select

id="bedrooms"

className={styles.select}

value={bedrooms}

onChange={
(e)=>setBedrooms(e.target.value)
}

>


<option value="any">
Any
</option>


<option value="1">
1+
</option>


<option value="2">
2+
</option>


<option value="3">
3+
</option>


<option value="4">
4+
</option>


<option value="5">
5+
</option>


</select>


<ChevronDownIcon
className={styles.selectChevron}
/>


</div>


</div>






<button

type="button"

className={styles.searchBtn}

onClick={handleSearch}

>

Search

</button>





</div>


);


};



export default SearchBar;