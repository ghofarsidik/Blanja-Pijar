import PromotionCard from '../../assets/images/jumbotron/Card Promotion.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

const jumbotronImage = {
    "promotionCard": PromotionCard
}

const Jumbotron = () => {
    const [images, setImages] = useState([]);

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         try {
    //             const response = await axios.get('https://fakestoreapi.com/products/categories');
    //             const fetchedImages = response.data;
    //             if (fetchedImages && fetchedImages.length > 0) {
    //                 setImages(fetchedImages);
    //             } else {
    //                 setImages([{ url: 'promotionCard', name: 'Dummy' }]);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching images:', error);
    //             setImages([{ url: 'promotionCard', name: 'Dummy' }]);
    //         }
    //     };

    //     fetchImages();
    // }, []);

    return (
        <div className="h-[310px] flex items-center space-x-4 overflow-x-scroll mx-[10%]">
            {images.map((image, index) => (
                <div key={index} className=" bg-gray-200 h-48 flex items-center justify-center">
                    <img src={jumbotronImage[image.url] || PromotionCard} alt={image.name} className="object-cover h-full w-full" />
                </div>

            ))}
        </div>
    );
};

export default Jumbotron;
