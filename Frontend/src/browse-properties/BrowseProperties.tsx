import React, {
    useEffect,
    useState
} from "react";

import {
    useSearchParams
} from "react-router-dom";

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


const BrowseProperties: React.FC = () => {


    const [searchParams] =
        useSearchParams();



    const urlKeyword =
        searchParams.get("keyword") || "";



    const [listings, setListings] =
        useState<PropertyListing[]>([]);



    const [total, setTotal] =
        useState(0);



    const [pages, setPages] =
        useState(1);



    const [loading, setLoading] =
        useState(false);



    const [error, setError] =
        useState("");



    const [filters, setFilters] =
        useState<any>({

            page: 1,

            limit: 6,

            sort: "newest",

            keyword:
                urlKeyword || undefined

        });



    useEffect(() => {


        const keyword =
            searchParams.get("keyword");



        setFilters((prev:any)=>({

            ...prev,

            page:1,

            keyword:
                keyword || undefined

        }));


    },[searchParams]);





    const loadProperties =
    async()=>{


        try {


            setLoading(true);

            setError("");



            const response =
                await getProperties(filters);




          const properties =
    response.properties ||
    response.data?.properties ||
    response.data?.items ||
    [];
    const formatted =
    properties.map(
        (item:any)=>({
             


                    id:item._id,



                    status:
                        item.listingType === "rent"
                        ?
                        "FOR RENT"
                        :
                        "FOR SALE",




                    price:
                        item.listingType === "rent"
                        ?
                        `$${item.price.toLocaleString()}/mo`
                        :
                        `$${item.price.toLocaleString()}`,





                    title:item.title,





                    address:

                        item.address?.street

                        ?

                        `${item.address.street}, ${item.address.city}`

                        :

                        `${item.address}, ${item.city}`,





                    beds:
                        item.bedrooms,





                    baths:
                        item.bathrooms,





                    sqft:
                        item.area,





                    image:

                        item.image

                        ||

                        item.images?.find(
                            (img:any)=>
                                img.isCover
                        )?.url

                        ||

                        item.images?.[0]?.url

                        ||

                        ""

                })

            );



            setListings(formatted);


setTotal(
    response.pagination?.totalProperties ||
    response.data?.total ||
    0
);


setPages(
    response.pagination?.totalPages ||
    response.data?.totalPages ||
    1
);


        }

        catch(err:any){


            console.log(
                "Properties loading error",
                err
            );


            setListings([]);


            setTotal(0);


            setPages(1);



            setError(
                err?.message ||
                "Failed to load properties"
            );


        }

        finally{


            setLoading(false);


        }


    };





    useEffect(()=>{


        loadProperties();


    },[filters]);








    const handleSearch =
    (data:any)=>{


        setFilters({


            page:1,


            limit:6,


            sort:"newest",




            keyword:

                data.location

                ?

                data.location

                :

                undefined,




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










    const handleFilters =
    (data:any)=>{


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


                data.forSale &&
                data.forRent


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










    const handleSort =
    (sort:string)=>{


        let backendSort =
            "newest";



        if(sort === "price-asc")
            backendSort="priceAsc";



        if(sort === "price-desc")
            backendSort="priceDesc";



        setFilters({

            ...filters,

            page:1,

            sort:backendSort

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

                        onSearch={
                            handleSearch
                        }

                    />


                </div>


            </div>







            <div className={styles.container}>


                <div className={styles.mainGrid}>




                    <aside>


                        <FiltersSidebar

                            onApply={
                                handleFilters
                            }

                        />


                    </aside>









                    <div>



                        <ResultsHeader


                            resultCount={
                                total
                            }


                            location="All locations"


                            onSortChange={
                                handleSort
                            }


                        />





                        {
                            loading &&

                            <p className={styles.stateMessage}>
                                Loading properties...
                            </p>
                        }





                        {
                            error &&

                            <p
                                className={styles.errorMessage}
                                role="alert"
                            >
                                {error}
                            </p>
                        }





                        {
                            !loading &&
                            !error &&
                            listings.length === 0 &&

                            <p className={styles.stateMessage}>
                                No properties found.
                            </p>
                        }







                        {
                            !loading &&
                            !error &&

                            <PropertyGrid

                                listings={
                                    listings
                                }

                            />

                        }







                        {
                            pages > 1 &&

                            <Pagination


                                totalPages={
                                    pages
                                }


                                onPageChange={
                                    (page)=>

                                    setFilters({

                                        ...filters,

                                        page

                                    })
                                }


                            />

                        }




                    </div>



                </div>



            </div>



        </div>

    );


};


export default BrowseProperties;