import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <aside>
      <h3>Categories</h3>
      <div className="categories-list">
        <Link to="/shirts">Shirts</Link>
        <Link to="/jeans">Jeans</Link>
        <Link to="/swimwear">Swimwear</Link>
        <Link to="/blazer">Blazer</Link>
        <Link to="/jackets">Jackets</Link>
        <Link to="/suits">Suits</Link>
        <Link to="/sleepwear">Sleepwear</Link>
        <Link to="/sportswear">Sportswear</Link>
        <Link to="/jumpsuits">Jumpsuits</Link>
      </div>
    </aside>
  );
};

export default Categories;
