
import { useState, useEffect } from "react";
import '../App.css'


export const Form = () => {

    const [page, setpage] = useState(1);

    useEffect(() => {
        getData()
        // console.log(form)

    }, [page])

    const [data, setdata] = useState([]);
    const [dummy, setDummy] = useState(false)



    const [form, setform] = useState({});
    const handleChange = (e) => {

        const { name, value } = e.target
        // console.log(e.target)
        console.log(form)
        setform({
            ...form,
            [name]: e.target.type === "checkbox" ? e.target.checked : value,

        })


    }



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)

        fetch("http://localhost:3001/formData", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            }
        }).then(() => {

            getData()
        })
    }



    const handleSort = () => {


        setdata(() => data.sort((a, b) => {
            return a.time - b.time;
        }))

        console.log("Sort data ::", data);
        setDummy(dummy === "true" ? "false" : "true")



    }

    const handleFilter = (e) => {

        const dep = e.target.value
        console.log(dep)


        fetch(`http://localhost:3001/formData`).then((d) =>
            d.json()).then((res) => {

                var Newdata = res.filter(function (el) {
                    return el.Type === dep
                }
                );

                setdata(Newdata)

                // console.log("DATA :", data)
            })



    }

    const handleDelete = (e) => {

        console.log(e)
        fetch(`http://localhost:3001/formData/${e}`, {
            method: "DELETE",

        }).then(() => {

            getData()
        })
    }

    const handleView = (e) => {
        console.log(e)

        fetch(`http://localhost:3001/formData/${e}`).then((d) =>
            d.json()).then((res) => {

                setdata(res)
                // console.log("DATA :", data)
            })
    }




    const getData = () => {

        fetch(`http://localhost:3001/formData?_page=${page}&_limit=5`).then((d) =>
            d.json()).then((res) => {

                setdata(res)
                // console.log("DATA :", data)
            })

    }

    // const appendData = (data) => {

    //     console.log("DATA :", data)
    // }

    return <div>
        <div className="box">
            <div className="reciepeForm" >
                <h1>Its reciepe time!</h1>
                <form onSubmit={handleSubmit}>

                    <div>  <input id="inputBox" type="text" name="title" placeholder="Title of your reciepe" onChange={handleChange} />  </div>
                    <div> <input id="inputBox" type="text" name="ingredient" placeholder="What's the ingredient" onChange={handleChange} /> </div>

                    <div>  <input id="inputBox" type="number" name="time" placeholder="time to cook in minutes" onChange={handleChange} /> </div>
                    <div>   <input id="inputBox" type="text" name="instruction" placeholder="Instruction to cook..." onChange={handleChange} /></div>

                    <select name="Type" onChange={handleChange} type="input"  >
                        <option value="">choose an Type</option>
                        <option value="veg" name="Type">Veg</option>
                        <option value="non-veg" name="Type" >Non Veg</option>


                    </select>


                    <div>  <input id="inputBox" type="file" name="file" placeholder="Image of your reciepe" onChange={handleChange} />  </div>

                    <div>  <button type="submit" >Submit</button></div>
                </form>
            </div>
            <div className="reciepeList" >
                <h4>Filter by Type : </h4>
                <select name="Type" onChange={handleFilter} type="input"  >
                    <option value="">choose an Type</option>
                    <option value="veg" name="Type">Veg</option>
                    <option value="non-veg" name="Type" >Non-Veg</option>


                </select>

                <button disabled={page === 1} onClick={() => { setpage(page < 2 ? 1 : page - 1) }}> Pre </button>
                <button onClick={() => { setpage(page + 1) }}> Next </button>
                <button onClick={() => { handleSort() }}>Sort By Time to cook </button>

                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th>Title</th>  <th>Time to cook</th> <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>



                        {data.map((e) => <tr> <td><h4>{e.title} </h4> </td><td><h4>{e.time} </h4> </td><td><h4>{e.Type}</h4></td><td><h4 onClick={() => { handleDelete(e.id) }}>Delete </h4></td> <td><h4 onClick={() => { handleView(e.id) }} >View</h4></td></tr>)}


                    </tbody>


                </table>


            </div>
        </div>


        <div>

            <div className="card">

                {data.map((e) =>
                    <h4> <h3>Instruction for {e.title}</h3> : {e.instruction} </h4>
                )}



            </div>


        </div>



    </div>



}


// -----Card --- // 

