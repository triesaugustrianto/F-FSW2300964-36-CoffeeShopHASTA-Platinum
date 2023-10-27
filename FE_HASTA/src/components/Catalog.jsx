import addtocart from "../assets/icon/Add shopping cart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Catalog = ({ name, desc, price, like, img, normal }) => {
  return (
    <div className="products">
      <div className="box">
        <div className="card">
          <div className="image">
            <img src={img} />
          </div>
          <div className="descriptions">
            <div className="products-text">
              <h4>NEW!</h4>
              <h2>{name}</h2>
              <p>{desc}</p>
            </div>

            <div className="price">
              <h3>
                Rp : <span>{price}</span>
              </h3>
              <div className="promo">
                <h4>10%</h4>
                <span>Rp {normal}</span>
              </div>
              <div className="action">
                <a
                  className="cart-border"
                  data-bs-toggle="modal"
                  data-bs-target="#addChart"
                >
                  <img src={addtocart} className="add-to-cart" />
                </a>
                <a
                  className="wishlist-border"
                  data-bs-toggle="modal"
                  data-bs-target="#addChart"
                >
                  <FontAwesomeIcon className="wishlist" icon={faHeart} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
