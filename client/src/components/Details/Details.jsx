import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanProduct, getProductsById } from "../../redux/actions";

export default function Details(){
    
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(cleanProduct()) 
        dispatch(getProductsById(params.id))
    }, [dispatch, params.id]);

    
    let actualProduct = useSelector(state => state.detail)
    console.log("actualProduct: ", actualProduct)

    let mappedName = actualProduct.map(p=>p.name)
    let mappedImage = actualProduct.map(p=>p.image)
    let mappedDescription = actualProduct.map(p=>p.description)
    let mappedCategories = actualProduct.map(p=>p.categories.name)
    let mappedPrice = actualProduct.map(p=>p.price)
    let mappedSize = actualProduct.map(p=>p.size)

    console.log("image: ", mappedImage[0])

    return(
        <div className="container">
            <div className="container1">
                <img src={mappedImage[0]} alt="not found"/>
                <span>Selecciona un talle</span>
                <select>
                    <option>renderizado</option>
                </select>
            </div>
            <div className="container2">
                <h5>{mappedCategories}</h5>
                {/* {
                    mappedCategories?.map(c=>{
                        return(
                            <h5>{c.name}</h5>
                        )
                    })
                } */}
                <h2>{mappedName}</h2>
                <h2>{mappedPrice}</h2>
                <p>{mappedDescription}</p>
                <button>Agregar al carrito</button>

            </div>
        </div>
    )
}