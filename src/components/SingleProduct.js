import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./styles.css";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card style={{borderRadius:"20px",boxShadow: "0 3px 6px #00000029", marginTop:"20px",backgroundColor:"floralwhite"}}>
        <Card.Img className="responsive-image" variant="top" src={prod.images[0]} alt={prod.title} style={{width: "100%",height: "250px",borderRadius: "20px",objectFit: "cover"}} />
        <Card.Body style={{textAlign:"center"}}>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <div>₹ {prod.price}</div>
            <Rating rating={prod.rating} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.rating}
            >
              {!prod.rating ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
