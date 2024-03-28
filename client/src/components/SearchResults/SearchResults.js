import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import './searchresults.css';

const SearchResults = ({ products }) => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');

    useEffect(() => {
        if (searchQuery) {
            const filteredResults = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    }, [products, searchQuery]);

    return (
	<div className="search-results-container">
	    <h2 className="search-results-title">Search Results for "{searchQuery}"</h2>
	    {searchResults.length > 0 ? (
		<ProductList products={searchResults} />
	    ) : (
		<p className="search-results-message">No products found matching the search query.</p>
	    )}
	</div>
    );
};

export default SearchResults;
