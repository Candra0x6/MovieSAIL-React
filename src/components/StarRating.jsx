// Rating.js
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const Rating = ({ value }) => {
  // Normalisasi nilai rating agar tidak melebihi 10 atau kurang dari 0
  const normalizedValue = Math.max(0, Math.min(value, 10));

  // Hitung jumlah bintang yang akan diisi
  const filledStars = Math.floor(normalizedValue / 2);
  const hasHalfStar = (normalizedValue % 2 !== 0) && (filledStars < 5);

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= filledStars) {
      stars.push(<StarIcon key={i} className='text-yellow-400' />);
    } else if (i === filledStars + 1 && hasHalfStar) {
      stars.push(<StarHalfIcon className='text-yellow-400' key={i} />);
    } else {
      stars.push(<StarOutlineIcon key={i} />);
    }
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;





 export const Product = ({ name, rating }) => {
    return (
      <div className="product mt-2">
        <h2>{name}</h2>
        <Rating value={rating} />
      </div>
    );
  };
  

  
