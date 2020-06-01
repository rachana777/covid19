import React, {useEffect, useState,Component} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function App() {
  const [newest,setLatest]=useState([]);
  const [result,setResult]=useState([]);
  const [searchCountry,setSearchCountry]=useState("");

  useEffect(()=>{
    axios
    .all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries")
      ])
    .then(responseArr=>{
      setLatest(responseArr[0].data);
      setResult(responseArr[1].data);
    })
    .catch(err=>{
      console.log(err);
    });
  },[]);

  const date = new Date(parseInt(newest.updated));
  const lastUpdated= date.toLocaleString();
  const filterCountry= result.filter(item=>{
    return searchCountry !== "" ? item.country.toLowerCase().includes(searchCountry) 
   : item;
    
  });
  const countries=filterCountry.map((data,i)=>
  {
    return(
      <Card key={i}
      bg="light" text="dark" 
      className="text-center"
      style={{margin:"20px", width:"277px"}}>
      <Card.Img variant="top" src={data.countryInfo.flag} alt={data.country} style={{height:"150px" , width:"275px"}}/>
      <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases:{data.cases}</Card.Text>
      <Card.Text>Todays Cases:{data.todayCases}</Card.Text>
      <Card.Text>Deaths:{data.deaths}</Card.Text>
      <Card.Text>Todays Deaths:{data.todayDeaths}</Card.Text>
      <Card.Text>Recovered:{data.recovered}</Card.Text>
      <span>Continent:{data.continent}</span>

      </Card.Body>

      </Card>
      )
  }

    );

  return (
      <div className="covid">
      <div className="header">
      <h2 className="text-center">Covid-19 Live Status</h2>
      <Link to={"/Maps"}><Button variant="primary" style={{float:"right", margin:"0px 80px 0 0"}}>View Through Map</Button>
      </Link>
      
      </div>
        <CardDeck style={{margin:"50px"}}>
          <Card bg="secondary" text={"white"} className={"text-center"}
          style={{margin:"10px 10px 0 25px"}}>
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
            Total Cases:{newest.cases}<br></br>
            Todays Cases:{newest.todayCases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>UpdatedTime {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger" text={"white"} className={"text-center"}
        style={{margin:"10px 10px 0 10px"}}>
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
            Total Deaths:{newest.deaths}<br></br>
            Todays Deaths:{newest.todayDeaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>UpdatedTime {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text={"white"} className={"text-center"}
        style={{margin:"10px 25px 0 10px"}}>
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
            Total Recovered:{newest.recovered}<br></br>
            Total Critical:{newest.critical}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>UpdatedTime {lastUpdated}</small>
          </Card.Footer>
        </Card>
</CardDeck>
  <form style={{marginTop:"2rem"}}>
  <input className="form__input" type="text"  placeholder="Search for country"
  onChange={e=>setSearchCountry(e.target.value.toLowerCase())}/>
  <button className="form__button">Search</button>
  </form>
<div className="flex-container">{countries}</div>
</div>
        
  );
}

export default App;
