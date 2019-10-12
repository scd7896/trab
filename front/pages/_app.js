import App,{Container} from "next/app";
import AppLayout from "../components/AppLayout";
import React from 'react'

import Helmet from 'react-helmet'
import withRedux from 'next-redux-wrapper'
import {applyMiddleware, compose, createStore} from 'redux'
import{ Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import cookies from 'next-cookies'
import rootSaga from '../saga'
import reducer from '../reducer'



const MyApp = (props)=> {
  
   
    
    const { Component, pageProps, store } = props;
    
    return (
      <Container>
        <Provider store = {store}>  
            <Helmet 
              title = "TraB"
              htmlAttributes = {{lang:'ko'}}
              meta = {[{
                charset : "UTF-8"
              },{
                name : 'viewport', content :'width=device-width, initial-scale=1'
              },{
                'http-equiv' : 'X-UA-Compatible', content : 'IE=edge',
              },{
                name : 'desciption', content : 'TraB의 설명란'
              },{
                property : 'og:type', content : 'website',
              },{
                property : 'og:description', content : 'TraB의 설명란'
              },{
                property : 'og:title', content : "TraB"
              },{
                name : "referrer", content : 'origin'
              },{
                property: 'og:image', content: 'http://localhost:8083/11.ico'
              }]}
              link ={[
                {
                  rel: 'shortcut icon', href: '/11.ico',
                },
                {
                rel : 'stylesheet', href : "//cdn.quilljs.com/1.2.6/quill.snow.css"
              },{
                
              }]}
            />
            
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
        </Provider>
      </Container>
    );
  
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};
MyApp.getInitialProps =async({ Component, ctx }) =>{
  // const cookie = ctx.isServer? ctx.req.headers.cookie : '';
  // axios.defaults.headers.Cookie = '';
  // if(true){
  //   axios.defaults.headers.Cookie = cookie;
  //    axios.defaults.withCredentials = true;
  // }
  
  
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  // this exposes the query to the user
  pageProps.query = ctx.query;
  if(ctx.isServer){
    console.log(cookies(ctx).usertoken)
  }
  
  
  return { pageProps};
}
export default withRedux(configureStore)(MyApp);