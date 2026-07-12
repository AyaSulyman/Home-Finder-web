import React from "react";
import styles from "./Gallery.module.scss";

interface GalleryProps {
  images?: string[];
}

const Gallery: React.FC<GalleryProps> = ({
  images = [],
}) => {


  const mainImage =
    images.length > 0
      ? images[0]
      : "/placeholder-property.jpg";


  const thumbnails =
    images.slice(1, 4);



  const extraPhotosCount =
    images.length > 4
      ? images.length - 4
      : 0;



  return (

    <div className={styles.gallery}>


      <div className={styles.galleryMain}>

        <img
          src={mainImage}
          alt="Property"
          className={styles.mainImage}
        />

      </div>



      <div className={styles.galleryGrid}>


        {
          thumbnails.map(
            (image,index)=>(

              <div
                className={styles.galleryThumb}
                key={index}
              >

                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className={styles.thumbImage}
                />

              </div>

            )
          )
        }



        {
          extraPhotosCount > 0 && (

          <div className={styles.galleryThumb}>


            <img
              src={
                images[4]
              }
              alt="More property photos"
              className={styles.thumbImage}
            />


            <div className={styles.galleryOverlay}>

              +{extraPhotosCount} photos

            </div>


          </div>

          )

        }



      </div>


    </div>

  );

};


export default Gallery;