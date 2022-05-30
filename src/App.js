import { Routes, Route} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sign-in.component";
import { ReactComponent as BabuBhaiya} from '../src/assets/babubhaiya.svg';// JUST 4 FUN



const Shop = () => {
  return <h1>I am the shop page, Babu Bhaiya<BabuBhaiya className="BabuBhaiya"/></h1>;/** BabuBhaiya is added just4fun */
  
  
  
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
