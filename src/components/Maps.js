import	React ,{useState,useEffect}from "react";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import GoogleMapReact from 'google-map-react';
import axios from "axios";


/*function Mapsview(){
	const [mapdetail,setMapdetail]=useState();

	useEffect(()=>{
		axios.get("https://corona.lmao.ninja/v2/countries")
		.then(mapArr=>{
			setMapdetail(mapArr.data);
		})
		.catch (err=>{
			console.log(err);
		});
	});*/



	class Mapsview extends React.Component{
	state ={
		mapdetail:[]
	}
	componentDidMount= async()=>{
    const req= await fetch(`https://corona.lmao.ninja/v2/countries`);
    const res= await req.json();
    this.setState({mapdetail:res})
    console.log(this.state.mapdetail);
	}

	render(){
		const show= this.state.mapdetail;
	
	
	const countriesLocations=show.map((data,i)=>{
		return(
			<div
			lat={data.countryInfo.lat}
			lng={data.countryInfo.long}
			style={{
				color:"red",
				backgroundColor:"#FFF",
				height:"25px",
				width:"35px",
			}}
			>
			{data.cases}
			</div>

			);
	});

		return(
			<div>
			<div className="buttonHeadin" style={{position:"relative",top:"0", overflow:"hidden"}}>
			<Link to={"/"}><Button variant="primary">Go Back</Button>
      		</Link>
      		</div>
	      	<div style={{ height: '80vh', width: '150%' }}>
	        <GoogleMapReact
	          bootstrapURLKeys={{ key:"AIzaSyCp66yQgHo_DugzvWuXBAZ1hUw9joK0aQE"}}
	          defaultCenter={{ lat: 28.394857,lng: 84.124008}}
	          defaultZoom={5}
	        >
	        {countriesLocations}
	      
	        </GoogleMapReact>
	      </div>
	      		</div>
      		
		);}
	};
	


export default Mapsview;
