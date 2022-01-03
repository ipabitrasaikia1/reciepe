export const Card = (id) => {

    const getData = () => {

        fetch(`http://localhost:3001/formData/${id}`).then((d) =>
            d.json()).then((res) => {

                // setdata(res)
                // console.log("DATA :", data)
            })

    }

    return <div className="card">

        <div className="image-container">
            <img src="https://media.istockphoto.com/photos/mug-on-plate-filled-with-coffee-surrounded-by-coffee-beans-picture-id157528129?b=1&k=20&m=157528129&s=170667a&w=0&h=8DLweTb1F3_rJFKpHn9ha8aIiQQDAJKdX5y2pR63VsA=" alt="" />
        </div>
        <div className="card-container">

            <div className="card-title">
                <h3>Title </h3>
            </div>
            <div className="card-body"> <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, molestiae.</p> </div>
            <div className="btn">

                <button>View More </button>
            </div>
        </div>


    </div>

}