import React from 'react'
import { useState, useEffect } from "react";
import './posts.css';
import PostForm from './PostForm';
function Posts() {

    // 1. Funkcijas kas veido vaicājumu uz: https://jsonplaceholder.typicode.com/posts/
    // 2. Funkcijas kas ielādē datus, kad React components tiek ielādēts



    async function loadPosts() {
        let response = await fetch(process.env.REACT_APP_API_URL+ '/posts');
        let data = await response.json();
        return data;

    }

    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState([]);
    const [visiblePostDiv, setvisiblePostDiv] = useState(false);

    const [reload, setReload] = useState(false);
    const [editFormData, setEditFormData] = useState('');
    const [formId, setFormID] = useState('');






    const closeModal = ()=>{
        setvisiblePostDiv(false);
    }

    const doReload = ()=>{
        setReload(!reload);
    }

       const createPost = ()=>{
        setEditFormData('');
         setFormID('');
        setvisiblePostDiv(true);
    }       


    const openPost = (e)=>{
        let id = e.target.dataset.id;
        setFormID(id);
        loadFormData(id)
        .then((data)=>{
             setEditFormData(data);
        }).then(()=>{
              setvisiblePostDiv(true);
        })
        
    }

    const handleDeletePost = (e)=>{
        const confirmed = window.confirm("Tiešām izdzēst?");
        if(confirmed){
            let id = e.target.dataset.id;
            deletePost(id).then((data)=>{
                console.log(data);
                doReload();
            })
        }

    }

    const deletePost = async (id)=>{
        let response = await fetch(process.env.REACT_APP_API_URL/posts/delete + `/${id}`,{
        method: 'delete',
         });
        let data = await response.json();
        return data;
    }


    const loadFormData = async (id)=>{
        let response = await fetch(process.env.REACT_APP_API_URL/+`posts/${id}`);
        let data = await response.json();
        return data;
    }


    useEffect(() => {
        loadPosts().then((data) => {
            setPosts(data);
        });

    }, [reload])

    if (!posts) {
        return (
            <>
                <h1>Ziņas</h1>
                <p>Ielādē...</p>
            </>
        )
    } else {
        return (
            <>
                <h1>Ziņas</h1>
                <button type="button" className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 disabled:opacity-50' onClick={createPost}>
                    Pievienot jaunu ziņu</button>
                <table className='border-collapse border border-slate-400'>
                    <thead>
                        <tr>
                            <th>Ziņas</th>
                            <th>Saturs</th>
                            <th>Darbības</th>
                        </tr>
                    </thead>
                    <tbody>
                    {posts.map((post, i) => {
                        return (
                            <tr key={i}>
                                <td>{post.post_title}</td>
                                <td>{post.post_content}</td>
                                <td>
                                    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" data-id={post.id} onClick={openPost}>Skatīt</button><br />
                                    <button className='ext-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900' data-id={post.id} onClick={handleDeletePost}>Dzēst </button>
                                </td>
                            </tr>)
                        })
                    }
                    </tbody>
                </table>
             
                {visiblePostDiv?
                   (

                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative'>
                                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" onClick={()=>{
                                    setvisiblePostDiv(false)
                                }}>x</button>
                                <h1>Ziņa</h1>
                               <PostForm  closeModal={closeModal}  reload={doReload} formasDati={editFormData} editFormId={formId} />
                                    
                                   
                               

                            </div>
                        </div>
                   ):""
                }   
            </>
        )
    }
}

export default Posts;

