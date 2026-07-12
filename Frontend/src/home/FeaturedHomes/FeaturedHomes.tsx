import React, {
  useEffect,
  useState
} from "react";

import styles from "./FeaturedHomes.module.scss";


const API_URL =
  "http://localhost:5000/api/properties/featured";


interface Property {
  _id: string;
  title: string;
  city: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}



const FeaturedHomes: React.FC = () => {


  const [homes,setHomes] =
    useState<Property[]>([]);


  const [loading,setLoading] =
    useState(true);



  useEffect(()=>{


    const fetchFeaturedHomes = async()=>{


      try{


        const response =
          await fetch(API_URL);


        const data =
          await response.json();



        setHomes(
          data.data || []
        );


      }
      catch(error){

        console.log(
          "Featured homes error:",
          error
        );

      }
      finally{

        setLoading(false);

      }


    };



    fetchFeaturedHomes();


  },[]);





  if(loading){

    return (
      <section className={styles.section}>
        <p>
          Loading featured homes...
        </p>
      </section>
    );

  }




  return (

    <section className={styles.section}>

      <div className={styles.container}>


        <div className={styles.heading}>

          <div>

            <p className={styles.eyebrow}>
              HANDPICKED FOR YOU
            </p>

            <h2>
              Homes you may like
            </h2>

          </div>


          <a href="/browse-properties">
            View all listings
          </a>


        </div>




        <div className={styles.grid}>


          {
            homes.map((home)=>(


              <article
                className={styles.card}
                key={home._id}
              >


                <div className={styles.imagePlaceholder}>


                  <img
                    src={
                      home.image ||
                      "/placeholder-property.jpg"
                    }
                    alt={home.title}
                  />


                </div>





                <div className={styles.cardBody}>


                  <p className={styles.location}>

                    {
                      home.city
                    }

                  </p>



                  <h3>

                    {
                      home.title
                    }

                  </h3>




                  <p className={styles.details}>

                    {home.bedrooms} beds ·{" "}
                    {home.bathrooms} baths ·{" "}
                    {home.area} m²

                  </p>





                  <div className={styles.footer}>


                    <strong>

                      $
                      {
                        home.price.toLocaleString()
                      }

                    </strong>


<a
  href={`/property/${home._id}`}
>
  View details
</a>


                  </div>



                </div>



              </article>


            ))
          }



        </div>



      </div>


    </section>

  );

};


export default FeaturedHomes;