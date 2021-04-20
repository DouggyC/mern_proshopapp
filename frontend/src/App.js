import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Switch>
                        <Route path="/shipping" render={(routeProps) => <ShippingScreen {...routeProps} />} />
                        <Route path="/payment" render={(routeProps) => <PaymentScreen {...routeProps} />} />
                        <Route path="/order/:id" render={(routeProps) => <OrderScreen {...routeProps} />} />
                        <Route path="/placeorder" render={(routeProps) => <PlaceOrderScreen {...routeProps} />} />
                        <Route path="/login" render={(routeProps) => <LoginScreen {...routeProps} />} />
                        <Route path="/register" render={(routeProps) => <RegisterScreen {...routeProps} />} />
                        <Route path="/profile" render={(routeProps) => <ProfileScreen {...routeProps} />} />
                        <Route path="/product/:id" render={(routeProps) => <ProductScreen {...routeProps} />} />
                        <Route path="/cart/:id?" render={(routeProps) => <CartScreen {...routeProps} />} />

                        <Route path="/admin/userList" render={(routeProps) => <UserListScreen {...routeProps} />} />
                        <Route
                            path="/admin/user/:id/edit"
                            render={(routeProps) => <UserEditScreen {...routeProps} />}
                        />
                        <Route
                            exact
                            path="/admin/productlist"
                            render={(routeProps) => <ProductListScreen {...routeProps} />}
                        />
                        <Route
                            exact
                            path="/admin/productlist/:pageNumber"
                            render={(routeProps) => <ProductListScreen {...routeProps} />}
                        />
                        <Route
                            path="/admin/product/:id/edit"
                            render={(routeProps) => <ProductEditScreen {...routeProps} />}
                        />
                        <Route path="/admin/orderlist" render={(routeProps) => <OrderListScreen {...routeProps} />} />
                        {/* needs to use component for remounting */}
                        <Route exact path="/search/:keyword" render={(routeProps) => <HomeScreen {...routeProps} />} />
                        <Route exact path="/page/:pageNumber" component={HomeScreen} />
                        <Route
                            exact
                            path="/search/:keyword/page/:pageNumber"
                            render={(routeProps) => <HomeScreen {...routeProps} />}
                        />
                        <Route exact path="/" render={() => <HomeScreen />} />
                        <Route render={() => <h1>Not found</h1>} />
                    </Switch>
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
