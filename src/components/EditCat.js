import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const EditCat = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCatById();
    }, []);

    const getCatById = async () => {
        const response = await axios.get(`http://localhost:5000/cats/${id}`);
        setTitle(response.data.name);
        setFile(response.data.image);
        setPreview(response.data.url);
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const updateCat = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.patch(`http://localhost:5000/cats/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updateCat}>
                    <div className="field">
                        <div className="label">Cat Name</div>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Product Name"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="label">Imagee</div>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input
                                        type="file"
                                        className="file-input"
                                        onChange={loadImage}
                                    />
                                    <span className="file-cta">
                                        <span className="file-label">Choose a file</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure className="image is-128x128 mb-5">
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
