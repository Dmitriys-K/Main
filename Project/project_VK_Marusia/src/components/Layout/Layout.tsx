import React from 'react';
import './layout.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    
  return (
    <div className="container">
   <Header />
      <main className="layout-main">
        {children}
      </main>
     
        <Footer />
      
    </div>
  );
}