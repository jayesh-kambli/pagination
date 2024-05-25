import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(1);

  useEffect(() => {
    async function onLoad() {
      await Axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((error) => {
          alert("failed to fetch data");
        })
    }
    onLoad();
  }, [])


  function getOut(data, page) {
    let PrePageNo = page > 1 ? 10 * (page - 1) : 0;
    let PageNo = 10 * page;
    let NewArray = [];
    data.forEach((ele, i) => {
      if (NewArray.length <= 10) {
        if (i >= PrePageNo && i < PageNo) {
          NewArray.push({ ...ele, ele2: i });
        }
      }
    });
    setPage(NewArray);
  }


  useEffect(() => {
    setTotalPageNo(Math.ceil(data.length / 10))
    getOut(data, pageNo)
  }, [data])

  useEffect(() => {
    setTotalPageNo(Math.ceil(data.length / 10))
    getOut(data, pageNo)
  }, [pageNo])

  return (
    <div>
      <h1 className="fullWidth" style={{ textAlign: "center" }}>Employee Data Table</h1>
      <table className="fullWidth alignCenter" style={{ borderCollapse: "collapse", height: "50vh", justifyContent: "start" }}>
        <thead>
          <tr style={{ backgroundColor: "#009879", color: "white", width: "100%" }}>
            <th style={{ textAlign: "start", width: "25vw" }}>ID</th>
            <th style={{ textAlign: "start", width: "25vw" }}>Name</th>
            <th style={{ textAlign: "start", width: "25vw" }}>Email</th>
            <th style={{ textAlign: "start", width: "25vw" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {page.map((ele) => (
            <tr>
              <td className="width25vw">{ele.id}</td>
              <td className="width25vw">{ele.name}</td>
              <td className="width25vw">{ele.email}</td>
              <td className="width25vw">{ele.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fullWidth alignCenter" style={{ flexDirection: "row" }}>
        <button className="naviBtn" onClick={() => {
          if (!(pageNo == 1)) {
            setPageNo((prev) => prev - 1)
          }
        }}>Previous</button>
        <h5 className="naviBtn">{pageNo}</h5>
        <button className="naviBtn" onClick={() => {
          if (!(pageNo == totalPageNo)) {
            setPageNo((prev) => prev + 1)
          }
        }}>Next</button>
      </div>
    </div>
  );
}

export default App;
