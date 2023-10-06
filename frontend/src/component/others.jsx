import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Others = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    //from backend
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get('/api/category/all')
        .then((cat)=>{
            setCategories(cat.data.categories)
        })
        .catch((error)=>{
            console.error(error)
        })
    })
    // handke and convert to base64
    const handleImage = (e)=>{
        const file = e.target.files[0]
        setFileToBase(file)

    }
    const setFileToBase=(file)=>{
        const reader =  new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setImage(reader.result)
        }

    }

    const submitForm = (e) =>{
        event.preventDefault()
    }


  return (
    <div>others</div>
  )
}

export default Others