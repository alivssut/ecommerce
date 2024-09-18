import { useState, useEffect } from "react";
import Slider from '../components/slider/slider'
import RecommenderSlider from '../components/slider/recommenderSlider'
import "../assets/css/homePageStyles.css"
import CategoryTab from '../components/tab/categoryTab'
import axios from "axios";

function HomePage() {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost/api/v1/products/best-sellers/").then((response) => {
          if (response.status === 200) {
            setProducts(response.data)
          }
        }).catch((error) => console.log(error));
      }, [currentPage]);
  return (
	  <div>
        <Slider/>
        <section>
          <div className='container'>
            <div className='row'>
              <RecommenderSlider products={products} title={"محصولات پرفروش"}/>
              <div class="col-sm-12 padding-right">
                <RecommenderSlider products={products} title={"محصولات پرفروش"}/>
                <CategoryTab/>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default HomePage