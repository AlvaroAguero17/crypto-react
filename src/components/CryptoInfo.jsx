import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";

export const CryptoInfo = () => {
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState([]);

  const getData = () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false";

    axios.get(url).then((res) => {
      setCryptos(res.data);
    });
  };

  const browser = (e) => {
    setSearch(e.target.value);
  };

  const results = !search
    ? cryptos
    : cryptos.filter((value) =>
        value.name.toLowerCase().includes(search.toLowerCase())
      );

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <input
        value={search}
        onChange={browser}
        type="text"
        placeholder="Search..."
        className="form-control"
      />
      {results.length < 1 ? (
        <p className="text-center text-white">0 cryptos found</p>
      ) : (
        <Table striped bordered hover variant="dark" className="mt-2">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actual Price (USD)</th>
              <th>Price last 24h</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((data) => (
              <tr key={data.id}>
                <td>{data.market_cap_rank}</td>
                <td>
                  {data.name} ({data.symbol.toUpperCase()})
                </td>
                <td>
                  <img src={data.image} alt={data.name} width="30px" />
                </td>
                <td>${data.current_price.toFixed(2)}</td>
                <td>
                  {data.price_change_24h < 0 ? (
                    <span className="badge bg-danger">
                      {data.price_change_24h}
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      {data.price_change_24h}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
