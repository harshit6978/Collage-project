import React from 'react'
import Header from '../component/Header'
import RecommendedFood from '../component/RecommendedFood'
import Service from '../component/Service'
import NewFoods from '../component/NewFoods'
import Service2 from '../component/Service2'
import Special from '../component/Special'
import Newpage from '../component/Newpage'
import MenuBar from '../component/MenuBar'
import Carousel from '../component/Carousel'

const Home = () => {
    return (
        <div>
            <Header />
            <RecommendedFood />
            {/* <Service /> */}
            <Newpage />
            <NewFoods />
            {/* <Carousel/> */}
            <Service2 />
            {/* <Special /> */}
            <MenuBar />
        </div>
    )
}

export default Home