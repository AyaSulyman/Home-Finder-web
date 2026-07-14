import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { fetchCategories } from '../../actions/categoryActions';
import type { Category } from '../../actions/categoryActions';
import styles from './Categories.module.scss';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      console.log('✅ Categories loaded from API:', data);
      
      // Filter out duplicate categories by name (keep first occurrence)
      const uniqueCategories = data.reduce((acc: Category[], current) => {
        const exists = acc.find(item => item.name === current.name);
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      setCategories(uniqueCategories);
    } catch (error: any) {
      console.error('❌ Failed to load categories:', error);
      message.error(error.message || 'Failed to load categories');
      // Set fallback categories if API fails
      setCategories([
        {
          _id: '1',
          name: 'Apartments',
          image: '🏢',
          description: 'Modern apartments in prime locations',
          propertyCount: 860,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Villas',
          image: '🏰',
          description: 'Luxurious villas with premium amenities',
          propertyCount: 420,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Town Houses',
          image: '🏠',
          description: 'Spacious town houses in family-friendly areas',
          propertyCount: 310,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '4',
          name: 'Family Homes',
          image: '🏡',
          description: 'Perfect family homes with large gardens',
          propertyCount: 540,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    // Navigate with the category name for display
    window.location.href = `/browse-properties?category=${encodeURIComponent(categoryName)}`;
  };

  // Helper function to render image or icon
  const renderImage = (category: Category) => {
    if (!category.image) {
      return <span>⌂</span>;
    }

    // Check if it's an emoji (starts with special characters or is short)
    if (category.image.length <= 2 && !category.image.startsWith('http')) {
      return <span>{category.image}</span>;
    }

    // Check if it's a URL
    if (category.image.startsWith('http://') || category.image.startsWith('https://')) {
      // Check if it's a Bing search URL (not a direct image)
      if (category.image.includes('bing.com/images/search')) {
        // Use a fallback emoji instead of the Bing search URL
        return <span>🏠</span>;
      }
      
      return (
        <img 
          src={category.image} 
          alt={category.name}
          className={styles.categoryImage}
          onError={(e) => {
            // If image fails to load, show emoji fallback
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              const fallback = document.createElement('span');
              fallback.textContent = '🏠';
              parent.appendChild(fallback);
            }
          }}
        />
      );
    }

    // Default fallback
    return <span>⌂</span>;
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>EXPLORE BY TYPE</p>
            <h2>Featured categories</h2>
          </div>

          <a href="/browse-properties" className={styles.browseLink}>
            Browse all properties →
          </a>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading categories...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {categories.map((category) => (
              <article 
                className={styles.card} 
                key={category._id}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className={styles.icon}>
                  {renderImage(category)}
                </div>

                <h3>{category.name}</h3>
                <p>{category.propertyCount.toLocaleString()} listings</p>
                <p className={styles.description}>{category.description}</p>

                <span className={styles.arrow}>→</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;