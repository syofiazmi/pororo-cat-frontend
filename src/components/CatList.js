import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CatList = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        getCat();
    }, []);

    const getCat = async () => {
        const response = await axios.get("http://localhost:5000/cats");
        setCats(response.data);
    };

    const deleteCat = async (catId) => {
        try {
            await axios.delete(`http://localhost:5000/cats/${catId}`);
            getCat();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <Link to="/add" className="button is-success">
                Add New
            </Link>
            <div className="columns is-multiline mt-5">
                {cats.map((cat) => (
                    <div className="column is-one-quarter" key={cat.id}>
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src={cat.url} alt="image" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4">{cat.name}</p>
                                    </div>
                                </div>
                            </div>

                            <footer className="card-footer">
                                <Link to={`edit/${cat.id}`} className="card-footer-item">
                                    Edit
                                </Link>
                                <a
                                    onClick={() => deleteCat(cat.id)}
                                    className="card-footer-item"
                                >
                                    Delete
                                </a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatList;
