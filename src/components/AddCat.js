import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AddCat = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const saveCat = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append("title", title);
        try {
            await axios.post('http://localhost:5000/cats', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={saveCat}>
                    <div className="field">
                        <div className="label">Cat Name</div>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Cat Name"
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
                        <figure className="image is-128x128">
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
