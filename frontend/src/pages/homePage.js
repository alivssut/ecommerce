import React from 'react'
import Slider from '../components/slider/slider'
import RecommenderSlider from '../components/slider/recommenderSlider'
import "../assets/css/homePageStyles.css"
import CategoryTab from '../components/tab/categoryTab'

function HomePage() {
  return (
	  <div>
        <Slider/>
        <section>
          <div className='container'>
            <div className='row'>
              <RecommenderSlider/>
              <div class="col-sm-12 padding-right">
                <RecommenderSlider/>
                <CategoryTab/>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default HomePage