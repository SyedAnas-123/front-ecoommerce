// IN THIS ALLCATEGORY PAGE WE WILLGET ALLTHE CATEGORY FROMBACKENED


import React from 'react';
import Layout from '../components/Layout/Layout';

import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
    //destruvturing hook for getting allthe categories
    const categories = useCategory()
    return (
        <Layout title={'All Categories'}>
            <div className="container">
                <div className="row">
                    {categories.map((c) => (
                        <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>

                            <Link to={`/category/${c.slug}`} className='btn100 btn-primary'>{c.name}</Link>

                        </div>

                    ))}

                </div>
            </div>

        </Layout>
    );
}

export default Categories;
