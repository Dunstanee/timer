"use client";
import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
// import css from public

interface TvMaze {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string;
    schedule: {
      time: string;
      days: string[];
    };
    rating: {
      average: number;
    };
    weight: number;
    network: {
      id: number;
      name: string;
      country: {
        name: string;
        code: string;
        timezone: string;
      };
    };
    webChannel: null;
    dvdCountry: null;
    externals: {
      tvrage: number;
      thetvdb: number;
      imdb: string;
    };
    image: {
      medium: string;
      original: string;
    };
    summary: string;
    updated: number;
    _links: {
      self: {
        href: string;
      };
      previousepisode: {
        href: string;
      };
    }
  }
};

export default function Home() {

  const [search, setSearch] = useState("coding");

  const [TvMazes, setTvMazes] = useState<TvMaze[]>([]);

  useEffect(()=>{
    fetch("http://api.tvmaze.com/search/shows?q="+search)
    .then((res) => res.json())
    .then((data) => {
      setTvMazes(data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  },[search])

 

  return (
    <>
      <div className="main">
        <nav className="navbar navbar-expand-lg navbar-dark border-bottom ">
          <div className="container-fluid">
            <a className="navbar-brand text-dark" href="#"> Dunstan Safu </a>
          </div>
        </nav>
        <div className="content">
          <div className="row">
            <div className="col-xxl-12">
              <div className="d-flex justify-content-between align-items-center">
                <h3>TVMaze Search</h3>
                <div>
                  <input type="text" className="form-control"  onInput={(event)=> setSearch(event.target.value)} placeholder="Search" />
                </div>
              </div>
              <hr/>
              <div className="row">
              {TvMazes.map((item, index) => (
                <div key={index} className="col-xxl-4 mb-3">
                  <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                    {item.show.image && <img src={item.show.image.medium} alt={item.show.name} className="img-fluid" />}
                      <div className="p-3">
                        <h5 className="card-title">Title : {item.show.name}</h5>
                        <p><b>Language : </b> {item.show.language}</p>
                        <p><b>Language : </b> {item.show.language}</p>
                        <p><b>weight : </b> {item.show.weight}</p>
                        <p><b>Ended On : </b> {item.show.ended}</p>
                        <p><b>Status : </b> {item.show.status}</p>
                        <p><b>Premiered : </b> {item.show.premiered}</p>
                        {item.show.rating.average && <p><b>Rating : </b> {item.show.rating.average}</p>}
                        <p><b>Schedule : </b> {item.show.schedule.days.join(", ")} at {item.show.schedule.time}</p>
                      </div>
                    </div>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.show.summary) }}></p>
                  </div>
                  </div>
                </div>
              ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
