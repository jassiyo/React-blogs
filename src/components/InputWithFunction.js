import { useState, useRef, useEffect } from "react";



export default function Input(){

    // const [title,setTitle] = useState();
    // const [content,setContent] = useState();
    const [formData,setFormData] = useState({title:"", content:""})
    const [blogs,setblogs] = useState([]);
    const titleRef = useRef(null);
    
    useEffect(()=>{
        titleRef.current.focus();
    },[])

    useEffect(()=>{
        
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = 'No Blohs!!'
        }
    })

   function handleSubmit(e){
        e.preventDefault();
        setblogs([{title: formData.title,content: formData.content},...blogs]);
        setFormData({title:"", content:""})
        titleRef.current.focus();
        console.log(blogs);

   }

   function removeBlogs(i){
    setblogs(blogs.filter((blog,index)=> i!==index));
   }
    
   
    return(
        <>
        <h1>Write your blog here!</h1>
        <div className="section">
        <form onSubmit={handleSubmit}>

            <Row label="Title">
                    <input className="input"
                            placeholder="Title"
                            value={formData.title}
                            ref={titleRef}
                            onChange={(e)=>setFormData({title:e.target.value, content: formData.content})}
                            required
                    />
            </Row >
            <Row label="Content">
                    
                    <textarea
                    className="input content"
                     placeholder="content goes here..."
                            value={formData.content}
                            onChange={(e)=>setFormData({title: formData.title, content:e.target.value})}
                            required

                    />

            </Row >
            <button className="btn">ADD</button>

        </form>
        </div>

        <h2>Blogs</h2>
        {blogs.map((blog,i)=>(
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <div className="blog-btn">
                    <button onClick={()=>{removeBlogs(i)}} className="btn remove">delete</button>
                </div>
            </div>
        ))}


        </>


        )
    }


function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />

        </>
    )
}
