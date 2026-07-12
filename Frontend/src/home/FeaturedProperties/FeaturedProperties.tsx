import React, {
  useEffect,
  useState
} from "react";

import styles from "./FeaturedProperties.module.scss";


const API_URL =
  "http://localhost:5000/api/properties/recommended";



interface Property {

  _id: string;

  title: string;

  city: string;

  price: number;

  bedrooms: number;

  bathrooms: number;

  area: number;

  image: string;

}



const FeaturedProperties: React.FC = () => {


  const [properties, setProperties] =
    useState<Property[]>([]);


  const [loading, setLoading] =
    useState(true);




  useEffect(() => {


    const fetchRecommendedProperties = async () => {


      try {


        const response =
          await fetch(API_URL);



        const data =
          await response.json();



        setProperties(
          data.data || []
        );


      } catch (error) {


        console.log(
          "Recommended properties error:",
          error
        );


      } finally {


        setLoading(false);


      }


    };



    fetchRecommendedProperties();


  }, []);





  if (loading) {


    return (

      <section className={styles.section}>

        <p>
          Loading properties...
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
              FEATURED LISTINGS
            </p>


            <h2>
              Properties worth exploring
            </h2>

          </div>



          <a href="/browse-properties">
            Explore all properties
          </a>


        </div>





        <div className={styles.grid}>


          {
            properties.map((property) => (


              <article
                className={styles.card}
                key={property._id}
              >


                <div className={styles.imagePlaceholder}>


                  <img
                    src={
                      property.image ||
                      "/placeholder-property.jpg"
                    }
                    alt={property.title}
                  />


                </div>





                <div className={styles.cardBody}>


                  <p className={styles.location}>
                    {property.city}
                  </p>




                  <h3>
                    {property.title}
                  </h3>





                  <p className={styles.details}>

                    {property.bedrooms} beds ·{" "}
                    {property.bathrooms} baths ·{" "}
                    {property.area} m²

                  </p>





                  <div className={styles.cardFooter}>


                    <strong>
                      $
                      {property.price.toLocaleString()}
                    </strong>




                    <a
                      href={`/property/${property._id}`}
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


export default FeaturedProperties;