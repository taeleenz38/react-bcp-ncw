import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import store from '../../../store';
import API from '../../../api';
import "./post-view-section.css";
import moment from "moment";

const PostViewSection = () => {
  const [data, setData, updateData] = store.useState("data");
  const [admin, setAdmin] = store.useState("admin");
  const [user, setUser] = store.useState("user");
  const [userId, setUserId] = store.useState("userId");
  const [loginName, setLoginName] = store.useState("loginName");
  const reversed = [...data].reverse();
  const [posts, setPosts] = React.useState([]);
  const [imgUrl, setImgUrl] = React.useState('');
  const [postImageUrls, setPostImageUrls] = React.useState({});

  let name = loginName.toString().toLowerCase();
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"

  React.useEffect(() => {
    async function fetchData() {
      const response = await API.get(`post/get`);
      setPosts(response.data);
      const imageUrls = {};
      const WOF = await Promise.all(response.data.map(async i => {
        if (i.image != null) {

          const imgUrl = `${IPFS_GATEWAY}${i.image}`;
          setImgUrl(imgUrl);
          imageUrls[i.id] = imgUrl;
        }
        setPostImageUrls(imageUrls);
      }))
      console.log(imgUrl, "imgUrlimgUrl")
    }
    fetchData();

  }, []);


  async function likePost(i) {
    console.log(i)

    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "postId": posts[i].id,
      "userId": parseInt(userId),
    }
    await API.put(`post/like`, dataSet, {
      headers: headers
    });

    const response = await API.get(`post/get`);
    console.log(response)
    setPosts(response.data);

  }

  async function unlikePost(i) {
    console.log(i)

    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "postId": posts[i].id,
      "userId": parseInt(userId),
    }
    await API.put(`post/unlike`, dataSet, {
      headers: headers
    });

    const response = await API.get(`post/get`);
    response.data[i].like = false;
    response.data[i].unlike = true;
    setPosts(response.data);

  }

  return (
    <section style={{ marginTop: '0px', padding: '0' }}>
      <Container >
        {posts.map((item, index) => (
          (item.approved && user &&
            // <div className="">
            <Row lg="1" key={index} className="main__row__base " style={{ marginBottom: '15px', backgroundColor: '#120C18' }}>
              <Col lg="10" key={index} className="single__post__side__item__right" >
                <div className="single__post__item" style={{ backgroundColor: '#120C18' }}>
                  <div>
                    <Row>
                      <Col lg="1" style={{ width: "60px", display: "flex", alignSelf: "flex-start", alignItems: "flex-start" }}>
                        <span>
                          <i class={item.approved ? "ri-pushpin-fill" : "ri-mail-close-fill"} style={{ color: item.approved ? "#E42575" : "red", fontSize: '1.5rem' }}></i>
                        </span>
                      </Col>
                      <Col style={{ display: "flex", alignSelf: "center" }}>
                        <h6 style={{ width: '500px', color: "#00B7FA", fontSize: "1.2rem", fontWeight: '700' }}>{item.approved ? "PINNED BY MODERATORS" : "NOT YET APPROVED BY MODERATORS"}</h6>
                      </Col>
                    </Row>

                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p style={{ color: "#C0C9CC" }}>{"Posted by "} <text style={{ color: '#E42575', fontWeight: '700' }}> {item.creatorLN === name ? "You" : item.creator} </text> {" at "} {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}</p>
                  </div>
                  <div className="post__item__message" style={{ marginLeft: "20px" }}>
                    <div>
                      {item.referance !== undefined &&
                        <text style={{ color: "#00B7FA" }}><b>{item.referance}&nbsp;</b></text>
                      }
                      <text style={{ color: "white" }}>{item.content}</text>
                    </div>
                    {postImageUrls[item.id] && <div className="nft__img" style={{marginTop: "15px"}}>
                      <img src={postImageUrls[item.id]} alt="" crossorigin="anonymous" className="w-100" />
                    </div>}
                    <div style={{ marginTop: '20px', backgroundColor: '#120C18', borderRadius: '10px', display: 'flex', alignItems: "center", width: "200px" }}>
                      <i class={"ri-heart-fill"} style={{ color: item.like ? "#00B7FA" : "grey", fontSize: '1.2rem', marginLeft: "20px", cursor: "pointer" }} onClick={() => likePost(index)}></i>
                      <text style={{ margin: "5px", color: item.like ? "#00B7FA" : "grey", cursor: "pointer" }} onClick={() => likePost(index)}>Like</text>
                      <i class={"ri-dislike-fill"} style={{ color: item.unlike ? "#00B7FA" : "grey", fontSize: '1.2rem', marginLeft: '40px', cursor: "pointer" }} onClick={() => unlikePost(index)}></i>
                      <text style={{ margin: "5px", color: item.unlike ? "#00B7FA" : "grey", cursor: "pointer" }} onClick={() => unlikePost(index)}>Unlike</text>
                    </div>
                  </div>
                </div>
              </Col>

            </Row>
            // </div>
          )
        ))}
      </Container>
    </section>
  );
};

export default PostViewSection;
