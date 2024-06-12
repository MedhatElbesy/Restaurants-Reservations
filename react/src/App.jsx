import './App.css';
import CustomCarousel from './components/homepage/CustomCarousel';
import Card from './components/homepage/flex-cards/Card';
import NearRestau from './components/homepage/near-restaurants/NearRestau';
import StaticCard from './components/homepage/static-card/StaticCard';
import TopRestau from './components/homepage/top-rated/TopRestau';
import Footer from './layouts/footer/Footer';
import MyNavbar from './layouts/nav/My-navbar';



function App() {
  return (
  <>
  <MyNavbar></MyNavbar>
<CustomCarousel></CustomCarousel>
<NearRestau></NearRestau>

<StaticCard></StaticCard>
<TopRestau></TopRestau>
<Card></Card>

<br></br>
  <Footer></Footer>
  </>
  );
}

export default App;
