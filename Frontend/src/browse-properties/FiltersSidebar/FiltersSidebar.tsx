import React, { useState } from "react";
import styles from "./FiltersSidebar.module.scss";

const PROPERTY_TYPES = [
"all",
"House",
"Apartment",
"Villa",
"Townhouse",
"Office"
];
const BEDROOM_OPTIONS = ["Any", "2+", "3+", "4+", "5+"];
const BATHROOM_OPTIONS = ["Any", "2+", "3+", "4+"];

const MIN_PRICE = 0;
const MAX_PRICE = 1_200_000;

export interface FiltersState {
  priceMin: number;
  priceMax: number;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  forSale: boolean;
  forRent: boolean;
}

interface FiltersSidebarProps {
  initial?: Partial<FiltersState>;
  onApply?: (filters: FiltersState) => void;
}

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  initial,
  onApply,
}) => {
  const [priceMin, setPriceMin] = useState(initial?.priceMin ?? 120_000);
  const [priceMax, setPriceMax] = useState(initial?.priceMax ?? 980_000);
const [propertyType, setPropertyType] =
useState(
initial?.propertyType ?? "all"
);
const [bedrooms, setBedrooms] =
useState(initial?.bedrooms ?? "Any");
  const [bathrooms, setBathrooms] = useState(initial?.bathrooms ?? "Any");
  const [forSale, setForSale] =
useState(initial?.forSale ?? false);
  const [forRent, setForRent] = useState(initial?.forRent ?? false);

 const handleReset = () => {

    const resetValues = {

        priceMin: MIN_PRICE,

        priceMax: MAX_PRICE,

        propertyType: "all",

        bedrooms: "Any",

        bathrooms: "Any",

        forSale: false,

        forRent: false

    };


    setPriceMin(resetValues.priceMin);

    setPriceMax(resetValues.priceMax);

    setPropertyType(resetValues.propertyType);

    setBedrooms(resetValues.bedrooms);

    setBathrooms(resetValues.bathrooms);

    setForSale(resetValues.forSale);

    setForRent(resetValues.forRent);


    onApply?.(resetValues);

};
 const handleApply = () => {


    onApply?.({

        priceMin,

        priceMax,

        propertyType,

        bedrooms,

        bathrooms,

        forSale,

        forRent,

    });


};

  const handleMinChange = (value: number) => {
    setPriceMin(Math.min(value, priceMax - 10_000));
  };

  const handleMaxChange = (value: number) => {
    setPriceMax(Math.max(value, priceMin + 10_000));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.headRow}>
        <h2 className={styles.heading}>Filters</h2>
        <button type="button" className={styles.resetLink} onClick={handleReset}>
          Reset all
        </button>
      </div>

      <section className={styles.section}>
        <h3 className={styles.label}>Price range</h3>
        <div className={styles.sliderTrackWrap}>
          <div className={styles.sliderTrack} />
          <div
            className={styles.sliderRange}
            style={{
              left: `${(priceMin / MAX_PRICE) * 100}%`,
              right: `${100 - (priceMax / MAX_PRICE) * 100}%`,
            }}
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10000}
            value={priceMin}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className={styles.rangeInput}
            aria-label="Minimum price"
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10000}
            value={priceMax}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className={styles.rangeInput}
            aria-label="Maximum price"
          />
        </div>
        <div className={styles.priceLabels}>
          <span>{formatPrice(priceMin)}</span>
          <span>{formatPrice(priceMax)}</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Property type</h3>
        <div className={styles.pillGrid}>
       {PROPERTY_TYPES.map((type)=>(

<button

type="button"

key={type}

className={
propertyType === type
?
styles.pillActive
:
styles.pill
}

onClick={()=>setPropertyType(type)}

>

{
type === "all"
?
"All types"
:
type
}


</button>


))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Bedrooms</h3>
        <div className={styles.pillGrid}>
          {BEDROOM_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              className={bedrooms === option ? styles.pillActive : styles.pill}
              onClick={() => setBedrooms(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Bathrooms</h3>
        <div className={styles.pillGrid}>
          {BATHROOM_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              className={
                bathrooms === option ? styles.pillActive : styles.pill
              }
              onClick={() => setBathrooms(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Listing status</h3>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={forSale}
            onChange={(e) => setForSale(e.target.checked)}
          />
          <span>For Sale</span>
        </label>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={forRent}
            onChange={(e) => setForRent(e.target.checked)}
          />
          <span>For Rent</span>
        </label>
      </section>

      <button type="button" className={styles.applyBtn} onClick={handleApply}>
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersSidebar;
