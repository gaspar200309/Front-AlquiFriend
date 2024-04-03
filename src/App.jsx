import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

import NavBar from './components/Navbar/NavBar';
import Home from './pages/home/Home';
import ListFriend from './pages/listFriend/ListFriends'
import SelectionRegister from './pages/registros/SelectionRegister';
import { CustomerForm } from './components/Forms/CustomerForm/CustomerForm';
import RentFriendForm from './components/Forms/rentFriends/RentaForm';
import { FriendForm } from './components/Forms/FriendForm/FriendForm';
/* import RentalSection from './pages/rentalSection/RentalSection'; */
import ViewReserve from './components/viewReserve/ViewReserve';




function App() {
  return (
    <>
    <div className='body-app'>
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/form" element={<SelectionRegister/>}/>
        <Route path="/customer" element={<CustomerForm/>}/>
        <Route path="/friend" element={<FriendForm/>} />
        <Route path="/listFriend" element = {<ListFriend/>}/>
        <Route path="/rentaForm" element = {<RentFriendForm/>}/>
        <Route path="/rentalSectio" element ={<ViewReserve></ViewReserve>} />
        <Route path="/*" element={<h1 className='text-center'>404 Page Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>    
    </div>
    </>
  );
}

export default App;
