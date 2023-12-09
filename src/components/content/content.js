import { useEffect, useState } from "react";
import { Card } from "./card/card";
import { NoImageCard } from "./card/noImageCard";
import { API_HOST } from "../../constant";
import axios from "axios";
import "./content.css";

export const Content = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ItemsPerPage = 5;
  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  useEffect(() => {
    search(1);
  }, []);

  /**
   * 뉴스 리스트 가져오기
   * 
   * @param page: 현재 페이지
   */
  const search = (pageNumber) => {
    const apiUrl = `${API_HOST}/api/news/list/`;
    const requestBody = {
      page: pageNumber
    }

    axios.get(apiUrl, {
      params: requestBody
    })
    .then(res => {
      console.log(res);
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  /* 페이지 변경 */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    search(pageNumber);
  };

  return (
    <>
      <div className="content_section" style={{ height: "75vh", overflowY: "auto" }}>
        <ul>
          {
            data.map((el, idx) => {
              return <li key={idx}>
                {
                  el.img_url ? <Card item={el}/> : <NoImageCard item={el}/>
                }
              </li>
            })
          }
        </ul>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-backward"></i>
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {Array.from({ length: Math.ceil(data.length / ItemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(Math.ceil(data.length / ItemsPerPage))}
          disabled={currentPage === Math.ceil(data.length / ItemsPerPage)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button
          onClick={() => handlePageChange(Math.ceil(data.length / ItemsPerPage))}
          disabled={currentPage === Math.ceil(data.length / ItemsPerPage)}
        >
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
    </>
  )
}