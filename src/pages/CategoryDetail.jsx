import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import CategoryService from '../services/categoryService';
import ProductService from '../services/productService';
import { Table, Button, Image, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../store/actions/cartActions';

export default function CategoryDetail() {
    const { name } = useParams();
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);


    const MAX_IMAGE_SIZE = 300; // Maksimum fotoğraf boyutu (genişlik veya yükseklik)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryService = new CategoryService();
                const result = await categoryService.getCategoryByName(name);

                if (result.data && result.data.length > 0) {
                    const selectedCategory = result.data.find(category => category.name === name);

                    if (selectedCategory) {
                        setCategory(selectedCategory);
                        const categoryId = selectedCategory.id;

                        const productService = new ProductService();
                        const productsResult = await productService.getProductsByCategoryId(categoryId);
                        setProducts(productsResult.data.products);
                    }
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchData();
    }, [name]);

    const handleAddToCart = (product) => {
        console.log("Ürün sepete eklendi:", product);
        dispatch(AddToCart({ product: product, quantity: 1 }));
    };

    const resizeImage = (imageUrl) => {
        // Resim URL'sini al ve boyutlandır
        const resizedUrl = new URL(imageUrl);
        resizedUrl.searchParams.set('w', MAX_IMAGE_SIZE);
        resizedUrl.searchParams.set('h', MAX_IMAGE_SIZE);
        resizedUrl.searchParams.set('fit', 'crop');
        return resizedUrl.toString();
    };

    return (
        <div>
            <h1>{category.name} Kategorisine Ait Ürünler</h1>
            <div className="ui link cards">
                {/* Rest of the code */}
            </div>
            <div className="ui link cards" style={{margin:"15px"}}>
                {products?.length &&
                    products.map((product) => (
                        <div className="card" key={product.id}>
                            <div className="image">
                                <Image style={{ width: "300px", height: "300px" }}
                                    src={resizeImage(product.photoUrl)}
                                    alt={product.name}
                                    size="tiny"
                                    rounded
                                />
                            </div>
                            <div className="content">
                                <div className="header">
                                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                                </div>
                                <div className="meta">
                                    <span className="category">{product.categoryName}</span>
                                </div>
                                <div className="description">
                                    {product.userName} tarafından satılıyor.
                                </div>
                            </div>
                            <div className="extra content">
                                <Link to={`/products/${product.id}`}>
                                    <Button primary>
                                        <Icon name="eye" /> İncele
                                    </Button>
                                </Link>
                                <Button onClick={() => handleAddToCart(product)}>
                                    <Icon name="cart" />
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
