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
    const apiUrl = `${API_HOST}/api/news`;
    const requestBody = {
      page: pageNumber
    }
    console.log('requestBody');
    console.log(requestBody);

    const data = [
      {
        title: '광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
        content: '유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
        image_url: 'https://naver.com',
        news_url: 'https://naver.com'
      },
      {
        title: '22광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
        content: '22유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
        image_url: 'https://naver.com',
        news_url: 'https://naver.com'
      },
      {
        title: '22광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
        content: '22유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
        image_url: 'https://naver.com',
        news_url: 'https://naver.com'
      },
      {
        title: '22광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
        content: '22유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
        image_url: 'https://naver.com',
        news_url: 'https://naver.com'
      },
      {
        title: '22광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
        content: '22유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
        image_url: 'https://naver.com',
        news_url: 'https://naver.com'
      },
      {
        title: '22광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
        content: '22유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
        image_url: 'https://naver.com',
        news_url: 'https://naver.com'
      },
      {
        title: '22광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
        content: '22유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
        image_url: 'https://naver.com',
        news_url: 'https://naver.com'
      }
    ]
    setData(data);

    // axios.get(apiUrl, {
    //   params: requestBody
    // })
    // .then(res => {
    //   console.log(res);
    //   res.data = [
    //     {
    //       title: '광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
    //       content: '유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
    //       image_url: 'https://naver.com',
    //       news_url: 'https://naver.com'
    //     },
    //     {
    //       title: '광고 정말 짜증나지? 돈 더 내”…유튜브 프리미엄 4천원 넘게 올랐다',
    //       content: '유튜브가 프리미엄 멤버십 가격을 대폭 인상했다. 유튜브는 지난 8일 공지를 통해 여러 경제적인 요인들이 변화함에 따라 2020년 9월 이후 3년 만에 한국 멤버십 가격을 인상했다고 9일 밝혔다 유튜브 프리미엄 가격은 종전 1만450원에서 1만4900원으로 42.6% 인상됐다. 2020년 9월 가격 인상 이후에도 8690원에 이용 중이던 초기 가입자들의 멤버십 가격은 71.5%나 인상되는 셈이다.',
    //       image_url: 'https://naver.com',
    //       news_url: 'https://naver.com'
    //     }
    //   ]
    //   setData(res.data);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  /* 페이지 변경 */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    search(pageNumber);
  };

  return (
    <>
    <div className="content_section">
      <ul>
        {
          data.map((el, idx) => {
            return <li key={idx}>{<Card item={el}/> }</li>
          })
        }
      </ul>
    </div>

    <div className="pagination">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <i class="fa-solid fa-backward"></i>
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i class="fa-solid fa-chevron-left"></i>
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
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <button
        onClick={() => handlePageChange(Math.ceil(data.length / ItemsPerPage))}
        disabled={currentPage === Math.ceil(data.length / ItemsPerPage)}
      >
        <i class="fa-solid fa-forward"></i>
      </button>
    </div>
  </>
  )
}