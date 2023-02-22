import { ItemList } from '../ItemList';
import { useState , useEffect } from 'react';
import { useParams , Link } from "react-router-dom";
import { collection , getDocs , deleteDoc , doc } from "firebase/firestore"; //métodos de firestore para crear los módulos de consulta y pedidos a firestore
import { dbComosano } from '../../firebaseConfig/firebase.js';

export const ItemCollection = (props) => {
    const {categoryId} = useParams();
    // 1 configurarmos hooks
    // const [ loading , setLoading] = useState([false]);
    const [ errors , setErrors ] = useState([null]);
    const [ categories, setCategories ] = useState([]);
    // 2 referenciamos la db de firestore
    const dbComosanoFirestore = collection(dbComosano,"comosanoProductos")
    // 3 funcion para mostrar todos los docs
    const getProducts = async () => {
        const data = await getDocs(dbComosanoFirestore)//esta data es difícil de trabajar porque tiene una estructura compleja propia de Firestore, por ello necesitamos convertirla a un objeto sencillo con .map()
        console.log(data.docs);
        setCategories(data.docs.map((doc)=>({...doc.data(),id:doc.id}))) // falta entender como se estructura este mapeo, ¿con paramentros de firestore o/y sintaxis js?
    }
    // console.log(categories)
    useEffect(() => {
        const data1 = getProducts()
        if(categoryId) {
            data1.then(resultado => {
                const nuevaLista = resultado.filter(item=>item.categ === categoryId);
                setCategories(nuevaLista)
                console.log(nuevaLista)
            })
                .catch(err => {setErrors(err); console.log(errors)})
        } else {
            data1.then(resultado => {
                setCategories(resultado)
            })
                .catch(err => {setErrors(err);console.log(errors)})
        }

    }, [categoryId])

    // useEffect(() => {
    //     const promesa = getProducts()
    //     promesa.then(resultado=>{            
    //         if(!categoryId){                
    //             setCategories(resultado)
    //         } else{
    //             console.log(resultado)
    //             const nuevaLista = resultado.filter(item=>item.categ === categoryId);
    //             setCategories(nuevaLista)
    //             console.log(nuevaLista)
    //         }
    //     })
    // },[categoryId])

    // los detalles se rompen porque la ruta de renderizado está vinculada a ItemListContainer?

    return(
        <div className="item-list-container">
            <h2 style={props.style}>{props.greeting}</h2>
            {console.log(categoryId)}
            {console.log(categories)}
            
            <Link to={'/category/harinas'}>HARINAS DE MAIZ Y VARIOS</Link>
            <ul>
                {categoryId==="harinas"? categories.map((category)=>{
                    //la key unicamente la puedo establecer donde etá el .map() no dentro del componente ItemList
                    return ( 
                        <li key={category.id}>  
                            <ItemList productsList={category}/>
                        </li>
                    )
                }):""}
            </ul>

            <Link to={'/category/frutas'}>FRUTAS</Link>
            <ul>
                {categoryId==="frutas"?categories.map((category)=>{
                    return (                            
                        <li key={category.id}>
                            <ItemList productsList={category}/>
                        </li>                        
                    )
                }):""}
            </ul>

            <Link to={'/category/quesos'}>QUESOS</Link>
            <ul>
                {categoryId==="quesos"?categories.map((category)=>{
                    return (
                        <li key={category.id}>
                            <ItemList productsList={category}/>
                        </li>
                    )
                }):""}
            </ul>

            <Link to={'/category/salsas_y_cremas'}>SALSAS Y CREMAS</Link>
            <ul>
                {categoryId==="salsas_y_cremas"?categories.map((category)=>{
                    return (
                        <li key={category.id}>
                            <ItemList productsList={category}/>
                        </li>
                    )
                }):""}
            </ul>

            <Link to={'/category/bebidas'}>BEBIDAS Y MÁS</Link>
            <ul>
                {categoryId==="bebidas"?categories.map((category)=>{
                    return (
                        <li key={category.id}>
                            <ItemList productsList={category}/>
                        </li>
                    )
                }):""}
            </ul>

            <Link to={'/category/golosinas'}>GOLOSINAS</Link>
            <ul>
                {categoryId==="golosinas"?categories.map((category)=>{
                    return (
                        <li key={category.id}>
                            <ItemList productsList={category}/>
                        </li>
                    )
                }):""}
            </ul>

            <Link to={'/category/varios'}>VARIOS</Link>
            <ul>
                {categoryId==="varios"?categories.map((category)=>{
                    return (
                        <li key={category.id}>
                            <ItemList productsList={category}/>
                        </li>
                    )
                }):""}
            </ul>
            
        </div>
    )
}

// getProducts.then(resultado => {
//     if(!categoryId){                
//         setCategories(resultado)
//     } else{
//         // console.log(resultado)
//         const nuevaLista = resultado.filter(item=>item.categ === categoryId);
//         setCategories(nuevaLista)
//         console.log(nuevaLista)
//     }
// })
// },[categoryId])